import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Switch, 
  StyleSheet, 
  Button, 
  Vibration, 
  Platform,
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const cores = {
  primaria: '#6E3AFF',    // Roxo moderno
  secundaria: '#FF7D53',  // Laranja vibrante
  fundo: '#F8F9FA',       // Cinza claro
  texto: '#2E3440',       // Azul escuro
  sucesso: '#4CAF50',     // Verde
  alerta: '#FFC107',      // Amarelo
  erro: '#F44336'         // Vermelho
};

export default function Configuracoes() {
  const [vibracaoAtiva, setVibracaoAtiva] = useState(true);

  const testarVibracao = () => {
    if (vibracaoAtiva) {
      // Padrão de vibração otimizado para Android/iOS
      if (Platform.OS === 'android') {
        Vibration.vibrate([0, 500, 200, 500]); // Vibrar 2x no Android
      } else {
        Vibration.vibrate(200); // Vibração única no iOS
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="settings" size={28} color="#6200ee" />
        <Text style={styles.headerText}>Configurações</Text>
      </View>

      <View style={styles.optionCard}>
        <View style={styles.option}>
          <Ionicons name="phone-vibrate" size={20} color="#333" />
          <Text style={styles.optionText}>Ativar vibração</Text>
        </View>
        <Switch
          value={vibracaoAtiva}
          onValueChange={setVibracaoAtiva}
          trackColor={{ false: '#f5f5f5', true: '#6200ee' }}
        />
      </View>

      <Button
        title="Testar Vibração"
        onPress={testarVibracao}
        color="#6200ee"
        disabled={!vibracaoAtiva}
      />

      {Platform.OS === 'android' && (
        <Text style={styles.tip}>
          '🔄 Se não vibrar, verifique: Configurações {'>'} Sons {'>'} Vibrar ao tocar'
        </Text>
      )}
    </View>
  );
}

// ESTILOS (adicione no final do arquivo)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#6200ee',
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  optionText: {
    fontSize: 16,
  },
  tip: {
    marginTop: 20,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});