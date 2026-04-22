import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text, TextInput, Button, Image} from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>TMC</Text>

    
      <Picker>


        <Picker.Item label='Selecione...' value=""/>
        <Picker.Item/>
        <Picker.Item/>
        <Picker.Item/>

      </Picker>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: "#800080",
    borderWidth: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
