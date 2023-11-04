import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { CustomText } from './custom-text';
import { ColorTypes, ColorTypesHightlight, Colors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { formatPokemonId } from '@utils/format-pokemon-id';
import { RectButton } from 'react-native-gesture-handler';
import { TypeIcon } from './type-icon';
import { HOME_STACK } from '@constants/screens';
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';
import i18n from '@i18n/i18n';

type PokemonCardProps = {
  name: string;
  names: {
    en: string;
    ja: string;
    fr: string;
    it: string;
    de: string;
    es: string;
    ko: string;
  };
  id: number;
  typePrimary: string;
  typeSecondary: string;
  spriteGif: string;
  spriteOfficial: string;
  url: string;
  navigation: any;
};

export const PokemonCard = ({
  name,
  names,
  id,
  typePrimary,
  typeSecondary,
  spriteGif,
  spriteOfficial,
  navigation
}: PokemonCardProps): JSX.Element => {
  const { isDarkMode } = useContext(AppThemeContext);

  const { t } = useTranslation();

  return (
    <RectButton
      style={{
        ...styles.card,
        backgroundColor: typePrimary
          ? ColorTypes[typePrimary as keyof typeof ColorTypes]
          : isDarkMode
          ? Colors.darkGrey1
          : Colors.pureWhite
      }}
      onPress={() =>
        navigation.navigate(HOME_STACK.POKEMON_DETAIL, {
          name,
          id,
          typePrimary,
          typeSecondary,
          spriteOfficial
        })
      }
    >
      <Image
        style={[styles.logoImage, isDarkMode && styles.logoImageDark]}
        source={
          isDarkMode
            ? require('@assets/images/background__pokeball--cut-transparent.png')
            : require('@assets/images/background__pokeball--white-transparent.png')
        }
      />

      <View>
        <View style={styles.dataWrapper}>
          {/* NAME */}
          <CustomText
            style={{ ...styles.cardName, fontSize: name.length > 14 ? 13 : 18 }}
          >
            {names[i18n.language as keyof typeof names]}
          </CustomText>

          {/* TYPES */}
          <View style={styles.typesWrapper}>
            {typePrimary && (
              <View
                style={{
                  ...styles.typeElement,
                  backgroundColor:
                    ColorTypesHightlight[typePrimary as keyof typeof ColorTypesHightlight]
                }}
              >
                <TypeIcon
                  type={typePrimary}
                  size={10}
                />
                <CustomText style={styles.typeText}>
                  {t(`pokemon-types.${typePrimary}`)}
                </CustomText>
              </View>
            )}
            {typeSecondary && (
              <View
                style={{
                  ...styles.typeElement,
                  backgroundColor:
                    ColorTypesHightlight[
                      typeSecondary as keyof typeof ColorTypesHightlight
                    ]
                }}
              >
                <TypeIcon
                  type={typeSecondary}
                  size={10}
                />
                <CustomText style={styles.typeText}>
                  {t(`pokemon-types.${typeSecondary}`)}
                </CustomText>
              </View>
            )}
          </View>

          {/* ID */}
          <CustomText style={styles.pokemonId}>{formatPokemonId(id)}</CustomText>
        </View>

        {/* IMAGE */}
        <View style={styles.cardImageWrapper}>
          <Image
            resizeMode='contain'
            style={styles.cardImage}
            source={{
              uri: spriteGif ?? spriteOfficial
            }}
          />
        </View>
      </View>
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
    marginRight: '4%',
    position: 'relative'
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
  logoImage: {
    width: 140,
    height: 140,
    right: -40,
    top: 15,
    position: 'absolute',
    zIndex: 2
  },
  logoImageDark: {
    width: 100,
    height: 100,
    right: 0,
    top: 20,
    position: 'absolute',
    zIndex: 2
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
  }
});
