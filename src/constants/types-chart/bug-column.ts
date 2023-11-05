import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const BUG_COLUMN = [
  {
    type: 'normal',
    value: neutral
  },
  {
    type: 'fire',
    value: superEffective
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
    value: notVeryEffective
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
    value: neutral
  },
  {
    type: 'ground',
    value: notVeryEffective
  },
  {
    type: 'flying',
    value: superEffective
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
