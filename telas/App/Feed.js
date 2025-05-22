import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Vibration 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { carregarMaterias } from '../../config/bancolocal';


export default function Feed({ navigation }) {
  const [materias, setMaterias] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => navigation.navigate('Configuracoes')}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="settings" size={24} color="#6E3AFF" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const carregarDados = async () => {
      const materiasCarregadas = await carregarMaterias();
      setMaterias(materiasCarregadas);
    };
    carregarDados();
  }, []);

  const handlePressItem = (item) => {
    Vibration.vibrate(50);
    navigation.navigate('Excluir', { materia: item });
  };

  return (
    <BackgroundWrapper>
      <FlatList
        data={materias}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => handlePressItem(item)}
          >
            <View style={styles.cardHeader}>
              <Ionicons name="book" size={24} color="#6E3AFF" />
              <Text style={styles.cardTitle}>{item.nome}</Text>
            </View>
            <Text style={styles.horas}>
              {item.horasEstudadas}h estudadas
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="library-outline" size={50} color="rgba(110, 58, 255, 0.5)" />
            <Text style={styles.emptyText}>Nenhuma matéria cadastrada</Text>
          </View>
        }
      />

      {/* Botão Flutuante */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('Postar')}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E3440',
    marginLeft: 10,
  },
  horas: {
    color: '#666',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#6E3AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6E3AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: 'rgba(46, 52, 64, 0.7)',
    fontSize: 16,
    marginTop: 16,
  }
});