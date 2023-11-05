import { AppThemeContext } from 'context/app-theme-context';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { FontFamily } from '@constants/styles/fontsFamily';
import { Colors } from '@constants/styles/colors';

export const CompareScreen = (): JSX.Element => {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  return (
    <SafeAreaView
      style={[styles.wrapper, isDarkMode ? styles.wrapperDark : styles.wrapperLight]}
    >
      <View style={styles.headerBar}>
        <Text
          style={[
            styles.headerText,
            isDarkMode ? styles.headerTextDark : styles.headerTextLight
          ]}
        >
          {t('navbar.compare')}
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
    right: -183,
    top: -183
  },
  headerImage: {
    width: 450,
    height: 450,
    opacity: 0.5,
    zIndex: 1
  },
  headerText: {
    fontSize: 32,
    fontFamily: FontFamily.poppinsBold,
    color: Colors.black,
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
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10
  }
});
