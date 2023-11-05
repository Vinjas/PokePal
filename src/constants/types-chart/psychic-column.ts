import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const PSYCHIC_COLUMN = [
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
    value: neutral
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
    value: notVeryEffective
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
