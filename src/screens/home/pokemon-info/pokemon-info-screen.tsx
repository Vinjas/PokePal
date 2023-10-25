import { PokemonInfoTabView } from '@components/pokemon-info-tab-view';
import { ColorTypes, Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { formatPokemonName } from '@utils/format-pokemon-name';
import { t } from 'i18next';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import {
  PokemonAboutTab,
  PokemonEvolutionTab,
  PokemonMovesTab,
  PokemonStatsTab
} from './pokemon-tabs';

const renderScene = SceneMap({
  about: PokemonAboutTab,
  stats: PokemonStatsTab,
  evolution: PokemonEvolutionTab,
  moves: PokemonMovesTab
});

export const PokemonInfoScreen = (props): JSX.Element => {
  const { pokemonData } = props.route.params;

  const defaultRoutes = [
    { key: 'about', title: t('pokemon-info.headers.about'), pokemonData },
    { key: 'stats', title: t('pokemon-info.headers.stats'), pokemonData },
    { key: 'evolution', title: t('pokemon-info.headers.evolution'), pokemonData },
    { key: 'moves', title: t('pokemon-info.headers.moves'), pokemonData }
  ];

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState(defaultRoutes);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            ...styles.tabbarText,
            color: focused ? Colors.black : Colors.textSecondary
          }}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};

const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: Colors.pureWhite,
    marginHorizontal: 20,
    elevation: 0,
    borderBottomWidth: 1,
    borderColor: Colors.ligthGrey1,
    height: 45
  },
  tabbarText: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 13
  },
  indicator: {
    backgroundColor: Colors.sortButton,
    color: Colors.sortButton,
    height: 3
  }
});
