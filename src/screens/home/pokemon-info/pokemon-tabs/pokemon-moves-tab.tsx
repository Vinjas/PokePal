import { CustomText } from '@components/custom-text';
import { MoveCard } from '@components/move-card';
import { AppThemeContext } from 'context/app-theme-context';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const PokemonMovesTab = ({ navigation, route }) => {
  const { t } = useTranslation();

  const { pokemonData } = route;

  const { moves } = pokemonData;

  const { isDarkMode } = useContext(AppThemeContext);

  const filteredMoves = moves.filter(move => {
    let foundLevelUp = false;

    const uniqueDetails = move.version_group_details.reverse().filter(detail => {
      if (detail.move_learn_method.name === 'level-up' && !foundLevelUp) {
        foundLevelUp = true;
        return true;
      }
      return false;
    });

    move.version_group_details = uniqueDetails.reverse();
    return foundLevelUp;
  });

  // Ordena los movimientos por nivel (level_learned_at)
  filteredMoves.sort((a, b) => {
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
    //overflow: 'hidden'
  }
});
