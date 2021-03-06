import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import ModalSelector from 'react-native-modal-selector';
import Header from '../components/Header';
import postSubscribe from '../requests/postSubscribe';

const picker_data = [
  {label: 'Haftalık Bildirim', key: 'weekly'},
  {label: 'Aylık Bildirim', key: 'monthly'},
];

function Subscribe() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [frequency, setFrequency] = useState();
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    setEditable(true);
  }, []);
  function onPressSubscribe() {
    if (name && email && frequency) {
      postSubscribe({name, email, frequency})
        .then(res => {
          setName(null);
          setEmail(null);
          setFrequency('weekly');
          Alert.alert(
            'Başarılı',
            'E-posta listesine aboneliğiniz gerçekleştirildi.',
          );
        })
        .catch(err => {
          Alert.alert('Uyarı', 'Hata: ' + err.response.data.errors.email[0]);
        });
    } else {
      Alert.alert(
        'Uyarı',
        'Lütfen isim, e-posta ve bildirim aralığı alanlarının hepsini doldurunuz.',
      );
    }
  }
  return (
    <View style={styles.container}>
      <Header title="Abone Ol" />
      <View style={[styles.container, styles.box]}>
        <Text style={styles.label}>
          Güncel iş ilanlarından haberdar olmak için hemen e-posta listesine
          kayıt olun!
        </Text>
        <View style={styles.pickerBox}>
          <ModalSelector
            data={picker_data}
            animationType={'slide'}
            selectStyle={styles.picker}
            selectTextStyle={styles.pickerText}
            initValueTextStyle={{color: '#666'}}
            cancelStyle={{paddingVertical: 12}}
            cancelText={'Seçim Aracını Kapat'}
            initValue={'Gönderim Aralığı'}
            onChange={option => setFrequency(option.key)}
          />
        </View>
        <TextInput
          editable={editable}
          style={styles.input}
          placeholderTextColor={'#666'}
          placeholder="İsim Soyisim"
          value={name}
          onChangeText={value => setName(value)}
        />
        <TextInput
          editable={editable}
          style={styles.input}
          placeholderTextColor={'#666'}
          placeholder="E-posta Adresi"
          value={email}
          onChangeText={value => setEmail(value)}
          autoCompleteType="email"
          keyboardType="email-address"
        />
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={() => onPressSubscribe()}>
          <Icon name="bell" color="#fff" size={24} />
          <Text style={styles.buttonText}>Aboneliği Başlat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  box: {
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 55,
    fontSize: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 12,
    marginTop: 12,
  },
  pickerBox: {
    width: '90%',
    position: 'relative',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
  },
  pickerText: {
    color: '#333',
  },
  button: {
    width: '90%',
    marginTop: 15,
    paddingVertical: 15,
    backgroundColor: '#26ae61',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    paddingLeft: 15,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  label: {
    paddingHorizontal: '5%',
    marginBottom: 20,
    fontSize: 17,
    lineHeight: 24,
    color: '#555',
  },
});

export default Subscribe;
