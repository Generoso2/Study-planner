import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Vibration, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { excluirMateria, atualizarMateria } from '../../config/bancolocal';

export default function Excluir({ route, navigation }) {
  const { materia: materiaInicial } = route.params;
  const [materia, setMateria] = useState(materiaInicial);
  const [editando, setEditando] = useState(false);

  const handleExcluir = async () => {
    Vibration.vibrate(100);
    const sucesso = await excluirMateria(materia.id);
    if (sucesso) navigation.goBack();
  };

  const handleSalvar = async () => {
    Vibration.vibrate(50);
    const sucesso = await atualizarMateria(materia.id, { nome: materia.nome });
    if (sucesso) setEditando(false);
  };

  return (
    <View style={styles.container}>
      {editando ? (
        <TextInput
          style={styles.input}
          value={materia.nome}
          onChangeText={(text) => setMateria({...materia, nome: text})}
        />
      ) : (
        <>
          <Ionicons name="book" size={60} color="#6200ee" style={styles.icon} />
          <Text style={styles.title}>{materia.nome}</Text>
        </>
      )}

      <View style={styles.buttons}>
        <Button 
          title={editando ? "Cancelar" : "Editar"} 
          onPress={() => {
            setEditando(!editando);
            if (editando) setMateria(materiaInicial);
          }} 
        />
        {editando ? (
          <Button title="Salvar" onPress={handleSalvar} />
        ) : (
          <Button title="Excluir" color="red" onPress={handleExcluir} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (estilos anteriores permanecem)
  input: {
    borderWidth: 1,
    padding: 15,
    fontSize: 18,
    borderRadius: 8,
    marginVertical: 20,
  },
});