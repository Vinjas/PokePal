import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './home/pokedex-screen';
import { Navbar } from '../components/navbar/navbar';

const Stack = createNativeStackNavigator();

export const AppStack = (): JSX.Element => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Navbar'
        component={Navbar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
