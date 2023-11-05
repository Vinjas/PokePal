import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const GHOST_COLUMN = [
  {
    type: 'normal',
    value: notEffective
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
    value: notEffective
  },
  {
    type: 'poison',
    value: notVeryEffective
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
    value: superEffective
  },
  {
    type: 'dragon',
    value: neutral
  },
  {
    type: 'dark',
    value: superEffective
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
