import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomText } from './custom-text';
import { Colors } from '@constants/styles';

type ScreenHeaderProps = {
  title: string;
};

export const ScreenHeader = ({ title }: ScreenHeaderProps): JSX.Element => {
  const styles = StyleSheet.create({
    header: {
      height: 70,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 0
    },
    headerText: {
      fontSize: 32,
      fontFamily: 'Poppins-Bold',
      color: Colors.black
    }
  });

  return (
    <View style={styles.header}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};
