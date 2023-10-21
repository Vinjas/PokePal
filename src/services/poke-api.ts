import Axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const axios = setupCache(Axios);

const API_URL = 'https://pokeapi.co/api/v2/';

type TypeResource = {
  type: {
    name: string;
    url: string;
  };
};

type PokemonData = {
  types: { type: TypeResource }[];
  // otras propiedades de pokemonData
};

export const getPokemon = async (name: string) => {
  try {
    const response = await axios.get(`${API_URL}/pokemon/${name}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

type PokemonListParams = {
  limit: number;
  offset: number;
};

export const getPokemonList = async (params: PokemonListParams) => {
  const { limit, offset } = params;

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
