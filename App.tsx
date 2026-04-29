import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text, TextInput, Button, Image} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';



export default function App() {

  

  const [valorInserido, setValorInserido] = useState('')
  

  return (
    <View style={styles.container}>
      <View>
        <Picker>
          <Picker.Item></Picker.Item>
        </Picker>

      </View>
      
      
      <TextInput 
        placeholder='Insira o valor para conversão (ex: 00.00)'
        onChangeText={(texto)=>{
          const valorLimpo = texto.replace(/[^0-9]/g, '');
          setValorInserido(valorLimpo)
        }}
        keyboardType="numeric"
        value={valorInserido}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
