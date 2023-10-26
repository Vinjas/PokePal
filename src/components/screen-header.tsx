import { Colors } from '@constants/styles/colors';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BackIcon from '@assets/svg/back.svg';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

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
  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
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
  headerText: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: 'Poppins-Bold',
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
    opacity: 0.3,
    zIndex: 1
  }
});
