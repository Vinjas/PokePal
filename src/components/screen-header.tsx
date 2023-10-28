import { Colors } from '@constants/styles/colors';
import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackIcon from '@assets/svg/back.svg';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { AppThemeContext } from 'context/app-theme-context';

const BackButton = () => (
  <BackIcon
    width={25}
    height={25}
  />
);

type ScreenHeaderProps = {
  title: string;
};

export const ScreenHeader = ({ title }: ScreenHeaderProps): JSX.Element => {
  const { isDarkMode } = useContext(AppThemeContext);

  return (
    <View style={[styles.header, isDarkMode ? styles.headerDark : styles.headerLight]}>
      <Text
        style={[
          styles.headerText,
          isDarkMode ? styles.headerTextDark : styles.headerTextLight
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    //height: 40,
    backgroundColor: Colors.pureWhite,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerDark: {
    backgroundColor: Colors.black
  },
  headerLight: {
    backgroundColor: Colors.pureWhite
  },
  headerText: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'Poppins-Bold',
    color: Colors.black
  },
  headerTextDark: {
    color: Colors.pureWhite
  },
  headerTextLight: {
    color: Colors.black
  },
  headerImageWrapper: {
    position: 'absolute',
    right: -120,
    top: -140
  },
  headerImage: {
    width: 350,
    height: 350,
    opacity: 0.5,
    zIndex: 1
  }
});
