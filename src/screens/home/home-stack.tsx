import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokedexScreen } from './pokedex-screen';
import { PokemonInfoScreen } from './pokemon-info-screen';
import { ScreenHeader } from '@components/screen-header';
import { t } from 'i18next';

const Stack = createNativeStackNavigator();

export function HomeStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Pokedex'>
      <Stack.Screen
        name='Pokedex'
        component={PokedexScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => <ScreenHeader title={t('screen-headers.pokedex')} />
        }}
      />
      <Stack.Screen
        name='PokemonInfo'
        component={PokemonInfoScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
