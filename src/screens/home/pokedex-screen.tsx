import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const PokedexScreen = (): JSX.Element => {
  const styles = StyleSheet.create({
    wrapper: {
      height: 70,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 0
    }
  });

  return (
    <View style={styles.wrapper}>
      <Text>Pokedex Screen</Text>
    </View>
  );
};
