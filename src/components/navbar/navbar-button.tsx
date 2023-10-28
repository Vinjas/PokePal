import React, { useContext } from 'react';
import { NAVBAR } from '@constants/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { Colors } from '@constants/styles/colors';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import HomeIcon from '@assets/svg/navbar/home.svg';
import HomeIconGrey from '@assets/svg/navbar/home--grey.svg';
import CompareIcon from '@assets/svg/navbar/compare.svg';
import CompareIconGrey from '@assets/svg/navbar/compare--grey.svg';
import FavouritesIcon from '@assets/svg/navbar/favourites.svg';
import FavouritesIconGrey from '@assets/svg/navbar/favourites--grey.svg';
import TeamsIcon from '@assets/svg/navbar/pokeball.svg';
import TeamsIconGrey from '@assets/svg/navbar/pokeball--grey.svg';
import { AppThemeContext } from 'context/app-theme-context';

type NavbarButtonProps = {
  focused: boolean;
  icon: string;
};

const AnimatedButton = Animated.createAnimatedComponent(View);

export function NavbarButton({ focused, icon }: NavbarButtonProps) {
  const { HOME, COMPARE, FAVOURITES, TEAMS } = NAVBAR;

  const { isDarkMode } = useContext(AppThemeContext);

  const uas = useAnimatedStyle(() => {
    return {
      paddingVertical: 6,
      backgroundColor: !isDarkMode
        ? focused
          ? Colors.ligthGrey1
          : Colors.pureWhite
        : focused
        ? Colors.ligthGrey1
        : Colors.black,
      borderRadius: 15,
      paddingHorizontal: 24
    };
  });

  const HomeButton = () =>
    focused ? (
      <HomeIcon
        width={24}
        height={24}
      />
    ) : (
      <HomeIconGrey
        width={24}
        height={24}
      />
    );
  const CompareButton = () =>
    focused ? (
      <CompareIcon
        width={24}
        height={24}
      />
    ) : (
      <CompareIconGrey
        width={24}
        height={24}
      />
    );
  const FavouritesButton = () =>
    focused ? (
      <FavouritesIcon
        width={24}
        height={24}
      />
    ) : (
      <FavouritesIconGrey
        width={24}
        height={24}
      />
    );
  const TeamsButton = () =>
    focused ? (
      <TeamsIcon
        width={24}
        height={24}
      />
    ) : (
      <TeamsIconGrey
        width={24}
        height={24}
      />
    );

  return (
    <TouchableOpacity>
      <AnimatedButton style={uas}>
        {icon === HOME && <HomeButton />}
        {icon === COMPARE && <CompareButton />}
        {icon === FAVOURITES && <FavouritesButton />}
        {icon === TEAMS && <TeamsButton />}
      </AnimatedButton>
    </TouchableOpacity>
  );
}
