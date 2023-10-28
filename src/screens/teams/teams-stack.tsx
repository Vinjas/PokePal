import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TeamsScreen } from './teams-screen';
import { ScreenHeader } from '@components/screen-header';
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';
import { Colors } from '@constants/styles/colors';

const Stack = createNativeStackNavigator();

export function TeamsStack(): JSX.Element {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  return (
    <Stack.Navigator initialRouteName='Teams'>
      <Stack.Screen
        name='Teams'
        component={TeamsScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: () => <ScreenHeader title={t('screen-headers.teams')} />,
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.black : Colors.pureWhite
          },
          headerTintColor: isDarkMode ? Colors.pureWhite : Colors.black
        }}
      />
    </Stack.Navigator>
  );
}
