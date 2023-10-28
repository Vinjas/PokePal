import { CustomText } from '@components/custom-text';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import SettingsIcon from '@assets/svg/settings.svg';
import SettingsIconWhite from '@assets/svg/settings--white.svg';
import { HOME_STACK } from '@constants/screens';
import { LanguageSettings } from '@components/language-settings';
import { useTranslation } from 'react-i18next';
import { storage } from '@app-storage/app-storage';
import { AppThemeContext } from 'context/app-theme-context';

export const HomeScreen = ({ navigation }: any): JSX.Element => {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  const SettingsButton = () => {
    return isDarkMode ? (
      <SettingsIconWhite
        width={45}
        height={45}
      />
    ) : (
      <SettingsIcon
        width={45}
        height={45}
      />
    );
  };

  return (
    <View style={[styles.wrapper, isDarkMode ? styles.wrapperDark : styles.wrapperLight]}>
      <View style={styles.topBar}>
        <View
          style={{
            height: 45,
            width: 45
          }}
        >
          <LanguageSettings />
        </View>

        <BorderlessButton onPress={() => navigation.navigate(HOME_STACK.SETTINGS)}>
          <SettingsButton />
        </BorderlessButton>
      </View>

      <View style={styles.titleWrapper}>
        <CustomText
          style={[
            styles.homeTitleText,
            isDarkMode ? styles.homeTitleTextDark : styles.homeTitleTextLight
          ]}
        >
          {t('home.mainTitle')}
        </CustomText>
        <CustomText
          style={[
            styles.homeSubtitleText,
            isDarkMode ? styles.homeSubtitleTextDark : styles.homeSubtitleTextLight
          ]}
        >
          {t('home.subTitle')}
        </CustomText>
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
          source={
            isDarkMode
              ? require('@assets/images/background__pokeball--white-transparent.png')
              : require('@assets/images/background__pokeball--transparent.png')
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20
  },
  wrapperLight: {
    backgroundColor: Colors.pureWhite
  },
  wrapperDark: {
    backgroundColor: Colors.black
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
    fontFamily: FontFamily.poppinsBold
  },
  homeTitleTextLight: {
    color: Colors.black
  },
  homeTitleTextDark: {
    color: Colors.pureWhite
  },
  homeSubtitleText: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: FontFamily.poppinsRegular,
    color: Colors.black
  },
  homeSubtitleTextLight: {
    color: Colors.darkGrey1
  },
  homeSubtitleTextDark: {
    color: Colors.darkGrey1
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
    opacity: 0.5,
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
