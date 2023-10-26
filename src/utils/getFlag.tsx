import React from 'react';
import EN from '@assets/svg/flags/en.svg';
import ES from '@assets/svg/flags/es.svg';
import { View } from 'react-native';

export const getFlag = (language: string | { value: string }, size: string) => {
  switch (language) {
    case 'en':
      return (
        <View>
          <EN
            width={size}
            height={size}
          />
        </View>
      );
    case 'es':
      return (
        <ES
          width={size}
          height={size}
        />
      );
    default:
      return (
        <EN
          width={size}
          height={size}
        />
      );
  }
};
