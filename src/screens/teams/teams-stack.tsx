import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TeamsScreen } from './teams-screen';
import { ScreenHeader } from '@components/screen-header';
import { useTranslation } from 'react-i18next';

const Stack = createNativeStackNavigator();

export function TeamsStack(): JSX.Element {
  const { t } = useTranslation();

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
