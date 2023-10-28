import { CustomText } from '@components/custom-text';
import { RQ_KEY } from '@constants/react-query';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { getPokemonSpecies } from '@services/poke-api';
import { useQuery } from '@tanstack/react-query';
import { parseNewLines } from '@utils/parse-new-lines';
import { last } from 'lodash-es';
import React, { useContext, useMemo } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';
import i18n from '@i18n/i18n';
import { calculateWeight } from '@utils/calculate-weight';
import { calculateHeight } from '@utils/calculate-height';
import { calculateHappiness } from '@utils/calculate-happiness';
import { calculateCaptureRatePercentage } from '@utils/calculate-capture-rate-percentage';
import { calculateGenderPercentage } from '@utils/calculate-gender-percentage';

export const PokemonAboutTab = ({ route }: any) => {
  const { t } = useTranslation();

  const { pokemonData } = route;

  const { isDarkMode } = useContext(AppThemeContext);

  const { name } = pokemonData;

  const { data: pokemonSpecies, isLoading } = useQuery({
    queryKey: [RQ_KEY.POKEMON_SPECIES, name],
    queryFn: () => getPokemonSpecies(name)
  });

  const flavorText = useMemo(() => {
    if (!pokemonSpecies) return '';

    const flavorTextEntries = pokemonSpecies.flavor_text_entries.filter(
      (entry: { language: { name: string } }) => entry.language.name === i18n.language
    );

    if (!flavorTextEntries) return '';

    const newestEntry: { flavor_text: string } = last(flavorTextEntries) ?? {
      flavor_text: ''
    };

    return newestEntry.flavor_text;
  }, [pokemonSpecies]);

  const calculatedWeight: { kilograms: string; pounds: string } = useMemo(() => {
    if (!pokemonData) return { kilograms: '0', pounds: '0' };

    return calculateWeight(pokemonData.weight);
  }, [pokemonData]);

  const calculatedHeight: { meters: string; feet: number; inches: number } =
    useMemo(() => {
      if (!pokemonData) return { meters: '0', feet: 0, inches: 0 };

      return calculateHeight(pokemonData.height);
    }, [pokemonData]);

  const calculateCaptureRate: string = useMemo(() => {
    if (!pokemonSpecies) return '0%';

    return calculateCaptureRatePercentage(pokemonSpecies.capture_rate);
  }, [pokemonSpecies]);

  const calculatedGenders: { male: string; female: string } = useMemo(() => {
    if (!pokemonSpecies) return { male: '0%', female: '0%' };

    return calculateGenderPercentage(pokemonSpecies.gender_rate);
  }, [pokemonSpecies]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      {isLoading && (
        <ActivityIndicator
          size={90}
          color={LogoColors.red}
          style={styles.loader}
        />
      )}

      {!isLoading && pokemonSpecies && (
        <View style={[]}>
          {/* FLAVOR TEXT */}
          <CustomText
            style={[
              [styles.text, isDarkMode ? styles.textDark : styles.textLight],
              isDarkMode ? styles.textDark : styles.textLight
            ]}
          >
            {parseNewLines(flavorText)}
          </CustomText>

          {/* ABILITIES */}
          <CustomText style={styles.header}>
            {t('pokemon-info.about.abilities')}
          </CustomText>
          {pokemonData.abilities.map((ability: any, index: number) => (
            <CustomText
              key={index}
              style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
            >
              {t(`pokemon-info.abilities.${ability.ability.name}`)}
            </CustomText>
          ))}

          {/* WEIGHT AND HEIGHT */}
          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.height')}
          </CustomText>
          <CustomText
            style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
          >
            {`${calculatedHeight.meters} m - ${calculatedHeight.feet}'${calculatedHeight.inches}"`}
          </CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.weight')}
          </CustomText>
          <CustomText
            style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
          >
            {`${calculatedWeight.kilograms} kg - ${calculatedWeight.pounds} lbs`}
          </CustomText>

          <CustomText style={styles.subHeader}>
            {pokemonSpecies.generation.name}
          </CustomText>

          {/* TRAINING */}
          <CustomText style={styles.header}>
            {t('pokemon-info.about.training')}
          </CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.base-exp')}
          </CustomText>
          <CustomText
            style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
          >
            {pokemonData.base_experience}
          </CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.base-happiness')}
          </CustomText>
          <CustomText
            style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
          >
            {pokemonSpecies.base_happiness +
              ' (' +
              t(
                `pokemon-info.happiness.${calculateHappiness(
                  pokemonSpecies.base_happiness
                )}`
              ) +
              ')'}
          </CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.growth-rate')}
          </CustomText>
          <CustomText
            style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
          >
            {t(`pokemon-info.growth-rate.${pokemonSpecies.growth_rate.name}`)}
          </CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.capture-rate')}
          </CustomText>
          <CustomText
            style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
          >
            {`${pokemonSpecies.capture_rate} (${calculateCaptureRate})`}
          </CustomText>

          {/* BREEDING */}
          <CustomText style={styles.header}>
            {t('pokemon-info.about.breeding')}
          </CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.gender')}
          </CustomText>
          <CustomText
            style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
          >
            {t('pokemon-info.gender.male') + calculatedGenders.male}
          </CustomText>
          <CustomText
            style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
          >
            {t('pokemon-info.gender.female') + calculatedGenders.female}
          </CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.egg-groups')}
          </CustomText>
          {pokemonSpecies.egg_groups.map((eggGroup: any, index: number) => (
            <CustomText
              key={index}
              style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
            >
              {t(`pokemon-info.egg-groups.${eggGroup.name}`)}
            </CustomText>
          ))}

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.egg-cycle')}
          </CustomText>
          <CustomText
            style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
          >
            {pokemonSpecies.hatch_counter}
          </CustomText>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    marginTop: 30
  },
  container: {
    paddingHorizontal: 20
  },
  aboutWrapperDark: {
    backgroundColor: Colors.black
  },
  aboutWrapperLight: {
    backgroundColor: Colors.pureWhite
  },
  text: {
    fontSize: 14,
    textAlign: 'center'
  },
  textDark: {
    color: Colors.pureWhite
  },
  textLight: {
    color: Colors.black
  },
  header: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    marginTop: 10,
    color: Colors.black
  },
  headerDark: {
    color: Colors.pureWhite
  },
  headerLight: {
    color: Colors.black
  },
  subHeader: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsSemiBold,
    marginTop: 10,
    color: Colors.darkGrey1
  }
});
