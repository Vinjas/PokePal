import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomText } from './custom-text';
import { ColorTypesHightlight, Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { t } from 'i18next';
import { TypeIcon } from './type-icon';

type TypeButtonProps = {
  type: string;
};

export const TypeButton = ({ type }: TypeButtonProps): JSX.Element => {
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
      <View style={{ marginRight: 5 }}>
        <TypeIcon
          type={type}
          size={12}
        />
      </View>

      <CustomText style={styles.text}>{t(`pokemon-types.${type}`)}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Colors.pureWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: LogoColors.blue,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5
  },
  text: {
    color: LogoColors.darkBlue,
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 11,
    marginTop: 2
  }
});
