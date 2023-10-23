export function sortPokemonList(
  pokemonList: any[] | undefined,
  sortValue: { value: string }
) {
  const pokemonListFiltered = pokemonList ? [...pokemonList] : [];

  if (sortValue.value === 'first-id') {
    pokemonListFiltered.sort((a: any, b: any) => a.id - b.id);
  }

  if (sortValue.value === 'last-id') {
    pokemonListFiltered.sort((a: any, b: any) => b.id - a.id);
  }

  if (sortValue.value === 'a-z') {
    pokemonListFiltered.sort((a: any, b: any) => a.name.localeCompare(b.name));
  }

  if (sortValue.value === 'z-a') {
    pokemonListFiltered.sort((a: any, b: any) => b.name.localeCompare(a.name));
  }

  return pokemonListFiltered;
}
