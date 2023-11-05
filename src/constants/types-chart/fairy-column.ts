import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const FAIRY_COLUMN = [
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
    value: notVeryEffective
  },
  {
    type: 'poison',
    value: superEffective
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
    value: notVeryEffective
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
    value: notEffective
  },
  {
    type: 'dark',
    value: notVeryEffective
  },
  {
    type: 'steel',
    value: superEffective
  },
  {
    type: 'fairy',
    value: neutral
  }
];
