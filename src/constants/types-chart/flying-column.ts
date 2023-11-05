import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const FLYING_COLUMN = [
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
    value: superEffective
  },
  {
    type: 'grass',
    value: notVeryEffective
  },
  {
    type: 'ice',
    value: superEffective
  },
  {
    type: 'fighting',
    value: notVeryEffective
  },
  {
    type: 'poison',
    value: neutral
  },
  {
    type: 'ground',
    value: notEffective
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
    value: neutral
  },
  {
    type: 'fairy',
    value: neutral
  }
];
