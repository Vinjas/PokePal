import { CustomText } from '@components/custom-text';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
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
import RulerSvg from '@assets/svg/ruler.svg';
import WeightSvg from '@assets/svg/weight.svg';
import RulerSvgWhite from '@assets/svg/ruler--white.svg';
import WeightSvgWhite from '@assets/svg/weight--white.svg';
import FemaleSvg from '@assets/svg/female.svg';
import MaleSvg from '@assets/svg/male.svg';

const FemaleIcon = () => (
  <FemaleSvg
    width={24}
    height={24}
    style={{ marginRight: 8 }}
  />
);

const MaleIcon = () => (
  <MaleSvg
    width={20}
    height={20}
    style={{ marginRight: 8 }}
  />
);

export const PokemonAboutTab = ({ route }: any) => {
  const { t } = useTranslation();

  const { data } = route;

  const { pokemonData, pokemonSpecies, isLoading } = data;

  const { isDarkMode } = useContext(AppThemeContext);

  const RulerIcon = () =>
    isDarkMode ? (
      <RulerSvgWhite
        width={15}
        height={15}
        style={{ marginLeft: 5, marginTop: 5 }}
      />
    ) : (
      <RulerSvg
        width={15}
        height={15}
        style={{ marginLeft: 5, marginTop: 5 }}
      />
    );

  const WeightIcon = () =>
    isDarkMode ? (
      <WeightSvgWhite
        width={15}
        height={15}
        style={{ marginLeft: 5, marginTop: 5 }}
      />
    ) : (
      <WeightSvg
        width={15}
        height={15}
        style={{ marginLeft: 5, marginTop: 5 }}
      />
    );

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

  const pokemonName = useMemo(() => {
    if (!pokemonSpecies) return '';

    const names = pokemonSpecies.names.filter(
      (entry: { language: { name: string } }) => entry.language.name === i18n.language
    );

    if (!names) return '';

    const newestEntry: { name: string } = last(names) ?? { name: '' };

    return newestEntry.name;
  }, [pokemonSpecies]);

  const pokemonGenera = useMemo(() => {
    if (!pokemonSpecies) return '';

    const genera = pokemonSpecies.genera.filter(
      (entry: { language: { name: string } }) => entry.language.name === i18n.language
    );

    if (!genera) return '';

    const newestEntry: { genus: string } = last(genera) ?? { genus: '' };

    return newestEntry.genus;
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
          {/* NAME */}
          <View style={styles.rowWrapper}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <CustomText
                style={[
                  styles.header,
                  isDarkMode ? styles.headerDark : styles.headerLight
                ]}
              >
                {pokemonName}
              </CustomText>

              <View>
                <CustomText style={[styles.textGenera]}>
                  {` - ${pokemonGenera}`}
                </CustomText>
              </View>
            </View>

            <View>
              <CustomText style={[styles.textGeneration]}>
                {t(`generations.${pokemonSpecies.generation.name}`)}
              </CustomText>
            </View>
          </View>

          {/* FLAVOR TEXT */}
          <CustomText
            style={[
              [styles.textFlavor, isDarkMode ? styles.textDark : styles.textLight],
              isDarkMode ? styles.textDark : styles.textLight
            ]}
          >
            {`"${parseNewLines(flavorText)}"`}
          </CustomText>

          {/* ABILITIES */}
          <CustomText
            style={[styles.header, isDarkMode ? styles.headerDark : styles.headerLight]}
          >
            {t('pokemon-info.about.abilities')}
          </CustomText>
          <View style={{ ...styles.rowWrapper, flexWrap: 'wrap' }}>
            {pokemonData.abilities.map((ability: any, index: number) => (
              <View
                key={index}
                style={[
                  { width: '48%' },
                  styles.hightlightSecondary,
                  isDarkMode
                    ? styles.highlightSecondaryDark
                    : styles.highlightSecondaryLight
                ]}
              >
                <CustomText
                  key={index}
                  style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
                >
                  {t(`pokemon-info.abilities.${ability.ability.name}`)}
                </CustomText>
              </View>
            ))}
          </View>

          {/* WEIGHT AND HEIGHT */}
          <View
            style={[
              styles.weightPaper,
              isDarkMode ? styles.weightPaperDark : styles.weightPaperLight
            ]}
          >
            <View style={styles.column}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CustomText style={styles.subHeader}>
                  {t('pokemon-info.about.height')}
                </CustomText>
                <RulerIcon />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: 10
                }}
              >
                <CustomText
                  style={[
                    styles.text,
                    { fontFamily: FontFamily.poppinsSemiBold },
                    isDarkMode ? styles.textDark : styles.textLight
                  ]}
                >
                  {`${calculatedHeight.meters} m`}
                </CustomText>
                <CustomText
                  style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
                >
                  {`(${calculatedHeight.feet}'${calculatedHeight.inches}")`}
                </CustomText>
              </View>
            </View>

            <View style={styles.column}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <CustomText style={styles.subHeader}>
                  {t('pokemon-info.about.weight')}
                </CustomText>
                <WeightIcon />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: 10
                }}
              >
                <CustomText
                  style={[
                    styles.text,
                    { fontFamily: FontFamily.poppinsSemiBold },
                    isDarkMode ? styles.textDark : styles.textLight
                  ]}
                >
                  {`${calculatedWeight.kilograms} kg`}
                </CustomText>
                <CustomText
                  style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
                >
                  {`(${calculatedWeight.pounds} lbs)`}
                </CustomText>
              </View>
            </View>
          </View>

          {/* TRAINING */}
          <CustomText
            style={[styles.header, isDarkMode ? styles.headerDark : styles.headerLight]}
          >
            {t('pokemon-info.about.training')}
          </CustomText>

          <View style={styles.rowWrapper}>
            <CustomText style={styles.subHeader}>
              {t('pokemon-info.about.stats.base-exp')}
            </CustomText>
            <View
              style={[
                styles.hightlightPrimary,
                { width: '40%' },
                isDarkMode ? styles.highlightPrimaryDark : styles.hightlightPrimaryLight
              ]}
            >
              <CustomText
                style={[
                  styles.text,
                  { fontFamily: FontFamily.poppinsSemiBold },
                  isDarkMode ? styles.textDark : styles.textLight
                ]}
              >
                {pokemonData.base_experience}
              </CustomText>
            </View>
          </View>

          <View style={styles.rowWrapper}>
            <CustomText style={styles.subHeader}>
              {t('pokemon-info.about.stats.base-happiness')}
            </CustomText>
            <View
              style={[
                styles.hightlightPrimary,
                {
                  width: '40%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 5,
                  alignItems: 'center'
                },
                isDarkMode ? styles.highlightPrimaryDark : styles.hightlightPrimaryLight
              ]}
            >
              <CustomText
                style={[
                  styles.text,
                  { fontFamily: FontFamily.poppinsSemiBold },
                  isDarkMode ? styles.textDark : styles.textLight
                ]}
              >
                {pokemonSpecies.base_happiness}
              </CustomText>
              <CustomText
                style={{
                  fontSize: 12,
                  color: isDarkMode ? LogoColors.blue : Colors.darkGrey1
                }}
              >
                {'(' +
                  t(
                    `pokemon-info.happiness.${calculateHappiness(
                      pokemonSpecies.base_happiness
                    )}`
                  ) +
                  ')'}
              </CustomText>
            </View>
          </View>

          <View style={styles.rowWrapper}>
            <CustomText style={styles.subHeader}>
              {t('pokemon-info.about.stats.growth-rate')}
            </CustomText>

            <View
              style={[
                styles.hightlightPrimary,
                { width: '40%' },
                isDarkMode ? styles.highlightPrimaryDark : styles.hightlightPrimaryLight
              ]}
            >
              <CustomText
                style={[
                  styles.text,
                  { fontFamily: FontFamily.poppinsSemiBold },
                  isDarkMode ? styles.textDark : styles.textLight
                ]}
              >
                {t(`pokemon-info.growth-rate.${pokemonSpecies.growth_rate.name}`)}
              </CustomText>
            </View>
          </View>

          <View style={styles.rowWrapper}>
            <CustomText style={styles.subHeader}>
              {t('pokemon-info.about.stats.capture-rate')}
            </CustomText>

            <View
              style={[
                styles.hightlightPrimary,
                {
                  width: '40%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 5,
                  alignItems: 'center'
                },
                isDarkMode ? styles.highlightPrimaryDark : styles.hightlightPrimaryLight
              ]}
            >
              <CustomText
                style={[
                  styles.text,
                  { fontFamily: FontFamily.poppinsSemiBold },
                  isDarkMode ? styles.textDark : styles.textLight
                ]}
              >
                {`${pokemonSpecies.capture_rate}`}
              </CustomText>
              <CustomText
                style={{
                  fontSize: 12,
                  color: isDarkMode ? LogoColors.blue : Colors.darkGrey1
                }}
              >
                {`(${calculateCaptureRate})`}
              </CustomText>
            </View>
          </View>

          {/* BREEDING */}
          <View
            style={[
              styles.breedingPaper,
              isDarkMode ? styles.breedingPaperDark : styles.breedingPaperLight
            ]}
          >
            <CustomText
              style={[styles.header, isDarkMode ? styles.headerDark : styles.headerLight]}
            >
              {t('pokemon-info.about.breeding')}
            </CustomText>

            <CustomText style={styles.subHeader}>
              {t('pokemon-info.about.stats.gender')}
            </CustomText>

            <View
              style={{
                ...styles.rowWrapper,
                justifyContent: 'space-around',
                marginVertical: 10
              }}
            >
              <View style={{ ...styles.rowWrapper, marginTop: 0 }}>
                <MaleIcon />
                <CustomText
                  style={[
                    styles.text,
                    styles.textFocus,
                    isDarkMode ? styles.textDark : styles.textLight
                  ]}
                >
                  {calculatedGenders.male}
                </CustomText>
              </View>

              <View style={{ ...styles.rowWrapper, marginTop: 0 }}>
                <FemaleIcon />
                <CustomText
                  style={[
                    styles.text,
                    styles.textFocus,
                    isDarkMode ? styles.textDark : styles.textLight
                  ]}
                >
                  {calculatedGenders.female}
                </CustomText>
              </View>
            </View>

            <CustomText style={styles.subHeader}>
              {t('pokemon-info.about.stats.egg-groups')}
            </CustomText>

            <View style={styles.rowWrapper}>
              {pokemonSpecies.egg_groups.map((eggGroup: any, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.hightlightSecondary,
                    { width: '48%' },
                    { marginVertical: 10 },
                    isDarkMode
                      ? styles.highlightSecondaryDark
                      : styles.highlightSecondaryLight
                  ]}
                >
                  <CustomText
                    key={index}
                    style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
                  >
                    {t(`pokemon-info.egg-groups.${eggGroup.name}`)}
                  </CustomText>
                </View>
              ))}
            </View>

            <CustomText style={styles.subHeader}>
              {t('pokemon-info.about.stats.egg-cycle')}
            </CustomText>
            <View
              style={[
                styles.hightlightSecondary,
                { marginVertical: 10 },
                isDarkMode
                  ? styles.highlightSecondaryDark
                  : styles.highlightSecondaryLight
              ]}
            >
              <CustomText
                style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}
              >
                {pokemonSpecies.hatch_counter}
              </CustomText>
            </View>
          </View>
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
  textFocus: {
    fontFamily: FontFamily.poppinsSemiBold
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
    marginTop: 15,
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
  },
  rowWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  textFlavor: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10
  },
  hightlightPrimary: {
    borderTopRightRadius: 30,
    borderBottomEndRadius: 30,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderRadius: 30,
    paddingVertical: 2,
    paddingHorizontal: 15
  },
  hightlightPrimaryLight: {
    backgroundColor: LogoColors.lightBlue
  },
  highlightPrimaryDark: {
    backgroundColor: LogoColors.darkerBlue,
    borderRadius: 30
  },
  hightlightSecondary: {
    borderRadius: 30,
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: LogoColors.blue
  },
  highlightSecondaryLight: {
    borderColor: LogoColors.blue
  },
  highlightSecondaryDark: {
    borderColor: LogoColors.blue,
    backgroundColor: LogoColors.darkBlue
  },
  textGenera: {
    fontSize: 12,
    marginTop: 10,
    fontStyle: 'italic',
    color: Colors.darkGrey1
  },
  textGeneration: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'right',
    color: Colors.darkGrey1,
    fontFamily: FontFamily.poppinsSemiBold
  },
  weightPaper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 3,
    borderRadius: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginTop: 20
  },
  weightPaperDark: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.darkGrey1
  },
  weightPaperLight: {
    backgroundColor: Colors.pureWhite
  },
  column: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  breedingPaper: {
    elevation: 3,
    borderRadius: 10,
    backgroundColor: Colors.pureWhite,
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20
  },
  breedingPaperDark: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.darkGrey1
  },
  breedingPaperLight: {
    backgroundColor: Colors.pureWhite
  }
});
