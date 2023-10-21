import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomText } from './custom-text';
import { RQ_KEY } from '@constants/react-query';
import { useQuery } from '@tanstack/react-query';
import { getPokemon } from '@services/poke-api';
import { ColorTypes, ColorTypesHightlight, Colors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { formatPokemonId } from '@utils/formatPokemonId';

type PokemonCardProps = {
  name: string;
  url: string;
};

type TypeResource = {
  type: {
    name: string;
    url: string;
  };
};

export const PokemonCard = ({ name }: PokemonCardProps): JSX.Element => {
  const {
    data: pokemonData,
    isLoading,
    isError
  } = useQuery({
    queryKey: [RQ_KEY.POKEMON_DATA, name],
    queryFn: () => getPokemon(name)
  });

  return (
    <TouchableOpacity
      style={{
        ...styles.card,
        backgroundColor: pokemonData
          ? ColorTypes[pokemonData.types[0]?.type.name]
          : Colors.ligthGrey1
      }}
    >
      {isLoading && <Text>Loading...</Text>}

      {isError && <Text>Error</Text>}

      {!isLoading && !isError && pokemonData && (
        <View>
          <View style={styles.dataWrapper}>
            <CustomText style={styles.cardName}>
              {name[0].toUpperCase() + name.slice(1)}
            </CustomText>

            <View style={styles.typesWrapper}>
              {pokemonData.types.map((typeResource: TypeResource) => (
                <View
                  key={typeResource.type.name}
                  style={{
                    ...styles.typeElement,
                    backgroundColor: ColorTypesHightlight[typeResource.type.name]
                  }}
                >
                  <CustomText style={styles.typeText}>
                    {typeResource.type.name[0].toUpperCase() +
                      typeResource.type.name.slice(1)}
                  </CustomText>
                </View>
              ))}
            </View>

            <CustomText style={styles.pokemonId}>
              {formatPokemonId(pokemonData.id)}
            </CustomText>
          </View>

          <View style={styles.cardImageWrapper}>
            <Image
              style={styles.cardImage}
              source={{
                uri: pokemonData.sprites.other['official-artwork'].front_default
              }}
            />
          </View>

          <View style={styles.logoImageWrapper}>
            <Image
              style={styles.logoImage}
              source={require('@assets/images/background__pokeball.png')}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: Colors.ligthGrey1,
    borderRadius: 15,
    elevation: 3,
    width: '48.5%',
    height: 120,
    overflow: 'hidden'
  },
  cardImageWrapper: {
    position: 'absolute',
    right: -5,
    top: 20,
    zIndex: -1
  },
  cardImage: {
    width: 80,
    height: 80
  },
  logoImageWrapper: {
    position: 'absolute',
    right: -40,
    top: 5,
    zIndex: -2
  },
  logoImage: {
    width: 140,
    height: 140,
    opacity: 0.15
  },
  cardName: {
    color: Colors.pureWhite,
    fontFamily: FontFamily.poppinsBold,
    fontSize: 18
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
    elevation: 2
  },
  typeText: {
    color: Colors.pureWhite,
    fontSize: 12,
    fontFamily: FontFamily.poppinsMedium
  }
});
