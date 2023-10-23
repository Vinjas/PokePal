import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from './custom-text';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { t } from 'i18next';

type GenerationButtonProps = {
  generation: string;
};

export const GenerationButton = ({ generation }: GenerationButtonProps): JSX.Element => {
  const [isPressed, setIsPressed] = useState(false);

  function handlePress() {
    setIsPressed(!isPressed);
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        ...styles.button,
        backgroundColor: isPressed ? LogoColors.lightBlue : Colors.pureWhite
      }}
    >
      <CustomText style={styles.text}>{t(`generations.${generation}`)}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.pureWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: LogoColors.blue,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginVertical: 5,
    justifyContent: 'center'
  },
  text: {
    color: LogoColors.darkBlue,
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 11
  }
});
