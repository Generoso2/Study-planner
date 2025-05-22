import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Feed({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Lista de Matérias</Text>
      <Button 
        title="Adicionar Matéria" 
        onPress={() => navigation.navigate('Postar')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});