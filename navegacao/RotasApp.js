import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from '../telas/app/Feed';
import Postar from '../telas/app/Postar';
import Excluir from '../telas/app/Excluir';
import Configuracoes from '../telas/app/Configuracoes';
import RegistroHoras from '../telas/app/RegistroHoras';


const Stack = createStackNavigator();

export default function RotasApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Feed" screenOptions={{  detachPreviousScreen: false  }}>
        <Stack.Screen name="Feed" component={Feed} options={{ title: 'Matérias' }} />
        <Stack.Screen name="Postar" component={Postar} options={{ title: 'Nova Matéria' }} />
        <Stack.Screen name="Excluir" component={Excluir} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="Configuracoes"component={Configuracoes} options={{ title: 'Configurações' }} />
        <Stack.Screen name="RegistroHoras"component={RegistroHoras} options={{title: 'Registrar Horas'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}