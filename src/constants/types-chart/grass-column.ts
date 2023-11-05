import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const GRASS_COLUMN = [
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
    value: notVeryEffective
  },
  {
    type: 'electric',
    value: notVeryEffective
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
    value: neutral
  },
  {
    type: 'poison',
    value: superEffective
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
    value: superEffective
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
    value: neutral
  },
  {
    type: 'fairy',
    value: neutral
  }
];
