import { CustomText } from '@components/custom-text';
import { RQ_KEY } from '@constants/react-query';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { getPokemonSpecies } from '@services/poke-api';
import { useQuery } from '@tanstack/react-query';
import { parseNewLines } from '@utils/parse-new-lines';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

export const PokemonAboutTab = ({ route }: any) => {
  const { t } = useTranslation();

  const { pokemonData } = route;

  const { name } = pokemonData;

  const { data: pokemonSpecies, isLoading } = useQuery({
    queryKey: [RQ_KEY.POKEMON_SPECIES, name],
    queryFn: () => getPokemonSpecies(name)
  });

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
        <View style={styles.aboutWrapper}>
          <CustomText style={styles.text}>
            {parseNewLines(pokemonSpecies.flavor_text_entries[0].flavor_text)}
          </CustomText>

          {/* ABILITIES */}
          <CustomText style={styles.header}>
            {t('pokemon-info.about.abilities')}
          </CustomText>
          {pokemonData.abilities.map((ability: any, index: number) => (
            <CustomText
              key={index}
              style={styles.text}
            >
              {ability.ability.name}
            </CustomText>
          ))}

          {/* WEIGHT AND HEIGHT */}
          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.height')}
          </CustomText>
          <CustomText style={styles.text}>{pokemonData.height}</CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.weight')}
          </CustomText>
          <CustomText style={styles.text}>{pokemonData.weight}</CustomText>

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
          <CustomText style={styles.text}>{pokemonData.base_experience}</CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.base-happiness')}
          </CustomText>
          <CustomText style={styles.text}>{pokemonSpecies.base_happiness}</CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.growth-rate')}
          </CustomText>
          <CustomText style={styles.text}>{pokemonSpecies.growth_rate.name}</CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.capture-rate')}
          </CustomText>
          <CustomText style={styles.text}>{pokemonSpecies.capture_rate}</CustomText>

          {/* BREEDING */}
          <CustomText style={styles.header}>
            {t('pokemon-info.about.breeding')}
          </CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.gender')}
          </CustomText>
          <CustomText style={styles.text}>{pokemonSpecies.gender_rate}</CustomText>

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.egg-groups')}
          </CustomText>
          {pokemonSpecies.egg_groups.map((eggGroup: any, index: number) => (
            <CustomText
              key={index}
              style={styles.text}
            >
              {eggGroup.name}
            </CustomText>
          ))}

          <CustomText style={styles.subHeader}>
            {t('pokemon-info.about.stats.egg-cycle')}
          </CustomText>
          <CustomText style={styles.text}>{pokemonSpecies.hatch_counter}</CustomText>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%'
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  aboutWrapper: {},
  text: {
    fontSize: 14,
    textAlign: 'center'
  },
  header: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    marginTop: 10,
    color: Colors.black
  },
  subHeader: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsSemiBold,
    marginTop: 10,
    color: Colors.darkGrey1
  }
});
