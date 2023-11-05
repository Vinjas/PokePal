import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const POISON_COLUMN = [
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
    value: notVeryEffective
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
    value: superEffective
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
    value: notVeryEffective
  }
];
