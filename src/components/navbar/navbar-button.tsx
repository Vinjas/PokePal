import React from 'react';
import { NAVBAR } from '@constants/constants';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import HomeIcon from '@assets/svg/navbar/home.svg';
import CompareIcon from '@assets/svg/navbar/compare.svg';
import FavouritesIcon from '@assets/svg/navbar/favourites.svg';
import TeamsIcon from '@assets/svg/navbar/pokeball.svg';
import { View } from 'react-native';
import { Colors } from '@constants/styles';

type NavbarButtonProps = {
  focused: boolean;
  icon: string;
};

const AnimatedButton = Animated.createAnimatedComponent(View);

export function NavbarButton({ focused, icon }: NavbarButtonProps) {
  const { HOME, COMPARE, FAVOURITES, TEAMS } = NAVBAR;

  const pressed = useSharedValue(false);

  const eventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {
      pressed.value = true;
    },
    onFinish: () => {
      pressed.value = false;
    }
  });

  const uas = useAnimatedStyle(() => {
    return {
      paddingHorizontal: 24,
      paddingVertical: 6,
      backgroundColor: withSpring(
        !focused
          ? pressed.value
            ? Colors.ligthGrey1
            : Colors.pureWhite
          : Colors.ligthGrey1
      ),
      borderRadius: 15
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
    <PanGestureHandler onGestureEvent={eventHandler}>
      <AnimatedButton
        elevation={0}
        style={uas}
      >
        {icon === HOME && <HomeButton />}
        {icon === COMPARE && <CompareButton />}
        {icon === FAVOURITES && <FavouritesButton />}
        {icon === TEAMS && <TeamsButton />}
      </AnimatedButton>
    </PanGestureHandler>
  );
}
