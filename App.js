import { ImageBackground, StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import RotasApp from './navegacao/RotasApp';

export default function App() {
  return (
    <ImageBackground
      source={require('./assets/background.png')}
      style={styles.background}
      blurRadius={1} // Efeito de desfoque sutil (opcional)
    >
      {/* Overlay para melhor contraste */}
      <View style={styles.overlay} />
      
      {/* Suas telas ficarão aqui */}
      <RotasApp />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // Escurece a imagem
  },
});