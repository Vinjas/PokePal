import { ColorTypes, ColorTypesHightlight, Colors } from '@constants/styles/colors';
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import HeartIcon from '@assets/svg/heart--white.svg';
import BackIcon from '@assets/svg/back--white.svg';
import { formatPokemonId } from '@utils/format-pokemon-id';
import { TypeIcon } from '@components/type-icon';
import { FontFamily } from '@constants/styles/fontsFamily';
import { AppThemeContext } from 'context/app-theme-context';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { HOME_STACK } from '@constants/screens';
import i18n from '@i18n/i18n';

const HeartButton = () => (
  <HeartIcon
    width={30}
    height={30}
  />
);

const BackButton = () => (
  <BackIcon
    width={20}
    height={20}
  />
);

export const PokemonInfoHeader = ({ route, navigation }: any) => {
  const { names, id, typePrimary, typeSecondary, spriteOfficial } = route.params;

  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: ColorTypes[typePrimary as keyof typeof ColorTypes],
        paddingTop: typeSecondary ? 50 : 30
      }}
    >
      <View style={styles.headerWrapper}>
        <View style={styles.topBarWrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <BorderlessButton
              style={{ padding: 10 }}
              onPress={() => navigation.navigate(HOME_STACK.POKEDEX)}
            >
              <BackButton />
            </BorderlessButton>
            <Text style={styles.nameText}>{names?.[i18n.language]}</Text>
          </View>

          <View>
            <HeartButton />
          </View>
        </View>

        <View style={styles.contentWrapper}>
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
                  size={15}
                />
                <Text style={styles.typeText}>{t(`pokemon-types.${typePrimary}`)}</Text>
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
                  size={15}
                />
                <Text style={styles.typeText}>{t(`pokemon-types.${typeSecondary}`)}</Text>
              </View>
            )}
          </View>
          <Text style={styles.idText}>{formatPokemonId(id)}</Text>
        </View>
      </View>

      <View style={styles.cardImageWrapper}>
        <Image
          resizeMode='contain'
          style={styles.cardImage}
          source={{
            uri: spriteOfficial
          }}
        />
      </View>

      <View style={styles.logoImageWrapper}>
        <Image
          style={styles.logoImage}
          source={require('@assets/images/background__pokeball--white-transparent.png')}
        />
      </View>

      <View
        style={[styles.divider, isDarkMode ? styles.dividerDark : styles.dividerLight]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 280,
    overflow: 'hidden'
  },
  cardImageWrapper: {
    position: 'absolute',
    bottom: -1
  },
  cardImage: {
    width: 210,
    height: 210
  },
  divider: {
    width: '100%',
    height: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: -1
  },
  dividerDark: {
    backgroundColor: Colors.black
  },
  dividerLight: {
    backgroundColor: Colors.pureWhite
  },
  headerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 60,
    zIndex: 10,
    paddingHorizontal: 20
  },
  topBarWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  contentWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    fontSize: 30,
    paddingLeft: 20,
    marginTop: 8
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
    opacity: 1
  }
});
