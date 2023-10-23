import React, { ReactNode, createContext, useState } from 'react';

export const PokemonResultsContext = createContext<any>([]);

export const PokemonResultsProvider = ({ children }: { children: ReactNode }) => {
  const [pokemonResults, setPokemonResults] = useState([]);
  const [fullPokemonList, setFullPokemonList] = useState([]);

  return (
    <PokemonResultsContext.Provider
      value={{
        pokemonResults,
        setPokemonResults,
        fullPokemonList,
        setFullPokemonList
      }}
    >
      {children}
    </PokemonResultsContext.Provider>
  );
};
