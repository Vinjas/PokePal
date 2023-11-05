import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const FIGHTING_COLUMN = [
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
    value: neutral
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
    value: superEffective
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
    value: notVeryEffective
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
