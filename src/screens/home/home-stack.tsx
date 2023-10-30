import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PokedexScreen } from './pokedex-screen';
import { PokemonInfoScreen } from './pokemon-info/pokemon-info-screen';
import { ScreenHeader } from '@components/screen-header';
import { PokemonInfoHeader } from './pokemon-info/pokemon-info-header';
import { HomeScreen } from './home-screen';
import { HOME_STACK } from '@constants/screens';
import { SettingsScreen } from './settings-screen';
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';
import { Colors } from '@constants/styles/colors';
import { MovesScreen } from './moves-screen';
import { ItemsScreen } from './items-screen';
import { TypesScreen } from './types-screen';

const Stack = createNativeStackNavigator();

export function HomeStack(): JSX.Element {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

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
          headerTitle: () => <ScreenHeader title={t('screen-headers.settings')} />,
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.black : Colors.pureWhite
          },
          headerTintColor: isDarkMode ? Colors.pureWhite : Colors.black
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
      <Stack.Screen
        name={HOME_STACK.MOVES}
        component={MovesScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => <ScreenHeader title={t('home.moves')} />,
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.black : Colors.pureWhite
          },
          headerTintColor: isDarkMode ? Colors.pureWhite : Colors.black
        }}
      />
      <Stack.Screen
        name={HOME_STACK.ITEMS}
        component={ItemsScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => <ScreenHeader title={t('home.items')} />,
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.black : Colors.pureWhite
          },
          headerTintColor: isDarkMode ? Colors.pureWhite : Colors.black
        }}
      />
      <Stack.Screen
        name={HOME_STACK.TYPES}
        component={TypesScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => <ScreenHeader title={t('home.types')} />,
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.black : Colors.pureWhite
          },
          headerTintColor: isDarkMode ? Colors.pureWhite : Colors.black
        }}
      />
    </Stack.Navigator>
  );
}
