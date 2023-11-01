import axios from 'axios';
import { isEmpty, intersectionBy, filter as _filter } from 'lodash-es';
import pokemonListStatic from '../data/pokemon-list.json';

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

      const dataResult = _filter(pokemonListStatic, (item: any) => {
        return sharedTypePokemons.some(
          (pokemonName: { name: string }) => pokemonName.name === item.name
        );
      });

      return dataResult;
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

        console.log('combinedPokemonList', combinedPokemonList);

        const dataResult: any[] = _filter(pokemonListStatic, item => {
          return combinedPokemonList.some(pokemonName => pokemonName.name === item.name);
        });

        return dataResult;
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

      const dataResult = _filter(pokemonListStatic, item => {
        return combinedAndUnique.some(pokemonName => pokemonName.name === item.name);
      });

      return dataResult;
    } catch (error) {
      console.error('Error for filtering by pokemon type and generation:', error);
      return [];
    }
  }
}
