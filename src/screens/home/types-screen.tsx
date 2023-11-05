import { AppThemeContext } from 'context/app-theme-context';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import BackIcon from '@assets/svg/back.svg';
import BackIconWhite from '@assets/svg/back--white.svg';
import { FontFamily } from '@constants/styles/fontsFamily';
import { Colors } from '@constants/styles/colors';

export const TypesScreen = ({ navigation }: any): JSX.Element => {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  const BackButton = () => {
    return isDarkMode ? (
      <BackIconWhite
        width={20}
        height={20}
      />
    ) : (
      <BackIcon
        width={20}
        height={20}
      />
    );
  };

  return (
    <SafeAreaView
      style={[styles.wrapper, isDarkMode ? styles.wrapperDark : styles.wrapperLight]}
    >
      <View style={styles.headerBar}>
        <BorderlessButton
          style={{ padding: 10 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </BorderlessButton>
        <Text
          style={[
            styles.headerText,
            isDarkMode ? styles.headerTextDark : styles.headerTextLight
          ]}
        >
          {t('home.types')}
        </Text>
      </View>

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    paddingTop: 10,
    height: '100%',
    overflow: 'hidden'
  },
  wrapperDark: {
    backgroundColor: Colors.black
  },
  wrapperLight: {
    backgroundColor: Colors.pureWhite
  },
  headerImageWrapper: {
    position: 'absolute',
    right: -120,
    top: -140
  },
  headerImage: {
    width: 350,
    height: 350,
    opacity: 0.5
  },
  headerText: {
    fontSize: 32,
    fontFamily: FontFamily.poppinsBold,
    color: Colors.black,
    paddingHorizontal: 10,
    lineHeight: 40
  },
  headerTextLight: {
    color: Colors.black
  },
  headerTextDark: {
    color: Colors.pureWhite
  },
  headerBar: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10
  }
});
