import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { CustomText } from './custom-text';
import { ColorTypesHightlight, Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { TypeIcon } from './type-icon';
import { FilterPokemonContext } from 'context/filter-pokemon-context';
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';

type TypeButtonProps = {
  type: string;
};

export const TypeButton = ({ type }: TypeButtonProps): JSX.Element => {
  const { filters, setFilters } = useContext<any>(FilterPokemonContext);

  const { isDarkMode } = useContext(AppThemeContext);

  const { t } = useTranslation();

  const [isPressed, setIsPressed] = useState(filters.type.includes(type));

  function handleTypePress() {
    setFilters((prev: any) => {
      if (!isPressed) {
        return {
          ...prev,
          type: [...prev.type, type]
        };
      } else {
        const updatedType = prev.type.filter((item: any) => item !== type);
        return {
          ...prev,
          type: updatedType
        };
      }
    });

    setIsPressed(!isPressed);
  }

  return (
    <TouchableOpacity
      onPress={handleTypePress}
      style={{
        ...styles.button,
        backgroundColor: isPressed
          ? isDarkMode
            ? Colors.darkGrey1
            : LogoColors.lightBlue
          : isDarkMode
          ? Colors.black
          : Colors.pureWhite
      }}
    >
      <View style={{ marginRight: 5 }}>
        <TypeIcon
          type={type}
          size={12}
        />
      </View>

      <CustomText style={[styles.text, isDarkMode ? styles.textDark : styles.textLight]}>
        {t(`pokemon-types.${type}`)}
      </CustomText>
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
  },
  textDark: {
    color: Colors.pureWhite
  },
  textLight: {
    color: LogoColors.darkBlue
  }
});
