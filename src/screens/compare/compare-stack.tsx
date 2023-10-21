import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CompareScreen } from './compare-screen';
import { ScreenHeader } from '@components/screen-header';
import { t } from 'i18next';

const Stack = createNativeStackNavigator();

export function CompareStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName='Compare'>
      <Stack.Screen
        name='Compare'
        component={CompareScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => <ScreenHeader title={t('screen-headers.compare')} />
        }}
      />
    </Stack.Navigator>
  );
}
