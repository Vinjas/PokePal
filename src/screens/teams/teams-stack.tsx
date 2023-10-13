import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TeamsScreen } from './teams-screen';

const Stack = createNativeStackNavigator();

export function TeamsStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Teams'>
      <Stack.Screen
        name='Teams'
        component={TeamsScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
