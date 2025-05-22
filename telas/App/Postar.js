import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Vibration 
} from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { salvarMaterias, carregarMaterias } from '../../config/bancolocal';

export default function Postar({ navigation }) {
  const [nome, setNome] = useState('');

  const handleSalvar = async () => {
  if (!nome.trim()) {
    Vibration.vibrate(100);
    Alert.alert('Atenção', 'Digite um nome para a matéria');
    return;
  }

  try {
    const materiasAtuais = await carregarMaterias();
    const novaMateria = {
      id: Date.now().toString(),
      nome: nome.trim(),
      horasEstudadas: 0,
      registros: []
    };
    
    await salvarMaterias([...materiasAtuais, novaMateria]);
    navigation.goBack();
  } catch (error) {
    Alert.alert('Erro', 'Não foi possível salvar: ' + error.message);
    console.error(error);
  }
};

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Nova Matéria</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Ex: Cálculo II"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />
        
        <TouchableOpacity 
          style={styles.botao}
          onPress={handleSalvar}
        >
          <Text style={styles.botaoTexto}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 16,
    borderRadius: 12,
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E3440',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
    backgroundColor: 'white',
  },
  botao: {
    backgroundColor: '#6E3AFF',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  botaoTexto: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});