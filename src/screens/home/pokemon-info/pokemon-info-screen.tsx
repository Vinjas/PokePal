import { PokemonInfoTabView } from '@components/pokemon-info-tab-view';
import { ColorTypes, Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { formatPokemonName } from '@utils/format-pokemon-name';
import { t } from 'i18next';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import {
  PokemonAboutTab,
  PokemonEvolutionTab,
  PokemonMovesTab,
  PokemonStatsTab
} from './pokemon-tabs';
import { AppThemeContext } from 'context/app-theme-context';

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
  const { pokemonData } = props.route.params;

  const { isDarkMode } = useContext(AppThemeContext);

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
      style={[styles.tabbar, isDarkMode ? styles.tabbarDark : styles.tabbarLight]}
      renderLabel={({ route, focused, color }) => (
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
