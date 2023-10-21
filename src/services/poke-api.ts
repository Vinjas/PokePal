import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const axios = setupCache(Axios);

const API_URL = 'https://pokeapi.co/api/v2/';

export const getPokemon = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPokemonList = async (limit: number, offset: number) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon`, {
      params: {
        limit,
        offset
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
