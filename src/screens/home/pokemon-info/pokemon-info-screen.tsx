import { Colors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { t } from 'i18next';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import {
  PokemonAboutTab,
  PokemonEvolutionTab,
  PokemonMovesTab,
  PokemonStatsTab
} from './pokemon-tabs';
import { AppThemeContext } from 'context/app-theme-context';
import { useQuery } from '@tanstack/react-query';
import { RQ_KEY } from '@constants/react-query';
import { getEvolutionChain, getPokemonStatic } from '@services/poke-api';

const renderScene = SceneMap({
  about: PokemonAboutTab,
  stats: PokemonStatsTab,
  evolution: PokemonEvolutionTab,
  moves: PokemonMovesTab
});

type PokemonInfoScreenProps = {
  route: any;
};

export const PokemonInfoScreen = (props: PokemonInfoScreenProps): JSX.Element => {
  const { name } = props.route.params;

  const {
    data: pokemonStatic,
    isLoading: isLoadingPokemonStatic,
    isError: isErrorPokemonStatic
  } = useQuery({
    queryKey: [RQ_KEY.POKEMON_DATA_STATIC, name],
    queryFn: () => getPokemonStatic(name)
  });

  const {
    data: evolutionChain,
    isLoading: isLoadingEvolution,
    isError: evolutionChainError
  } = useQuery({
    queryKey: [RQ_KEY.EVOLUTION_CHAIN, pokemonStatic?.evolutionChain?.url],
    queryFn: () => getEvolutionChain(pokemonStatic?.evolutionChain?.url),
    enabled: !!pokemonStatic?.evolutionChain?.url
  });

  const { isDarkMode } = useContext(AppThemeContext);

  const isError = isErrorPokemonStatic || evolutionChainError;

  const data = {
    pokemonStatic,
    evolutionChain,
    isLoadingPokemonStatic,
    isLoadingEvolution,
    isError
  };

  const defaultRoutes = [
    {
      key: 'about',
      title: t('pokemon-info.headers.about'),
      data
    },
    {
      key: 'stats',
      title: t('pokemon-info.headers.stats'),
      data
    },
    {
      key: 'evolution',
      title: t('pokemon-info.headers.evolution'),
      data
    },
    {
      key: 'moves',
      title: t('pokemon-info.headers.moves'),
      data
    }
  ];

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState(defaultRoutes);

  useEffect(() => {
    setRoutes(defaultRoutes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingPokemonStatic, isLoadingEvolution, isError]);

  const renderTabBar = (tabProps: any) => (
    <TabBar
      {...tabProps}
      indicatorStyle={styles.indicator}
      style={[styles.tabbar, isDarkMode ? styles.tabbarDark : styles.tabbarLight]}
      renderLabel={({ route, focused }) => (
        <View style={{ marginTop: -15 }}>
          <Text
            style={{
              ...styles.tabbarText,
              color: focused
                ? isDarkMode
                  ? Colors.pureWhite
                  : Colors.black
                : Colors.textSecondary
            }}
          >
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      style={{ backgroundColor: isDarkMode ? Colors.black : Colors.pureWhite }}
      initialLayout={{ width: layout.width }}
    />
  );
};

const styles = StyleSheet.create({
  tabbar: {
    marginHorizontal: 20,
    elevation: 0,
    borderBottomWidth: 1,
    borderColor: Colors.ligthGrey1,
    height: 35
  },
  tabbarDark: {
    backgroundColor: Colors.black
  },
  tabbarLight: {
    backgroundColor: Colors.pureWhite
  },
  tabbarText: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 13
  },
  indicator: {
    backgroundColor: Colors.sortButton,
    color: Colors.sortButton,
    height: 3,
    position: 'absolute',
    bottom: -1
  }
});
