import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';
import pokemonList from '../data/pokemon-list.json';
import movesList from '../data/moves-list.json';

const axios = setupCache(Axios);

const API_URL = 'https://pokeapi.co/api/v2';

type ListParams = {
  limit: number;
  offset: number;
};

export const getPokemon = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon/${name}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemonSpecies = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon-species/${name}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemonList = async () => {
  return pokemonList;
};

export const getEvolutionChain = async (url: string) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAbility = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/ability/${name}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMove = async (url: string) => {
  try {
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllMoves = async () => {
  return movesList;
};
