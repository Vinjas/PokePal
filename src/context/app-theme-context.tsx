import { storage } from '@app-storage/app-storage';
import { STORAGE } from '@constants/storage';
import { THEME } from '@constants/theme';
import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export const AppThemeContext = createContext<any>([]);

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const isDeviceDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const hasThemeConfig = storage.contains(STORAGE.THEME);

    if (!hasThemeConfig) {
      storage.set(STORAGE.THEME, isDeviceDarkMode ? THEME.DARK : THEME.LIGHT);
    }
  }, [isDeviceDarkMode]);

  const [isDarkMode, setIsDarkMode] = useState(
    storage.getString(STORAGE.THEME) === THEME.DARK
  );

  return (
    <AppThemeContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode
      }}
    >
      {children}
    </AppThemeContext.Provider>
  );
};
