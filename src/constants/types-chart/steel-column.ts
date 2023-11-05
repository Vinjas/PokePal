import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const STEEL_COLUMN = [
  {
    type: 'normal',
    value: notVeryEffective
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
    value: notVeryEffective
  },
  {
    type: 'fighting',
    value: superEffective
  },
  {
    type: 'poison',
    value: notEffective
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
    value: notVeryEffective
  },
  {
    type: 'bug',
    value: notVeryEffective
  },
  {
    type: 'rock',
    value: notVeryEffective
  },
  {
    type: 'ghost',
    value: neutral
  },
  {
    type: 'dragon',
    value: notVeryEffective
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
    value: notVeryEffective
  }
];
