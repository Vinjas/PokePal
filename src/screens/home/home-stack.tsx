import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokedexScreen } from './pokedex-screen';
import { PokemonInfoScreen } from './pokemon-info/pokemon-info-screen';
import { ScreenHeader } from '@components/screen-header';
import { t } from 'i18next';
import { PokemonInfoHeader } from './pokemon-info/pokemon-info-header';

const Stack = createNativeStackNavigator();

export function HomeStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Pokedex'>
      <Stack.Screen
        name='Pokedex'
        component={PokedexScreen}
        options={{
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: () => <ScreenHeader title={t('screen-headers.pokedex')} />
        }}
      />
      <Stack.Screen
        name='PokemonInfo'
        component={PokemonInfoScreen}
        options={({ navigation, route }) => ({
          header: () => (
            <PokemonInfoHeader
              route={route}
              navigation={navigation}
            />
          )
        })}
      />
    </Stack.Navigator>
  );
}
