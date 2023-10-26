import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { CustomText } from './custom-text';
import { RQ_KEY } from '@constants/react-query';
import { useQuery } from '@tanstack/react-query';
import { getPokemon } from '@services/poke-api';
import {
  ColorTypes,
  ColorTypesHightlight,
  Colors,
  LogoColors
} from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { formatPokemonId } from '@utils/format-pokemon-id';
import { formatPokemonName } from '@utils/format-pokemon-name';
import { RectButton } from 'react-native-gesture-handler';
import { TypeIcon } from './type-icon';
import { HOME_STACK } from '@constants/screens';
import { useTranslation } from 'react-i18next';

type PokemonCardProps = {
  name: string;
  url: string;
  navigation: any;
};

type TypeResource = {
  type: {
    name: string;
    url: string;
  };
};

export const PokemonCard = ({ name, navigation }: PokemonCardProps): JSX.Element => {
  const {
    data: pokemonData,
    isLoading,
    isError
  } = useQuery({
    queryKey: [RQ_KEY.POKEMON_DATA, name],
    queryFn: () => getPokemon(name)
  });

  const { t } = useTranslation();

  function getImageUri(pokemon: any) {
    const staticImage = pokemon.sprites.other['official-artwork'].front_default;

    const gifImage =
      pokemon.sprites.versions['generation-v']['black-white'].animated.front_default;

    return gifImage ?? staticImage;
  }

  return (
    <RectButton
      style={{
        ...styles.card,
        backgroundColor: pokemonData
          ? ColorTypes[pokemonData.types[0]?.type.name]
          : Colors.pureWhite
      }}
      onPress={() => navigation.navigate(HOME_STACK.POKEMON_DETAIL, { pokemonData })}
    >
      <View style={styles.logoImageWrapper}>
        <Image
          style={styles.logoImage}
          source={require('@assets/images/background__pokeball.png')}
        />
      </View>

      {isLoading && (
        <ActivityIndicator
          size={50}
          color={LogoColors.blue}
          style={styles.loader}
        />
      )}

      {isError && <Text>Error</Text>}

      {!isLoading && !isError && pokemonData && (
        <View>
          <View style={styles.dataWrapper}>
            {/* NAME */}
            <CustomText
              style={{ ...styles.cardName, fontSize: name.length > 14 ? 13 : 18 }}
            >
              {formatPokemonName(name)}
            </CustomText>

            {/* TYPES */}
            <View style={styles.typesWrapper}>
              {pokemonData.types.map((typeResource: TypeResource) => (
                <View
                  key={typeResource.type.name}
                  style={{
                    ...styles.typeElement,
                    backgroundColor: ColorTypesHightlight[typeResource.type.name]
                  }}
                >
                  <TypeIcon
                    type={typeResource.type.name}
                    size={10}
                  />
                  <CustomText style={styles.typeText}>
                    {t(`pokemon-types.${typeResource.type.name}`)}
                  </CustomText>
                </View>
              ))}
            </View>

            {/* ID */}
            <CustomText style={styles.pokemonId}>
              {formatPokemonId(pokemonData.id)}
            </CustomText>
          </View>

          {/* IMAGE */}
          <View style={styles.cardImageWrapper}>
            <Image
              disableCache={true}
              resizeMode='contain'
              style={styles.cardImage}
              source={{
                uri: getImageUri(pokemonData)
              }}
            />
          </View>
        </View>
      )}
    </RectButton>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: Colors.ligthGrey1,
    borderRadius: 15,
    elevation: 3,
    width: '48%',
    height: 120,
    overflow: 'hidden',
    marginBottom: 10,
    marginRight: '4%'
  },
  cardImageWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  cardImage: {
    width: 80,
    height: 80
  },
  logoImageWrapper: {
    position: 'absolute',
    right: -40,
    top: 15,
    zIndex: -2
  },
  logoImage: {
    width: 140,
    height: 140,
    opacity: 0.15
  },
  cardName: {
    color: Colors.pureWhite,
    fontFamily: FontFamily.poppinsBold
  },
  pokemonId: {
    color: Colors.pureWhite,
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 12,
    paddingTop: 5
  },
  dataWrapper: {
    justifyContent: 'space-between',
    height: '100%'
  },
  typesWrapper: {
    justifyContent: 'space-between',
    gap: 5
  },
  typeElement: {
    borderRadius: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '47%',
    elevation: 1,
    flexDirection: 'row'
  },
  typeText: {
    color: Colors.pureWhite,
    fontSize: 11,
    fontFamily: FontFamily.poppinsMedium,
    lineHeight: 18
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});
