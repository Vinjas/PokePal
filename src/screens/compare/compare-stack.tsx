import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CompareScreen } from './compare-screen';
import { ScreenHeader } from '@components/screen-header';
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';
import { Colors } from '@constants/styles/colors';

const Stack = createNativeStackNavigator();

export function CompareStack(): JSX.Element {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  return (
    <Stack.Navigator initialRouteName='Compare'>
      <Stack.Screen
        name='Compare'
        component={CompareScreen}
        options={{
          headerShown: false,
          headerShadowVisible: false
        }}
      />
    </Stack.Navigator>
  );
}
