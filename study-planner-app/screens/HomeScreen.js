import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Study Planner!</Text>
      <Button
        title="Cadastrar Nova Tarefa"
        onPress={() => navigation.navigate('CadastrarTarefa')}
      />
      <Button
        title="Ver Minhas Tarefas"
        onPress={() => navigation.navigate('ListaTarefas')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
});