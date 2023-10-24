import { formatPokemonName } from '@utils/format-pokemon-name';
import React from 'react';
import { Image, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { SceneMap, TabView } from 'react-native-tab-view';

const FirstRoute = () => <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;

const SecondRoute = () => <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
});

export const PokemonInfoTabView = (): JSX.Element => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' }
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};
