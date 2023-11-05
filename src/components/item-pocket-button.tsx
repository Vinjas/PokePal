import React, { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from './custom-text';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';
import BattleSvg from '@assets/svg/items/battle.svg';
import BattleSvgWhite from '@assets/svg/items/battle--white.svg';
import BerriesSvg from '@assets/svg/items/berries.svg';
import BerriesSvgWhite from '@assets/svg/items/berries--white.svg';
import KeySvg from '@assets/svg/items/key.svg';
import KeySvgWhite from '@assets/svg/items/key--white.svg';
import MedicineSvg from '@assets/svg/items/medicines.svg';
import MedicineSvgWhite from '@assets/svg/items/medicines--white.svg';
import PokeballSvg from '@assets/svg/items/pokeball.svg';
import PokeballSvgWhite from '@assets/svg/items/pokeball--white.svg';
import MachinesSvg from '@assets/svg/items/machines.svg';
import MachinesSvgWhite from '@assets/svg/items/machines--white.svg';
import MailSvg from '@assets/svg/items/mail.svg';
import MailSvgWhite from '@assets/svg/items/mail--white.svg';
import MiscSvg from '@assets/svg/items/misc.svg';
import MiscSvgWhite from '@assets/svg/items/misc--white.svg';

type ItemPocketButtonProps = {
  pocket: string;
};

export const ItemPocketButton = ({ pocket }: ItemPocketButtonProps): JSX.Element => {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  const [isPressed, setIsPressed] = useState(false);

  const getPokcetIcon = () => {
    switch (pocket) {
      case 'battle-items':
        return isPressed || isDarkMode ? (
          <BattleSvgWhite
            width={16}
            height={16}
          />
        ) : (
          <BattleSvg
            width={16}
            height={16}
          />
        );
      case 'berries':
        return isPressed || isDarkMode ? (
          <BerriesSvgWhite
            width={16}
            height={16}
          />
        ) : (
          <BerriesSvg
            width={16}
            height={16}
          />
        );
      case 'key':
        return isPressed || isDarkMode ? (
          <KeySvgWhite
            width={16}
            height={16}
          />
        ) : (
          <KeySvg
            width={16}
            height={16}
          />
        );
      case 'medicine':
        return isPressed || isDarkMode ? (
          <MedicineSvgWhite
            width={16}
            height={16}
          />
        ) : (
          <MedicineSvg
            width={16}
            height={16}
          />
        );
      case 'pokeballs':
        return isPressed || isDarkMode ? (
          <PokeballSvgWhite
            width={16}
            height={16}
          />
        ) : (
          <PokeballSvg
            width={16}
            height={16}
          />
        );
      case 'machines':
        return isPressed || isDarkMode ? (
          <MachinesSvgWhite
            width={16}
            height={16}
          />
        ) : (
          <MachinesSvg
            width={16}
            height={16}
          />
        );
      case 'key-items':
        return isPressed || isDarkMode ? (
          <KeySvgWhite
            width={16}
            height={16}
          />
        ) : (
          <KeySvg
            width={16}
            height={16}
          />
        );
      case 'mail':
        return isPressed || isDarkMode ? (
          <MailSvgWhite
            width={16}
            height={16}
          />
        ) : (
          <MailSvg
            width={16}
            height={16}
          />
        );
      case 'misc':
        return isPressed || isDarkMode ? (
          <MiscSvgWhite
            width={16}
            height={16}
          />
        ) : (
          <MiscSvg
            width={16}
            height={16}
          />
        );
      default:
        return isPressed || isDarkMode ? (
          <BattleSvgWhite
            width={16}
            height={16}
          />
        ) : (
          <BattleSvg
            width={16}
            height={16}
          />
        );
    }
  };

  function handlePress() {
    setIsPressed(!isPressed);
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        ...styles.button,
        backgroundColor: isPressed
          ? isDarkMode
            ? Colors.sortButton
            : Colors.sortButton
          : isDarkMode
          ? Colors.black
          : Colors.pureWhite
      }}
    >
      {getPokcetIcon()}
      <CustomText
        style={{
          ...styles.text,
          color: isDarkMode
            ? Colors.pureWhite
            : isPressed
            ? Colors.pureWhite
            : LogoColors.darkBlue
        }}
      >
        {t(`items.pockets.${pocket}`)}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.pureWhite,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.sortButton,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10
  },
  text: {
    color: LogoColors.darkBlue,
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 16,
    marginLeft: 8
  }
});
