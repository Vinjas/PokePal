import React from 'react';
import EN from '@assets/svg/flags/en.svg';
import ES from '@assets/svg/flags/es.svg';
import DE from '@assets/svg/flags/de.svg';
import FR from '@assets/svg/flags/fr.svg';
import IT from '@assets/svg/flags/it.svg';
import JA from '@assets/svg/flags/ja.svg';
import KO from '@assets/svg/flags/ko.svg';
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
    case 'de':
      return (
        <DE
          width={size}
          height={size}
        />
      );
    case 'fr':
      return (
        <FR
          width={size}
          height={size}
        />
      );
    case 'it':
      return (
        <IT
          width={size}
          height={size}
        />
      );
    case 'ja':
      return (
        <JA
          width={size}
          height={size}
        />
      );
    case 'ko':
      return (
        <KO
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
