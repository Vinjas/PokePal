import { PokemonInfoTabView } from '@components/pokemon-info-tab-view';
import { ColorTypes, Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { formatPokemonName } from '@utils/format-pokemon-name';
import { t } from 'i18next';
import React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';

const FirstRoute = () => <View style={{ flex: 1 }} />;

const SecondRoute = () => <View style={{ flex: 1 }} />;

const ThirdRoute = () => <View style={{ flex: 1 }} />;

const FourthRoute = () => <View style={{ flex: 1 }} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute
});

export const PokemonInfoScreen = (): JSX.Element => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: t('pokemon-info.headers.about') },
    { key: 'second', title: t('pokemon-info.headers.stats') },
    { key: 'third', title: t('pokemon-info.headers.evolution') },
    { key: 'fourth', title: t('pokemon-info.headers.moves') }
  ]);

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
    borderColor: Colors.ligthGrey1
  },
  tabbarText: {
    fontFamily: FontFamily.poppinsSemiBold
  },
  indicator: {
    backgroundColor: Colors.sortButton,
    color: Colors.sortButton,
    height: 3
  }
});
