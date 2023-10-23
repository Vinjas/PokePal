import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from './custom-text';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { t } from 'i18next';
import { FilterPokemonContext } from 'context/filter-pokemon-context';

type GenerationButtonProps = {
  generation: string;
};

export const GenerationButton = ({ generation }: GenerationButtonProps): JSX.Element => {
  const { filters, setFilters } = useContext<any>(FilterPokemonContext);

  const [isPressed, setIsPressed] = useState(filters.generation.includes(generation));

  function handlePress() {
    setFilters((prev: any) => {
      if (!isPressed) {
        return {
          ...prev,
          generation: [...prev.generation, generation]
        };
      } else {
        const updatedGeneration = prev.generation.filter(
          (item: any) => item !== generation
        );
        return {
          ...prev,
          generation: updatedGeneration
        };
      }
    });

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
