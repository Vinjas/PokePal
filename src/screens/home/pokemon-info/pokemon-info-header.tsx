import { ColorTypes, ColorTypesHightlight, Colors } from '@constants/styles/colors';
import { formatPokemonName } from '@utils/format-pokemon-name';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeartIcon from '@assets/svg/heart--white.svg';
import BackIcon from '@assets/svg/back--white.svg';
import { formatPokemonId } from '@utils/format-pokemon-id';
import { TypeIcon } from '@components/type-icon';
import { FontFamily } from '@constants/styles/fontsFamily';

const HeartButton = () => (
  <HeartIcon
    width={30}
    height={30}
  />
);

const BackButton = () => (
  <BackIcon
    width={25}
    height={25}
  />
);

export const PokemonInfoHeader = ({ route, navigation }: any) => {
  const { pokemonData } = route.params;

  const { name, id, types } = pokemonData;

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: ColorTypes[types[0]?.type.name],
        paddingTop: types.length > 1 ? 50 : 30
      }}
    >
      <View style={styles.headerWrapper}>
        <View style={styles.topBarWrapper}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackButton />
          </TouchableOpacity>
          <View>
            <HeartButton />
          </View>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.nameWrapper}>
            <Text style={styles.nameText}>{formatPokemonName(name)}</Text>
            <Text style={styles.idText}>{formatPokemonId(id)}</Text>
          </View>
          <View style={styles.typesWrapper}>
            {types.map((type: any) => (
              <View
                key={type.type.name}
                style={{
                  ...styles.typeElement,
                  backgroundColor: ColorTypesHightlight[type.type.name]
                }}
              >
                <TypeIcon
                  type={type.type.name}
                  size={15}
                />
                <Text style={styles.typeText}>{formatPokemonName(type.type.name)}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.cardImageWrapper}>
        <Image
          resizeMode='contain'
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

      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 300,
    overflow: 'hidden'
  },
  cardImageWrapper: {
    position: 'absolute',
    bottom: -1
  },
  cardImage: {
    width: 220,
    height: 220
  },
  divider: {
    width: '100%',
    height: 30,
    backgroundColor: Colors.pureWhite,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: -1
  },
  headerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 100,
    zIndex: 10,
    paddingHorizontal: 20
  },
  topBarWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  contentWrapper: {
    width: '100%'
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  typesWrapper: {
    width: '28%'
  },
  typeElement: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    borderRadius: 30,
    paddingRight: 10,
    paddingLeft: 5,
    paddingVertical: 3,
    marginBottom: 10
  },
  typeText: {
    color: Colors.pureWhite,
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 12,
    paddingLeft: 5
  },
  nameText: {
    color: Colors.pureWhite,
    fontFamily: FontFamily.poppinsBold,
    fontSize: 30
  },
  idText: {
    color: Colors.pureWhite,
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 18,
    paddingTop: 5
  },
  logoImageWrapper: {
    position: 'absolute',
    right: -100,
    bottom: -170,
    zIndex: -2
  },
  logoImage: {
    width: 450,
    height: 450,
    opacity: 0.15
  }
});
