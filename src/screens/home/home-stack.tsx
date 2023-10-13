import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokedexScreen } from './pokedex-screen';
import { PokemonInfoScreen } from './pokemon-info-screen';

const Stack = createNativeStackNavigator();

export function HomeStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Pokedex'>
      <Stack.Screen
        name='Pokedex'
        component={PokedexScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name='PokemonInfo'
        component={PokemonInfoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
