import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CompareScreen } from './compare-screen';

const Stack = createNativeStackNavigator();

export function CompareStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Compare'>
      <Stack.Screen
        name='Compare'
        component={CompareScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
