import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TeamsScreen } from './teams-screen';
import { ScreenHeader } from '@components/screen-header';
import { t } from 'i18next';

const Stack = createNativeStackNavigator();

export function TeamsStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Teams'>
      <Stack.Screen
        name='Teams'
        component={TeamsScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => <ScreenHeader title={t('screen-headers.teams')} />
        }}
      />
    </Stack.Navigator>
  );
}
