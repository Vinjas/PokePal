import { StatsBarChart } from '@components/stat-bar-chart';
import { StatsBarTotalChart } from '@components/stat-bar-total-chart';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { convertPokemonStats, getPokemonTotalStat } from 'mapper/pokemon-stats-mapper';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import StarIcon from '@assets/svg/star.svg';
import { AppThemeContext } from 'context/app-theme-context';

const StarButton = () => {
  return (
    <StarIcon
      width={9}
      height={9}
    />
  );
};

export const PokemonStatsTab = ({ route }: any) => {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  const { data } = route;

  const { pokemonData, isLoading } = data;

  const mappedPokemonStats = useMemo(() => {
    if (!pokemonData) return [];

    return convertPokemonStats(pokemonData.stats);
  }, [pokemonData]);

  const pokemonTotalStat: { label: string; value: number } = useMemo(() => {
    if (!pokemonData) return { label: 'total', value: 0 };

    return getPokemonTotalStat(pokemonData.stats);
  }, [pokemonData]);

  return (
    <View style={styles.wrapper}>
      {isLoading && (
        <ActivityIndicator
          size={90}
          color={LogoColors.red}
          style={styles.loader}
        />
      )}

      {!isLoading && mappedPokemonStats && (
        <View>
          {mappedPokemonStats.map((stat: any) => (
            <View
              key={stat.label}
              style={styles.row}
            >
              <View style={styles.dataWrapper}>
                <Text style={styles.subHeader}>
                  {t(`pokemon-info.stats.${stat.label}`)}
                </Text>
                <View style={styles.starWrapper}>
                  {Array.from({ length: Math.min(stat.effort, 3) }).map((_, index) => (
                    <StarButton key={index} />
                  ))}
                </View>
                <Text
                  style={[styles.stat, isDarkMode ? styles.statDark : styles.statLight]}
                >
                  {stat.value}
                </Text>
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
              <Text
                style={[styles.stat, isDarkMode ? styles.statDark : styles.statLight]}
              >
                {pokemonTotalStat.value}
              </Text>
            </View>

            <StatsBarTotalChart stat={pokemonTotalStat.value} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
    paddingVertical: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  subHeader: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
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
    fontFamily: FontFamily.poppinsSemiBold,
    marginTop: 10,
    color: Colors.black,
    borderRadius: 25
  },
  statDark: {
    color: Colors.pureWhite
  },
  statLight: {
    color: Colors.black
  },
  loader: {
    marginTop: 30
  }
});
