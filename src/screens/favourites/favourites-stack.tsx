import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavouritesScreen } from './favourites-screen';
import { ScreenHeader } from '@components/screen-header';
const Stack = createNativeStackNavigator();
import { useTranslation } from 'react-i18next';

export function FavouritesStack(): JSX.Element {
  const { t } = useTranslation();

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
