import { MoveCard } from '@components/move-card';
import { LogoColors } from '@constants/styles/colors';
import React, { useMemo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';

export const PokemonMovesTab = ({ route }: { route: any }) => {
  const { data } = route;

  const { pokemonData, isLoading } = data;

  const filteredMoves = useMemo(() => {
    if (!pokemonData) return [];

    const filteredMovesList = pokemonData.moves.filter((move: any) => {
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

    const filteredSortMovesList = filteredMovesList.sort((a: any, b: any) => {
      const levelA = a.version_group_details[0].level_learned_at;
      const levelB = b.version_group_details[0].level_learned_at;
      return levelA - levelB;
    });

    return filteredSortMovesList;
  }, [pokemonData]);

  return (
    <View>
      {isLoading && (
        <ActivityIndicator
          size={90}
          color={LogoColors.red}
          style={styles.loader}
        />
      )}

      {!isLoading && filteredMoves && (
        <FlatList
          data={filteredMoves}
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
