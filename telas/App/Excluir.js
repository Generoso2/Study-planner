import React from 'react';
import { View, Text, StyleSheet, Button, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Excluir({ route, navigation }) {
  const { materia } = route.params;

  const handleExcluir = () => {
    Vibration.vibrate(100); // Vibração mais longa para ação importante
    alert('Funcionalidade de excluir será implementada depois!');
  };

  return (
    <View style={styles.container}>
      <Ionicons name="book" size={60} color="#6200ee" style={styles.icon} />
      <Text style={styles.title}>{materia.nome}</Text>
      
      <View style={styles.details}>
        <Text style={styles.detailText}>Horas estudadas: 0</Text>
        <Text style={styles.detailText}>Último estudo: --/--/----</Text>
      </View>

      <View style={styles.buttons}>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
        <Button title="Excluir" color="red" onPress={handleExcluir} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  icon: { alignSelf: 'center', margin: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  details: { marginVertical: 30 },
  detailText: { fontSize: 16, marginBottom: 10 },
  buttons: { marginTop: 20, gap: 10 },
});