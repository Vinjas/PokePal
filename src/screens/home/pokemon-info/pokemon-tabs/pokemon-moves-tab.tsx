import { MoveCard } from '@components/move-card';
import { DEFAULT_VIEWABILITY_CONFIG } from '@constants/flat-list-load';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export const PokemonMovesTab = ({ route }: { route: any }) => {
  const { pokemonData } = route;

  const { moves } = pokemonData;

  const filteredMoves = moves.filter((move: any) => {
    let foundLevelUp = false;

    const uniqueDetails = move.version_group_details.reverse().filter((detail: any) => {
      if (detail.move_learn_method.name === 'level-up' && !foundLevelUp) {
        foundLevelUp = true;
        return true;
      }
      return false;
    });

    move.version_group_details = uniqueDetails.reverse();
    return foundLevelUp;
  });

  filteredMoves.sort((a: any, b: any) => {
    const levelA = a.version_group_details[0].level_learned_at;
    const levelB = b.version_group_details[0].level_learned_at;
    return levelA - levelB;
  });

  return (
    <View>
      <FlatList
        data={filteredMoves}
        style={styles.list}
        horizontal={false}
        numColumns={1}
        keyExtractor={item => item.move.name}
        renderItem={({ item }) => (
          <MoveCard
            key={item.move.name}
            name={item.move.name}
            url={item.move.url}
            level={item.version_group_details[0].level_learned_at}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20
  }
});
