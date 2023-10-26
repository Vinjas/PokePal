import { CustomText } from '@components/custom-text';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import SettingsIcon from '@assets/svg/settings.svg';
import { HOME_STACK } from '@constants/screens';
import { LanguageSettings } from '@components/language-settings';
import { useTranslation } from 'react-i18next';

const SettingsButton = () => (
  <SettingsIcon
    width={45}
    height={45}
  />
);

export const HomeScreen = ({ navigation }: any): JSX.Element => {
  const { t } = useTranslation();

  return (
    <View style={styles.wrapper}>
      <View style={styles.topBar}>
        <LanguageSettings />

        <BorderlessButton onPress={() => navigation.navigate(HOME_STACK.SETTINGS)}>
          <SettingsButton />
        </BorderlessButton>
      </View>

      <View style={styles.titleWrapper}>
        <CustomText style={styles.homeTitleText}>{t('home.mainTitle')}</CustomText>
        <CustomText style={styles.homeSubitleText}>{t('home.subTitle')}</CustomText>
      </View>

      <RectButton
        onPress={() => navigation.navigate(HOME_STACK.POKEDEX)}
        style={styles.pokemonButton}
      >
        <CustomText style={styles.titleText}>Pokémon</CustomText>
        <View style={styles.buttonImageWrapper}>
          <Image
            style={styles.buttonImage}
            source={require('@assets/images/background__pokeball--transparent.png')}
          />
        </View>
      </RectButton>

      <View style={styles.headerImageWrapper}>
        <Image
          style={styles.headerImage}
          source={require('@assets/images/background__pokeball--transparent.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.pureWhite,
    padding: 20
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2
  },
  titleWrapper: {
    paddingTop: 50,
    paddingBottom: 80
  },
  homeTitleText: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: FontFamily.poppinsBold,
    color: Colors.black
  },
  homeSubitleText: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: FontFamily.poppinsRegular,
    color: Colors.black
  },
  pokemonButton: {
    backgroundColor: LogoColors.red,
    width: '100%',
    paddingTop: 80,
    elevation: 3,
    borderRadius: 15,
    overflow: 'hidden',
    zIndex: 2
  },
  titleText: {
    fontSize: 28,
    lineHeight: 40,
    fontFamily: FontFamily.poppinsBold,
    color: Colors.pureWhite,
    marginLeft: 20,
    marginBottom: 20
  },
  headerImageWrapper: {
    position: 'absolute',
    right: -183,
    top: -183
  },
  headerImage: {
    width: 450,
    height: 450,
    opacity: 0.3,
    zIndex: 1
  },
  buttonImageWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  buttonImage: {
    width: 130,
    height: 130
  }
});
