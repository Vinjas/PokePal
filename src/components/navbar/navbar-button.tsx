import React from 'react';
import { NAVBAR } from '@constants/constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import HomeIcon from '@assets/svg/navbar/home.svg';
import CompareIcon from '@assets/svg/navbar/compare.svg';
import FavouritesIcon from '@assets/svg/navbar/favourites.svg';
import TeamsIcon from '@assets/svg/navbar/pokeball.svg';
import { Colors } from '@constants/styles';
import { View } from 'react-native';

type NavbarButtonProps = {
  focused: boolean;
  icon: string;
};

const AnimatedButton = Animated.createAnimatedComponent(View);

export function NavbarButton({ focused, icon }: NavbarButtonProps) {
  const { HOME, COMPARE, FAVOURITES, TEAMS } = NAVBAR;

  const uas = useAnimatedStyle(() => {
    return {
      paddingVertical: 6,
      backgroundColor: focused ? Colors.ligthGrey1 : Colors.pureWhite,
      borderRadius: 15,
      paddingHorizontal: 24
    };
  });

  const HomeButton = () => (
    <HomeIcon
      width={24}
      height={24}
    />
  );
  const CompareButton = () => (
    <CompareIcon
      width={24}
      height={24}
    />
  );
  const FavouritesButton = () => (
    <FavouritesIcon
      width={24}
      height={24}
    />
  );
  const TeamsButton = () => (
    <TeamsIcon
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
