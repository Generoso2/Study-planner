import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import CadastrarTarefaScreen from './screens/CadastrarTarefaScreen';
import ListaTarefasScreen from './screens/ListaTarefasScreen';
import DetalhesTarefaScreen from './screens/DetalhesTarefaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CadastrarTarefa" component={CadastrarTarefaScreen} options={{ title: 'Nova Tarefa' }} />
        <Stack.Screen name="ListaTarefas" component={ListaTarefasScreen} options={{ title: 'Minhas Tarefas' }} />
        <Stack.Screen name="DetalhesTarefa" component={DetalhesTarefaScreen} options={{ title: 'Detalhes da Tarefa' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}