import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';

import { catalogo } from './src/moedas';
import { converter } from './src/services/converterValor';

export default function App() {
  const [valorInserido, setValorInserido] = useState('');
  const [moedaOrigem, setMoedaOrigem] = useState('real');
  const [moedaDestino, setMoedaDestino] = useState('dolar');
  const [resultado, setResultado] = useState<string | null>(null);
  const [historico, setHistorico] = useState<string[]>([]);

  const handleConverter = () => {
    const num = parseFloat(valorInserido);
    if (isNaN(num) || num <= 0) {
      Alert.alert("Aviso", "Insira um valor numérico válido.");
      return;
    }
    if (moedaOrigem === moedaDestino) {
      Alert.alert("Aviso", "Selecione moedas diferentes.");
      return;
    }

    const valorFinal = converter(num, moedaOrigem, moedaDestino);
    setResultado(valorFinal);

    const novaEntrada = `${valorInserido} ${moedaOrigem.toUpperCase()} ➔ ${valorFinal} ${moedaDestino.toUpperCase()}`;
    setHistorico([novaEntrada, ...historico].slice(0, 5));
  };

  const handleSwap = () => {
    setMoedaOrigem(moedaDestino);
    setMoedaDestino(moedaOrigem);
    setResultado(null);
  };

  const reset = () => {
    setValorInserido('');
    setResultado(null);
    setHistorico([]);
  };

  const IconeDe = catalogo[moedaOrigem].imagenMoeda;
  const IconePara = catalogo[moedaDestino].imagenMoeda;

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titulo}>Global Currency</Text>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Valor (0.00)"
            keyboardType="numeric"
            value={valorInserido}
            onChangeText={setValorInserido}
          />

          <View style={styles.selecaoRow}>
            <View style={styles.boxMoeda}>
              <IconeDe width={50} height={50} />
              <Picker
                selectedValue={moedaOrigem}
                onValueChange={setMoedaOrigem}
                style={styles.picker}
              >
                {Object.keys(catalogo).map(m => <Picker.Item key={m} label={m} value={m} />)}
              </Picker>
            </View>

            <TouchableOpacity onPress={handleSwap} style={styles.swapBtn}>
              <Text style={{fontSize: 24}}>⇄</Text>
            </TouchableOpacity>

            <View style={styles.boxMoeda}>
              <IconePara width={50} height={50} />
              <Picker
                selectedValue={moedaDestino}
                onValueChange={setMoedaDestino}
                style={styles.picker}
              >
                {Object.keys(catalogo).map(m => <Picker.Item key={m} label={m} value={m} />)}
              </Picker>
            </View>
          </View>

          <TouchableOpacity style={styles.btnPrincipal} onPress={handleConverter}>
            <Text style={styles.btnText}>Converter Agora</Text>
          </TouchableOpacity>
        </View>

        {resultado && (
          <View style={styles.cardResultado}>
            <Text style={styles.resTexto}>Resultado: {resultado}</Text>
          </View>
        )}

        <TouchableOpacity onPress={reset} style={{marginTop: 10}}>
          <Text style={{color: 'red', textAlign: 'center'}}>Resetar Aplicativo</Text>
        </TouchableOpacity>

        <View style={styles.historico}>
          <Text style={styles.histTitulo}>Últimas Consultas:</Text>
          {historico.map((h, i) => (
            <Text key={i} style={styles.histItem}>{h}</Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5', paddingTop: 60 },
  titulo: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  scroll: { padding: 20 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 15, elevation: 4 },
  input: { fontSize: 30, textAlign: 'center', borderBottomWidth: 1, borderColor: '#ddd', marginBottom: 20 },
  selecaoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  boxMoeda: { flex: 1, alignItems: 'center' },
  picker: { width: '100%' },
  swapBtn: { padding: 10 },
  btnPrincipal: { backgroundColor: '#007AFF', padding: 15, borderRadius: 10, marginTop: 20 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
  cardResultado: { marginTop: 20, backgroundColor: '#e1ffeb', padding: 20, borderRadius: 10 },
  resTexto: { fontSize: 22, fontWeight: 'bold', color: '#1b5e20', textAlign: 'center' },
  historico: { marginTop: 30 },
  histTitulo: { fontWeight: 'bold', marginBottom: 10 },
  histItem: { backgroundColor: '#fff', padding: 10, marginBottom: 5, borderRadius: 5, color: '#666' }
});