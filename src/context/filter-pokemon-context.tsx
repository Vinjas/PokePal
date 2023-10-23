import React, { ReactNode, createContext, useState } from 'react';

export const FilterPokemonContext = createContext<any>({});

export const FilterPokemonProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState({});

  return (
    <FilterPokemonContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterPokemonContext.Provider>
  );
};
