import { StatsBarChart } from '@components/stat-bar-chart';
import { StatsBarTotalChart } from '@components/stat-bar-total-chart';
import { Colors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { convertPokemonStats, getPokemonTotalStat } from 'mapper/pokemon-stats-mapper';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StarIcon from '@assets/svg/star.svg';

const StarButton = () => {
  return (
    <StarIcon
      width={11}
      height={11}
    />
  );
};

export const PokemonStatsTab = ({ route }: any) => {
  const { t } = useTranslation();

  const { pokemonData } = route;

  const mappedPokemonStats = useMemo(() => {
    if (!pokemonData) return [];

    return convertPokemonStats(pokemonData.stats);
  }, [pokemonData]);

  const pokemonTotalStat: { label: string; value: number } = useMemo(() => {
    if (!pokemonData) return { label: 'total', value: 0 };

    return getPokemonTotalStat(pokemonData.stats);
  }, [pokemonData]);

  return (
    <ScrollView style={styles.wrapper}>
      {mappedPokemonStats.map(stat => (
        <View
          key={stat.label}
          style={styles.row}
        >
          <View style={styles.dataWrapper}>
            <Text style={styles.subHeader}>{t(`pokemon-info.stats.${stat.label}`)}</Text>
            <View style={styles.starWrapper}>
              {Array.from({ length: Math.min(stat.effort, 3) }).map((_, index) => (
                <StarButton key={index} />
              ))}
            </View>
            <Text style={styles.stat}>{stat.value}</Text>
          </View>

          <StatsBarChart
            stat={stat.value}
            color={stat.color}
          />
        </View>
      ))}

      {/* Total stat */}
      <View style={styles.row}>
        <View style={styles.dataWrapper}>
          <Text style={styles.subHeader}>
            {t(`pokemon-info.stats.${pokemonTotalStat.label}`)}
          </Text>
          <Text style={styles.stat}>{pokemonTotalStat.value}</Text>
        </View>

        <StatsBarTotalChart stat={pokemonTotalStat.value} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  subHeader: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsSemiBold,
    marginTop: 10,
    color: Colors.darkGrey1
  },
  dataWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '35%'
  },
  starWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 3,
    flex: 1
  },
  stat: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    marginTop: 10,
    color: Colors.black
  }
});
