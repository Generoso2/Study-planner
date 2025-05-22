import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { atualizarMateria } from '../../config/bancolocal';

const cores = {
  primaria: '#6E3AFF',    // Roxo moderno
  secundaria: '#FF7D53',  // Laranja vibrante
  fundo: '#F8F9FA',       // Cinza claro
  texto: '#2E3440',       // Azul escuro
  sucesso: '#4CAF50',     // Verde
  alerta: '#FFC107',      // Amarelo
  erro: '#F44336'         // Vermelho
};

export default function RegistroHoras({ route, navigation }) {
  const { materia } = route.params;
  const [horas, setHoras] = useState('');
  const [salvando, setSalvando] = useState(false);

  const handleRegistrar = async () => {
    setSalvando(true);
    const horasNum = parseFloat(horas) || 0;
    const novoRegistro = {
      data: new Date().toLocaleDateString(),
      horas: horasNum
    };
  
    const materiaAtualizada = {
      ...materia,
      horasEstudadas: materia.horasEstudadas + horasNum,
      registros: [...materia.registros, novoRegistro]
    };

    await atualizarMateria(materia.id, {
      horasEstudadas: materiaAtualizada.horasEstudadas,
      registros: materiaAtualizada.registros
    });
    
    navigation.navigate('Excluir', { materia: materiaAtualizada });
    setSalvando(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar horas estudadas</Text>
      <TextInput
        style={styles.input}
        placeholder="Horas estudadas (ex: 1.5)"
        keyboardType="numeric"
        value={horas}
        onChangeText={setHoras}
      />
      <Button title="Registrar" onPress={handleRegistrar} disabled={salvando}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, marginBottom: 20 },
  input: { borderWidth: 1, padding: 15, marginBottom: 20 }
});