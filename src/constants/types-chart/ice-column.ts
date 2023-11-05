import { TYPES_EFFECTS } from './types-effects';

const { superEffective, notVeryEffective, neutral } = TYPES_EFFECTS;

export const ICE_COLUMN = [
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
    value: neutral
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
    value: superEffective
  },
  {
    type: 'fairy',
    value: neutral
  }
];
