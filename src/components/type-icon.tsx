import React from 'react';
import BugIcon from '@assets/svg/pokemon-types/bug.svg';
import DarkIcon from '@assets/svg/pokemon-types/dark.svg';
import DragonIcon from '@assets/svg/pokemon-types/dragon.svg';
import ElectricIcon from '@assets/svg/pokemon-types/electric.svg';
import FairyIcon from '@assets/svg/pokemon-types/fairy.svg';
import FightingIcon from '@assets/svg/pokemon-types/fighting.svg';
import FireIcon from '@assets/svg/pokemon-types/fire.svg';
import FlyingIcon from '@assets/svg/pokemon-types/flying.svg';
import GhostIcon from '@assets/svg/pokemon-types/ghost.svg';
import GrassIcon from '@assets/svg/pokemon-types/grass.svg';
import GroundIcon from '@assets/svg/pokemon-types/ground.svg';
import IceIcon from '@assets/svg/pokemon-types/ice.svg';
import NormalIcon from '@assets/svg/pokemon-types/normal.svg';
import PoisonIcon from '@assets/svg/pokemon-types/poison.svg';
import PsychicIcon from '@assets/svg/pokemon-types/psychic.svg';
import RockIcon from '@assets/svg/pokemon-types/rock.svg';
import SteelIcon from '@assets/svg/pokemon-types/steel.svg';
import WaterIcon from '@assets/svg/pokemon-types/water.svg';
import { StyleSheet, View } from 'react-native';
import { ColorTypesHightlight } from '@constants/styles/colors';

type TypeIconProps = {
  type: string;
  size: number;
};

export const TypeIcon = ({ type, size }: TypeIconProps): JSX.Element => {
  function renderTypeButton(typeName: string) {
    switch (typeName) {
      case 'bug':
        return (
          <BugIcon
            width={size}
            height={size}
          />
        );
      case 'dark':
        return (
          <DarkIcon
            width={size}
            height={size}
          />
        );
      case 'dragon':
        return (
          <DragonIcon
            width={size}
            height={size}
          />
        );
      case 'electric':
        return (
          <ElectricIcon
            width={size}
            height={size}
          />
        );
      case 'fairy':
        return (
          <FairyIcon
            width={size}
            height={size}
          />
        );
      case 'fighting':
        return (
          <FightingIcon
            width={size}
            height={size}
          />
        );
      case 'fire':
        return (
          <FireIcon
            width={size}
            height={size}
          />
        );
      case 'flying':
        return (
          <FlyingIcon
            width={size}
            height={size}
          />
        );
      case 'ghost':
        return (
          <GhostIcon
            width={size}
            height={size}
          />
        );
      case 'grass':
        return (
          <GrassIcon
            width={size}
            height={size}
          />
        );
      case 'ground':
        return (
          <GroundIcon
            width={size}
            height={size}
          />
        );
      case 'ice':
        return (
          <IceIcon
            width={size}
            height={size}
          />
        );
      case 'normal':
        return (
          <NormalIcon
            width={size}
            height={size}
          />
        );
      case 'poison':
        return (
          <PoisonIcon
            width={size}
            height={size}
          />
        );
      case 'psychic':
        return (
          <PsychicIcon
            width={size}
            height={size}
          />
        );
      case 'rock':
        return (
          <RockIcon
            width={size}
            height={size}
          />
        );
      case 'steel':
        return (
          <SteelIcon
            width={size}
            height={size}
          />
        );
      case 'water':
        return (
          <WaterIcon
            width={size}
            height={size}
          />
        );
      default:
        return (
          <BugIcon
            width={size}
            height={size}
          />
        );
    }
  }

  return (
    <View style={{ ...styles.typeIcon, backgroundColor: ColorTypesHightlight[type] }}>
      {renderTypeButton(type)}
    </View>
  );
};

const styles = StyleSheet.create({
  typeIcon: {
    padding: 5,
    borderRadius: 50
  }
});
