import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const DARK_COLUMN = [
  {
    type: 'normal',
    value: neutral
  },
  {
    type: 'fire',
    value: neutral
  },
  {
    type: 'water',
    value: neutral
  },
  {
    type: 'electric',
    value: neutral
  },
  {
    type: 'grass',
    value: neutral
  },
  {
    type: 'ice',
    value: neutral
  },
  {
    type: 'fighting',
    value: superEffective
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
    value: notEffective
  },
  {
    type: 'bug',
    value: superEffective
  },
  {
    type: 'rock',
    value: neutral
  },
  {
    type: 'ghost',
    value: notVeryEffective
  },
  {
    type: 'dragon',
    value: neutral
  },
  {
    type: 'dark',
    value: notVeryEffective
  },
  {
    type: 'steel',
    value: neutral
  },
  {
    type: 'fairy',
    value: superEffective
  }
];
