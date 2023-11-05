import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const ELECTRIC_COLUMN = [
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
    value: notVeryEffective
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
    value: notVeryEffective
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
