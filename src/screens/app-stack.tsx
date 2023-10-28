import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './home/pokedex-screen';
import { Navbar } from '../components/navbar/navbar';
import { StatusBar, useColorScheme } from 'react-native';
import { AppThemeContext } from 'context/app-theme-context';
import { storage } from '@app-storage/app-storage';
import { STORAGE } from '@constants/storage';
import { THEME } from '@constants/theme';
import i18n from '@i18n/i18n';
import { Colors } from '@constants/styles/colors';

const Stack = createNativeStackNavigator();

export const AppStack = (): JSX.Element => {
  const { isDarkMode, setIsDarkMode } = useContext(AppThemeContext);

  const deviceTheme = useColorScheme()?.toUpperCase();

  useEffect(() => {
    const hasLanguageConfig = storage.contains(STORAGE.LANG);
    const hasThemeConfig = storage.contains(STORAGE.THEME);

    console.log('object');

    if (!hasThemeConfig) {
      storage.set(STORAGE.THEME, deviceTheme ?? THEME.LIGHT);
    }

    setIsDarkMode(storage.getString(STORAGE.THEME) === THEME.DARK);

    if (!hasLanguageConfig) {
      storage.set(STORAGE.LANG, i18n.language);
    }
  }, [deviceTheme, setIsDarkMode]);

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.black : Colors.pureWhite}
      />
      <Stack.Navigator>
        <Stack.Screen
          name='Navbar'
          component={Navbar}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </>
  );
};
