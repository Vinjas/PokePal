import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokedexScreen } from './pokedex-screen';
import { PokemonInfoScreen } from './pokemon-info/pokemon-info-screen';
import { ScreenHeader } from '@components/screen-header';
import { PokemonInfoHeader } from './pokemon-info/pokemon-info-header';
import { HomeScreen } from './home-screen';
import { HOME_STACK } from '@constants/screens';
import { SettingsScreen } from './settings-screen';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

export function HomeStack(): JSX.Element {
  const { t } = useTranslation();

  return (
    <Stack.Navigator initialRouteName={HOME_STACK.HOME}>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={HOME_STACK.POKEDEX}
        component={PokedexScreen}
        options={{
          headerShown: false,
          headerShadowVisible: false
        }}
      />
      <Stack.Screen
        name={HOME_STACK.SETTINGS}
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => <ScreenHeader title={t('screen-headers.settings')} />
        }}
      />
      <Stack.Screen
        name={HOME_STACK.POKEMON_DETAIL}
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
