import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar, useColorScheme } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { DEFAULT_QUERY_OPTIONS } from './constants/react-query';
import { AppStack } from './screens/app-stack';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FilterPokemonProvider } from 'context/filter-pokemon-context';
import { PokemonResultsProvider } from 'context/pokemon-results-context';
import { AppThemeContext, AppThemeProvider } from 'context/app-theme-context';
import i18n from '@i18n/i18n';
import { storage } from '@app-storage/app-storage';
import { STORAGE } from '@constants/storage';
import { THEME } from '@constants/theme';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: DEFAULT_QUERY_OPTIONS })
  );

  return (
    <NavigationContainer>
      <AppThemeProvider>
        <QueryClientProvider client={queryClient}>
          <FilterPokemonProvider>
            <PokemonResultsProvider>
              <AppStack />
            </PokemonResultsProvider>
          </FilterPokemonProvider>
        </QueryClientProvider>
      </AppThemeProvider>
    </NavigationContainer>
  );
}

export default gestureHandlerRootHOC(App);
