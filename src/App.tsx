import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { DEFAULT_QUERY_OPTIONS } from './constants/react-query';
import { AppStack } from './screens/app-stack';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FilterPokemonProvider } from 'context/filter-pokemon-context';

const PokePalDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: LogoColors.red,
    background: Colors.pureWhite
  }
};

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: DEFAULT_QUERY_OPTIONS })
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.pureBlack : Colors.pureWhite
  };

  return (
    <NavigationContainer theme={PokePalDefaultTheme}>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <FilterPokemonProvider>
          <AppStack />
        </FilterPokemonProvider>
      </QueryClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400'
  },
  highlight: {
    fontWeight: '700'
  }
});

export default gestureHandlerRootHOC(App);
