import React, { useState, useEffect } from 'react';
import { View, Text, Switch, StyleSheet, Vibration } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function Configuracoes() {
  const [vibracaoAtiva, setVibracaoAtiva] = useState(true);
  const [acelerometro, setAcelerometro] = useState({});

  useEffect(() => {
    Accelerometer.setUpdateInterval(1000);
    const subscription = Accelerometer.addListener(data => {
      setAcelerometro(data);
      // Vibra se o dispositivo for chacoalhado (requisito de sensor)
      if (Math.abs(data.x) > 1.5 || Math.abs(data.y) > 1.5) {
        if (vibracaoAtiva) Vibration.vibrate(200);
      }
    });

    return () => subscription.remove();
  }, [vibracaoAtiva]);

  return (
    <View style={styles.container}>
      <View style={styles.option}>
        <Text>Ativar vibração</Text>
        <Switch 
          value={vibracaoAtiva}
          onValueChange={setVibracaoAtiva}
        />
      </View>

      <View style={styles.sensorData}>
        <Text>Acelerômetro:</Text>
        <Text>X: {acelerometro.x?.toFixed(2) || 0}</Text>
        <Text>Y: {acelerometro.y?.toFixed(2) || 0}</Text>
        <Text>Z: {acelerometro.z?.toFixed(2) || 0}</Text>
      </View>

      <Text style={styles.hint}>Chacoalhe o dispositivo para testar!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  sensorData: { marginTop: 30 },
  hint: { marginTop: 20, fontStyle: 'italic', color: '#666' },
});