import { CustomText } from '@components/custom-text';
import { RQ_KEY } from '@constants/react-query';
import { Colors, LogoColors } from '@constants/styles/colors';
import { getEvolutionChain, getPokemon, getPokemonSpecies } from '@services/poke-api';
import { useQuery } from '@tanstack/react-query';
import { use } from 'i18next';
import { isEmpty, omitBy, transform } from 'lodash-es';
import { evolutionChainMapper } from 'mapper/evolution-chain-mapper';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import LongArrowRightIcon from '@assets/svg/long-arrow-right.svg';
import LongArrowRightIconDark from '@assets/svg/long-arrow-right--dark.svg';
import { AppThemeContext } from 'context/app-theme-context';
import { formatPokemonName } from '@utils/format-pokemon-name';
import { FontFamily } from '@constants/styles/fontsFamily';
import { BorderlessButton } from 'react-native-gesture-handler';
import { HOME_STACK } from '@constants/screens';
import { useNavigation } from '@react-navigation/native';

export const PokemonEvolutionTab = ({ route }: any) => {
  const { t } = useTranslation();

  const navigation = useNavigation();

  const { pokemonData } = route;
  const { name } = pokemonData;

  const { isDarkMode } = useContext(AppThemeContext);

  const { data: evolutionChainUrl, isLoading: pokemonSpeciesLoading } = useQuery({
    queryKey: [RQ_KEY.POKEMON_SPECIES, name],
    queryFn: () => getPokemonSpecies(name),
    select: data => data?.evolution_chain?.url
  });

  const { data: evolutionChain, isLoading: evolutionChainLoading } = useQuery({
    queryKey: [RQ_KEY.EVOLUTION_CHAIN, evolutionChainUrl],
    queryFn: () => getEvolutionChain(evolutionChainUrl),
    enabled: !!evolutionChainUrl
  });

  const LongArrowRight = () =>
    isDarkMode ? (
      <LongArrowRightIconDark
        width={40}
        height={40}
      />
    ) : (
      <LongArrowRightIcon
        width={40}
        height={40}
      />
    );

  function getImageUri(pokemonId: any) {
    const url =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

    return `${url}/${pokemonId}.png`;
  }

  const isLoading = pokemonSpeciesLoading || evolutionChainLoading;

  const evolutionChainMapped = useMemo(() => {
    if (!evolutionChain) return [];

    return evolutionChainMapper(evolutionChain);
  }, [evolutionChain]);

  async function onPokemonPress(pokemonName: string) {
    const newPokemonData = await getPokemon(pokemonName);

    if (newPokemonData) {
      navigation.push(HOME_STACK.POKEMON_DETAIL, { pokemonData: newPokemonData });
    }
  }

  function renderEvolution(evolutionData) {
    return (
      <View style={{ gap: 15 }}>
        {evolutionData.map((pokemon, index) => {
          if (evolutionData.length === 1) {
            return (
              <View
                key={index}
                style={{
                  ...styles.pokemonWrapper,
                  paddingVertical: 30,
                  gap: 30
                }}
              >
                <CustomText
                  style={[
                    styles.title,
                    isDarkMode ? styles.titleDark : styles.titleLight
                  ]}
                >
                  {t('evolution.no-evolution')}
                </CustomText>

                <View style={{ alignItems: 'center' }}>
                  <View style={styles.cardImageWrapper}>
                    <Image
                      resizeMode='contain'
                      style={styles.cardImage}
                      source={{
                        uri: getImageUri(pokemonData.id)
                      }}
                    />
                  </View>
                  <CustomText
                    style={[
                      styles.pokemonTitle,
                      isDarkMode ? styles.titleDark : styles.titleLight
                    ]}
                  >
                    {formatPokemonName(pokemonData.name)}
                  </CustomText>
                </View>
              </View>
            );
          }

          const filteredEvolutionDetails = transform(
            evolutionChainMapped[index].evolution_details,
            (result, value, key) => {
              if (key !== 'trigger' && !!value) {
                if (value.name) {
                  result[key] = value.name;
                } else {
                  result[key] = value;
                }
              }
            }
          );

          if (index > 0) {
            return (
              <View
                key={index}
                style={styles.evolutionRow}
              >
                <TouchableOpacity
                  style={styles.pokemonWrapper}
                  onPress={() =>
                    onPokemonPress(evolutionChainMapped[pokemon.order - 2].name)
                  }
                >
                  <View style={styles.cardImageWrapper}>
                    <Image
                      resizeMode='contain'
                      style={styles.cardImage}
                      source={{
                        uri: getImageUri(
                          evolutionChainMapped[pokemon.order - 2].id ?? pokemonData.id
                        )
                      }}
                    />
                  </View>
                  <CustomText
                    style={[
                      styles.pokemonTitle,
                      isDarkMode ? styles.titleDark : styles.titleLight
                    ]}
                  >
                    {formatPokemonName(evolutionChainMapped[pokemon.order - 2].name)}
                  </CustomText>
                </TouchableOpacity>

                <View style={styles.triggerWrapper}>
                  <LongArrowRight />

                  {evolutionChainMapped[index].trigger.map((trigger, triggerIndex) => {
                    if (
                      trigger !== evolutionChainMapped[index].trigger[triggerIndex - 1]
                    ) {
                      return (
                        <CustomText
                          style={[
                            styles.title,
                            isDarkMode ? styles.titleDark : styles.titleLight
                          ]}
                          key={`${trigger}-${triggerIndex}`}
                        >
                          {t(`evolution.triggers.${trigger}`)}
                        </CustomText>
                      );
                    }
                  })}
                  <View>
                    {Object.entries(filteredEvolutionDetails).map(([key, req]) => (
                      <View key={key}>
                        <CustomText>
                          {t(`evolution.requirements.${key}`)} {req}
                        </CustomText>
                      </View>
                    ))}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.pokemonWrapper}
                  onPress={() => onPokemonPress(pokemon.name)}
                >
                  <View style={styles.cardImageWrapper}>
                    <Image
                      resizeMode='contain'
                      style={styles.cardImage}
                      source={{
                        uri: getImageUri(pokemon.id ?? pokemonData.id)
                      }}
                    />
                  </View>
                  <CustomText
                    style={[
                      styles.pokemonTitle,
                      isDarkMode ? styles.titleDark : styles.titleLight
                    ]}
                  >
                    {formatPokemonName(pokemon.name)}
                  </CustomText>
                </TouchableOpacity>
              </View>
            );
          }
          return null;
        })}
      </View>
    );
  }

  return (
    <ScrollView style={styles.wrapper}>
      {isLoading && (
        <ActivityIndicator
          size={90}
          color={LogoColors.red}
          style={styles.loader}
        />
      )}

      {!isLoading && evolutionChain && (
        <View>{renderEvolution(evolutionChainMapped)}</View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loader: {
    marginTop: 30
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 20
  },
  evolutionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.ligthGrey1,
    paddingVertical: 15
  },
  triggerWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardImageWrapper: {
    backgroundColor: LogoColors.lightBlue,
    borderRadius: 50,
    padding: 10
    //position: 'absolute',
    //bottom: -1
  },
  cardImage: {
    width: 80,
    height: 80
  },
  pokemonWrapper: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  pokemonTitle: {
    fontFamily: FontFamily.poppinsMedium
  },
  title: {
    fontFamily: FontFamily.poppinsSemiBold
  },
  titleDark: {
    color: Colors.pureWhite
  },
  titleLight: {
    color: Colors.black
  }
});
