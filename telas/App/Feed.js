import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { carregarMaterias } from '../../config/bancolocal';

export default function Feed({ navigation }) {
  const [materias, setMaterias] = useState([]);

  const carregarDados = async () => {
    const materiasCarregadas = await carregarMaterias();
    setMaterias(materiasCarregadas);
  };

  useEffect(() => {
    // Carrega os dados quando a tela é montada
    carregarDados();

    // Adiciona listener para quando a tela receber foco
    const unsubscribe = navigation.addListener('focus', () => {
      carregarDados();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item.nome}</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma matéria cadastrada</Text>}
      />
      <Button
        title="Adicionar Matéria"
        onPress={() => navigation.navigate('Postar')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 12, fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 20 },
});