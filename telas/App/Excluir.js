import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Vibration, 
  TextInput, 
  ScrollView, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { excluirMateria, carregarMaterias, salvarMaterias } from '../../config/bancolocal';

const cores = {
  primaria: '#6E3AFF',
  erro: '#FF3B30',
  fundo: '#F8F9FA',
  texto: '#2E3440',
  card: '#FFFFFF'
};

export default function Excluir({ route, navigation }) {
  const { materia: materiaInicial } = route.params;
  const [materia, setMateria] = useState(materiaInicial);
  const [editando, setEditando] = useState(false);



  const handleExcluir = async () => {
    Vibration.vibrate(100);
    
    Alert.alert(
      'Confirmar Exclusão',
      `Excluir "${materia.nome}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const materias = await carregarMaterias();
            const materiasAtualizadas = materias.filter(m => m.id !== materia.id);
            await salvarMaterias(materiasAtualizadas);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleSalvar = async () => {
    Vibration.vibrate(50);
    const sucesso = await salvarMaterias(
      (await carregarMaterias()).map(m => 
        m.id === materia.id ? { ...m, nome: materia.nome } : m
      )
    );
    if (sucesso) setEditando(false);
  };

  return (
    <BackgroundWrapper>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          {editando ? (
            <TextInput
              style={styles.inputEditavel}
              value={materia.nome}
              onChangeText={(text) => setMateria({...materia, nome: text})}
              autoFocus
            />
          ) : (
            <>
              <Ionicons name="book" size={60} color="#6E3AFF" />
              <Text style={styles.titulo}>{materia.nome}</Text>
            </>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.horas}>{materia.horasEstudadas}h</Text>
          <Text style={styles.label}>Horas estudadas</Text>
          
          <TouchableOpacity
            style={styles.botaoRegistrar}
            onPress={() => navigation.navigate('RegistroHoras', { materia })}
          >
            <Ionicons name="time-outline" size={18} color="white" />
            <Text style={styles.botaoRegistrarTexto}>Registrar horas</Text>
          </TouchableOpacity>
        </View>

        {materia.registros?.length > 0 && (
          <View style={styles.card}>
            <Text style={styles.graficoTitulo}>Progresso Semanal</Text>
            <LineChart
              data={{
                labels: materia.registros.slice(-7).map(r => r.data.split('/')[0]),
                datasets: [{ data: materia.registros.slice(-7).map(r => r.horas) }]
              }}
              width={300}
              height={200}
              chartConfig={{
                backgroundColor: '#fff',
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(110, 58, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(46, 52, 64, ${opacity})`,
              }}
              bezier
              style={styles.grafico}
            />
          </View>
        )}

        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={[styles.botaoAcao, styles.botaoEditar]}
            onPress={() => {
              setEditando(!editando);
              if (editando) setMateria(materiaInicial);
            }}
          >
            <Text style={styles.botaoAcaoTexto}>
              {editando ? 'Cancelar' : 'Editar'}
            </Text>
          </TouchableOpacity>

          {editando ? (
            <TouchableOpacity
              style={[styles.botaoAcao, styles.botaoSalvar]}
              onPress={handleSalvar}
            >
              <Text style={styles.botaoAcaoTexto}>Salvar</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.botaoAcao, styles.botaoExcluir]}
              onPress={handleExcluir}
            >
              <Ionicons name="trash-outline" size={18} color="white" />
              <Text style={styles.botaoAcaoTexto}>Excluir</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cores.texto,
    marginTop: 8,
    textAlign: 'center',
  },
  inputEditavel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: cores.texto,
    borderBottomWidth: 1,
    borderColor: cores.primaria,
    padding: 4,
    textAlign: 'center',
    marginTop: 8,
    width: '80%',
  },
  card: {
    backgroundColor: cores.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  horas: {
    fontSize: 36,
    fontWeight: 'bold',
    color: cores.primaria,
  },
  labelHoras: {
    fontSize: 14,
    color: '#666',
  },
  botaoRegistrar: {
    flexDirection: 'row',
    backgroundColor: cores.primaria,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  botaoRegistrarTexto: {
    color: 'white',
    fontWeight: '600',
  },
  graficoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: cores.texto,
    marginBottom: 8,
  },
  grafico: {
    borderRadius: 8,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 8,
  },
  botaoAcao: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  botaoEditar: {
    backgroundColor: '#F0F1F3',
  },
  botaoSalvar: {
    backgroundColor: cores.primaria,
  },
  botaoExcluir: {
    backgroundColor: cores.erro,
  },
  botaoAcaoTexto: {
    fontWeight: '600',
  },
});