import { CustomText } from '@components/custom-text';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { parseNewLines } from '@utils/parse-new-lines';
import { last } from 'lodash-es';
import React, { useContext, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
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
import DownArrowSvg from '@assets/svg/down-arrow.svg';
import { RectButton } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { useQuery } from '@tanstack/react-query';
import { RQ_KEY } from '@constants/react-query';
import { getAbility } from '@services/poke-api';
import CloseGreySvg from '@assets/svg/close--grey.svg';

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

const DownArrowIcon = () => (
  <DownArrowSvg
    width={12}
    height={12}
    style={{}}
  />
);

const CloseIcon = () => (
  <CloseGreySvg
    width={12}
    height={12}
    style={{ marginRight: 5 }}
  />
);

export const PokemonAboutTab = ({ route }: any) => {
  const { t } = useTranslation();

  const { data } = route;

  const { pokemonStatic, isLoadingPokemonStatic } = data;

  const { isDarkMode } = useContext(AppThemeContext);

  const [isAbilityModalOpen, setIsAbilityModalOpen] = useState(false);
  const [currentAbility, setCurrentAbility] = useState('');

  const {
    data: abilityData,
    isLoading: isAbilityLoading,
    isError: isAbilityError
  } = useQuery({
    queryKey: [RQ_KEY.ABILITY, currentAbility],
    queryFn: () => getAbility(currentAbility),
    enabled: !!currentAbility
  });

  const abilityFlavorTextTranslated = useMemo(() => {
    if (!abilityData) return '';

    const flavorTextEntries = abilityData.flavor_text_entries.filter(
      (entry: { language: { name: string } }) => entry.language.name === i18n.language
    );

    if (!flavorTextEntries) return '';

    const newestEntry: { flavor_text: string } = last(flavorTextEntries) ?? {
      flavor_text: ''
    };

    return newestEntry.flavor_text;
  }, [abilityData]);

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

  const calculatedWeight: { kilograms: string; pounds: string } = useMemo(() => {
    if (!pokemonStatic) return { kilograms: '0', pounds: '0' };

    return calculateWeight(pokemonStatic.weight);
  }, [pokemonStatic]);

  const calculatedHeight: { meters: string; feet: number; inches: number } =
    useMemo(() => {
      if (!pokemonStatic) return { meters: '0', feet: 0, inches: 0 };

      return calculateHeight(pokemonStatic.height);
    }, [pokemonStatic]);

  const calculateCaptureRate: string = useMemo(() => {
    if (!pokemonStatic) return '0%';

    return calculateCaptureRatePercentage(pokemonStatic.training.captureRate);
  }, [pokemonStatic]);

  const calculatedGenders: { male: string; female: string } = useMemo(() => {
    if (!pokemonStatic) return { male: '0%', female: '0%' };

    return calculateGenderPercentage(pokemonStatic.breeding.genderRate);
  }, [pokemonStatic]);

  function handleAbilityClick() {
    setIsAbilityModalOpen(true);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      {isLoadingPokemonStatic && (
        <ActivityIndicator
          size={90}
          color={LogoColors.red}
          style={styles.loader}
        />
      )}

      <Modal
        isVisible={isAbilityModalOpen}
        hideModalContentWhileAnimating // Prevents rendering issues
        style={styles.modal}
        backdropOpacity={0.5}
        onBackButtonPress={() => setIsAbilityModalOpen(false)}
        onBackdropPress={() => setIsAbilityModalOpen(false)}
      >
        <View
          style={[
            styles.modalView,
            isDarkMode ? styles.modalViewDark : styles.modalViewLight
          ]}
        >
          {isAbilityLoading && (
            <ActivityIndicator
              size={30}
              color={LogoColors.red}
              style={styles.loader}
            />
          )}

          {!isAbilityLoading && !isAbilityError && abilityData && (
            <View>
              <View
                style={[
                  styles.abilityTitleWrapper,
                  isDarkMode
                    ? styles.abilityTitleWrapperDark
                    : styles.abilityTitleWrapperLight
                ]}
              >
                <CustomText
                  style={[
                    styles.abilityModalTitleText,
                    isDarkMode
                      ? styles.abilityModalTitleTextDark
                      : styles.abilityModalTitleTextLight
                  ]}
                >
                  {t(`pokemon-info.abilities.${abilityData.name}`)}
                </CustomText>
                <TouchableOpacity
                  style={{ padding: 5 }}
                  onPress={handleAbilityClick}
                >
                  <CloseIcon />
                </TouchableOpacity>
              </View>
              <View>
                <CustomText
                  style={[
                    styles.abilityModalText,
                    isDarkMode
                      ? styles.abilityModalTextDark
                      : styles.abilityModalTextLight
                  ]}
                >
                  {`"${parseNewLines(abilityFlavorTextTranslated)}"`}
                </CustomText>
              </View>
            </View>
          )}
        </View>
      </Modal>

      {!isLoadingPokemonStatic && pokemonStatic && (
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
                {pokemonStatic.names[i18n.language]}
              </CustomText>

              <View>
                <CustomText style={[styles.textGenera]}>
                  {` - ${pokemonStatic.genera[i18n.language]}`}
                </CustomText>
              </View>
            </View>

            <View>
              <CustomText style={[styles.textGeneration]}>
                {t(`generations.${pokemonStatic.generation}`)}
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
            {`"${parseNewLines(pokemonStatic.flavorText[i18n.language])}"`}
          </CustomText>

          {/* ABILITIES */}
          <CustomText
            style={[styles.header, isDarkMode ? styles.headerDark : styles.headerLight]}
          >
            {t('pokemon-info.about.abilities')}
          </CustomText>
          <View style={{ ...styles.rowWrapper, flexWrap: 'wrap' }}>
            {pokemonStatic.abilities.map((ability: any, index: number) => (
              <RectButton
                key={index}
                onPress={() => {
                  handleAbilityClick();
                  setCurrentAbility(ability.name);
                }}
                style={[{ width: '48%' }, styles.abilityButton]}
              >
                <CustomText
                  key={index}
                  style={styles.abilityText}
                >
                  {t(`pokemon-info.abilities.${ability.name}`)}
                </CustomText>

                <DownArrowIcon />
              </RectButton>
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
                {pokemonStatic.training.baseExperience}
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
                {pokemonStatic.training.baseHappiness}
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
                      pokemonStatic.training.baseHappiness
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
                {t(`pokemon-info.growth-rate.${pokemonStatic.training.growthRate}`)}
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
                {`${pokemonStatic.training.capture_rate}`}
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
              {pokemonStatic.breeding.eggGroups.map((eggGroup: any, index: number) => (
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
                {pokemonStatic.breeding.hatchCounter}
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
    alignItems: 'center'
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
  abilityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 15,
    elevation: 2,
    marginBottom: 10,
    backgroundColor: Colors.sortButton
  },
  abilityText: {
    fontSize: 14,
    color: Colors.pureWhite,
    fontFamily: FontFamily.poppinsMedium,
    paddingLeft: 10
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
  },
  modal: {
    marginBottom: 150,
    marginHorizontal: 80,
    padding: 0
  },
  modalView: {
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  modalViewDark: {
    backgroundColor: Colors.black
  },
  modalViewLight: {
    backgroundColor: Colors.pureWhite
  },
  abilityTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  abilityTitleWrapperDark: {
    borderBottomColor: LogoColors.darkerBlue
  },
  abilityTitleWrapperLight: {
    borderBottomColor: LogoColors.blue
  },
  abilityModalTitleText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold
  },
  abilityModalTitleTextDark: {
    color: Colors.darkGrey1
  },
  abilityModalTitleTextLight: {
    color: Colors.black
  },
  abilityModalText: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10
  },
  abilityModalTextDark: {
    color: Colors.pureWhite
  },
  abilityModalTextLight: {
    color: LogoColors.darkBlue
  }
});
