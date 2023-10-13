import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavouritesScreen } from './favourites-screen';

const Stack = createNativeStackNavigator();

export function FavouritesStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Favourites'>
      <Stack.Screen
        name='Favourites'
        component={FavouritesScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
