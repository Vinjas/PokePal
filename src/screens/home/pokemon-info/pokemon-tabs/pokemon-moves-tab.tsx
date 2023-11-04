import { MoveCard } from '@components/move-card';
import { LogoColors } from '@constants/styles/colors';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

export const PokemonMovesTab = ({ route }: { route: any }) => {
  const { data } = route;

  const { pokemonStatic, isLoadingPokemonStatic } = data;

  return (
    <View>
      {isLoadingPokemonStatic && (
        <ActivityIndicator
          size={90}
          color={LogoColors.red}
          style={styles.loader}
        />
      )}

      {!isLoadingPokemonStatic && pokemonStatic && (
        <FlatList
          data={pokemonStatic.moves}
          style={styles.list}
          horizontal={false}
          numColumns={1}
          keyExtractor={item => item.move.name}
          renderItem={({ item }) => (
            <MoveCard
              isLvl
              key={item.move.name}
              name={item.move.name}
              url={item.move.url}
              level={item.version_group_details[0].level_learned_at}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20
  },
  loader: {
    marginTop: 30
  }
});
