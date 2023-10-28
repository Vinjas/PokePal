import React, { useContext } from 'react';
import { CustomText } from '@components/custom-text';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontFamily } from '@constants/styles/fontsFamily';
import { Colors } from '@constants/styles/colors';
import { storage } from '@app-storage/app-storage';
import { AppThemeContext } from 'context/app-theme-context';
import { THEME } from '@constants/theme';
import { STORAGE } from '@constants/storage';

export const SettingsScreen = () => {
  const { isDarkMode, setIsDarkMode } = useContext(AppThemeContext);

  function onPressLightTheme() {
    setIsDarkMode(false);

    storage.set(STORAGE.THEME, THEME.LIGHT);
  }

  function onPressDarkTheme() {
    setIsDarkMode(true);

    storage.set(STORAGE.THEME, THEME.DARK);
  }

  return (
    <View style={[styles.wrapper, isDarkMode ? styles.wrapperDark : styles.wrapperLight]}>
      <CustomText style={styles.header}>Theme</CustomText>

      <View style={styles.wrapperOptions}>
        <TouchableOpacity
          style={styles.lightButton}
          onPress={onPressLightTheme}
        >
          <CustomText style={styles.lightText}>Light</CustomText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.darkButton}
          onPress={onPressDarkTheme}
        >
          <CustomText style={styles.darkText}>Dark</CustomText>
        </TouchableOpacity>
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
  header: {
    fontSize: 18,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Colors.darkGrey1,
    lineHeight: 28
  },
  wrapperOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30
  },
  lightButton: {
    backgroundColor: Colors.pureWhite,
    borderWidth: 1,
    borderColor: Colors.darkGrey1,
    borderRadius: 15,
    width: '48%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lightText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Colors.darkGrey1
  },
  darkButton: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.darkGrey1,
    borderRadius: 15,
    width: '48%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  darkText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Colors.pureWhite
  },
  headerImageWrapper: {
    position: 'absolute',
    right: -133,
    bottom: -40
  },
  headerImage: {
    width: 450,
    height: 450,
    opacity: 0.5,
    zIndex: 1
  }
});
