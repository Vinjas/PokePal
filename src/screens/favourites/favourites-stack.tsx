import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavouritesScreen } from './favourites-screen';
import { ScreenHeader } from '@components/screen-header';
import { t } from 'i18next';
const Stack = createNativeStackNavigator();

export function FavouritesStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Favourites'>
      <Stack.Screen
        name='Favourites'
        component={FavouritesScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => <ScreenHeader title={t('screen-headers.favorites')} />
        }}
      />
    </Stack.Navigator>
  );
}
