import { SORT_OPTIONS } from '@constants/sort-options';
import React, { ReactNode, createContext, useState } from 'react';

export const FilterPokemonContext = createContext<any>({});

export const FilterPokemonProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState({});
  const [sortValue, setSortValue] = useState(SORT_OPTIONS[0].value);

  return (
    <FilterPokemonContext.Provider
      value={{
        filters,
        setFilters,
        sortValue,
        setSortValue
      }}
    >
      {children}
    </FilterPokemonContext.Provider>
  );
};
