import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const FIRE_COLUMN = [
  {
    type: 'normal',
    value: neutral
  },
  {
    type: 'fire',
    value: notVeryEffective
  },
  {
    type: 'water',
    value: superEffective
  },
  {
    type: 'electric',
    value: neutral
  },
  {
    type: 'grass',
    value: notVeryEffective
  },
  {
    type: 'ice',
    value: notVeryEffective
  },
  {
    type: 'fighting',
    value: neutral
  },
  {
    type: 'poison',
    value: neutral
  },
  {
    type: 'ground',
    value: superEffective
  },
  {
    type: 'flying',
    value: neutral
  },
  {
    type: 'psychic',
    value: neutral
  },
  {
    type: 'bug',
    value: notVeryEffective
  },
  {
    type: 'rock',
    value: superEffective
  },
  {
    type: 'ghost',
    value: neutral
  },
  {
    type: 'dragon',
    value: neutral
  },
  {
    type: 'dark',
    value: neutral
  },
  {
    type: 'steel',
    value: notVeryEffective
  },
  {
    type: 'fairy',
    value: notVeryEffective
  }
];
