import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const ROCK_COLUMN = [
  {
    type: 'normal',
    value: notVeryEffective
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
    value: superEffective
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
    value: notVeryEffective
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
    value: neutral
  },
  {
    type: 'fairy',
    value: neutral
  }
];
