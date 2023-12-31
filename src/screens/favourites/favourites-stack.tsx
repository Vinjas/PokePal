import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavouritesScreen } from './favourites-screen';
import { ScreenHeader } from '@components/screen-header';
const Stack = createNativeStackNavigator();
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';
import { Colors } from '@constants/styles/colors';

export function FavouritesStack(): JSX.Element {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  return (
    <Stack.Navigator initialRouteName='Favourites'>
      <Stack.Screen
        name='Favourites'
        component={FavouritesScreen}
        options={{
          headerShown: false,
          headerShadowVisible: false
        }}
      />
    </Stack.Navigator>
  );
}
