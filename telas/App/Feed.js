import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { carregarMaterias } from '../../config/bancolocal';

export default function Feed({ navigation }) {
  const [materias, setMaterias] = useState([]);

  const carregarDados = async () => {
    const materiasCarregadas = await carregarMaterias();
    setMaterias(materiasCarregadas);
  };

  useEffect(() => {
    carregarDados();
    const unsubscribe = navigation.addListener('focus', carregarDados);
    return unsubscribe;
  }, [navigation]);

  const handlePressItem = (item) => {
    // Vibração de 50ms (requisito do projeto)
    Vibration.vibrate(50);
    navigation.navigate('Excluir', { materia: item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => handlePressItem(item)}
          >
            <Ionicons name="book" size={20} color="#444" />
            <Text style={styles.itemText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="sad-outline" size={40} color="#ccc" />
            <Text style={styles.emptyText}>Nenhuma matéria cadastrada</Text>
          </View>
        }
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  itemText: { marginLeft: 10, fontSize: 16 },
  empty: { alignItems: 'center', marginTop: 50 },
  emptyText: { color: '#888', marginTop: 10 },
});