import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const WATER_COLUMN = [
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
    value: notVeryEffective
  },
  {
    type: 'electric',
    value: superEffective
  },
  {
    type: 'grass',
    value: superEffective
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
    value: neutral
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
    value: neutral
  },
  {
    type: 'rock',
    value: neutral
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
    value: neutral
  }
];
