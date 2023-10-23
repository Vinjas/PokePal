import axios from 'axios';
import { getIdFromUrl } from './get-id-from-url';
import { isEmpty, intersectionBy } from 'lodash-es';

export async function filterPokemonList(
  pokemonList: any[],
  filter: any,
  fullPokemonList: any[]
) {
  if (!pokemonList) {
    return [];
  }

  if (filter.type.length > 2) {
    return [];
  }

  if (isEmpty(filter.type) && isEmpty(filter.generation)) {
    return fullPokemonList;
  }

  // Filter only by Type
  if (!isEmpty(filter.type) && isEmpty(filter.generation)) {
    const typePromises = filter.type.map((type: string) => {
      return axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    });

    try {
      const typeResponses = await Promise.all(typePromises);

      const pokemonLists = typeResponses.map(response =>
        response.data.pokemon.map((entry: any) => entry.pokemon)
      );

      const sharedTypePokemons = pokemonLists.reduce((accumulator, currentList) => {
        return accumulator.filter((pokemon: any) =>
          currentList.some((entry: any) => entry.name === pokemon.name)
        );
      });

      return sharedTypePokemons
        .map((pokemon: any) => {
          const pokemonId = getIdFromUrl(pokemon.url);

          return {
            ...pokemon,
            id: pokemonId
          };
        })
        .filter((pokemon: any) => pokemon.id <= 1010);
    } catch (error) {
      console.error('Error for filtering by pokemon type:', error);
      return [];
    }
  }

  // Filter only by Generation
  if (!isEmpty(filter.generation) && isEmpty(filter.type)) {
    const combinedPokemonList: any[] = [];

    const generationPromises = filter.generation.map((generation: string) => {
      return axios.get(`https://pokeapi.co/api/v2/generation/${generation}`);
    });

    try {
      const generationResponses = await Promise.all(generationPromises);

      for (const response of generationResponses) {
        const pokemonOfGeneration = response.data.pokemon_species;
        combinedPokemonList.push(...pokemonOfGeneration);

        return combinedPokemonList
          .map(pokemon => {
            const pokemonId = getIdFromUrl(pokemon.url);

            return {
              ...pokemon,
              id: pokemonId
            };
          })
          .filter(pokemon => pokemon.id <= 1010);
      }
    } catch (error) {
      console.error('Error for filtering by pokemon generation:', error);
      return [];
    }
  }

  // Filter by Type and Generation
  if (!isEmpty(filter.type) && !isEmpty(filter.generation)) {
    const combinedGenerationsList: any[] = [];

    const typePromises = filter.type.map((type: string) => {
      return axios.get(`https://pokeapi.co/api/v2/type/${type}`);
    });

    const generationPromises = filter.generation.map((generation: string) => {
      return axios.get(`https://pokeapi.co/api/v2/generation/${generation}`);
    });

    try {
      const typeResponses = await Promise.all(typePromises);
      const generationResponses = await Promise.all(generationPromises);

      const pokemonLists = typeResponses.map(response =>
        response.data.pokemon.map((entry: any) => entry.pokemon)
      );

      const sharedTypePokemons = pokemonLists.reduce((accumulator, currentList) => {
        return accumulator.filter((pokemon: any) =>
          currentList.some((entry: any) => entry.name === pokemon.name)
        );
      });

      for (const response of generationResponses) {
        const pokemonOfGeneration = response.data.pokemon_species;
        combinedGenerationsList.push(...pokemonOfGeneration);
      }

      const combinedAndUnique = intersectionBy(
        sharedTypePokemons,
        combinedGenerationsList,
        'name'
      );

      return combinedAndUnique
        .map(pokemon => {
          const pokemonId = getIdFromUrl(pokemon.url);

          return {
            ...pokemon,
            id: pokemonId
          };
        })
        .filter(pokemon => pokemon.id <= 1010);
    } catch (error) {
      console.error('Error for filtering by pokemon type and generation:', error);
      return [];
    }
  }
}
