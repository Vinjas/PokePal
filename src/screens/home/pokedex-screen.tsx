import { PokemonCard } from '@components/pokemon-card';
import { SearchBar } from '@components/search-bar';
import { RQ_KEY } from '@constants/react-query';
import { LogoColors } from '@constants/styles/colors';
import { HeaderText } from '@constants/styles/screen-header';
import { getPokemonList } from '@services/poke-api';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FilterMenu } from '@components/filter-menu/filter-menu';
import { FilterPokemonContext } from 'context/filter-pokemon-context';
import { getIdFromUrl } from '@utils/get-id-from-url';
import { PokemonResultsContext } from 'context/pokemon-results-context';

type PokemonResource = {
  name: string;
  url: string;
};

export const PokedexScreen = (): JSX.Element => {
  const [allPokemonList, setAllPokemonList] = useState<PokemonResource[]>([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterMenuRefState, setFilterMenuRefState] = useState(null);

  const { pokemonResults, setPokemonResults } = useContext<any>(PokemonResultsContext);
  const { sortValue } = useContext<any>(FilterPokemonContext);

  const { isLoading, isError } = useQuery({
    queryKey: [RQ_KEY.ALL_POKEMON_LISTS],
    queryFn: () => getPokemonList({ limit: 1010, offset: 0 }),
    select: data => {
      return {
        ...data,
        results: data.results.map((pokemon: PokemonResource) => {
          const pokemonId = getIdFromUrl(pokemon.url);

          return {
            ...pokemon,
            id: pokemonId
          };
        })
      };
    },
    onSuccess: data => {
      setAllPokemonList(data.results);
      setPokemonResults(data.results);
      setFilteredData(data.results);
    }
  });

  /*   const pokemonResultsWithId = useMemo(() => {
    return pokemonResults.map((pokemon: PokemonResource) => {
      const pokemonId = getIdFromUrl(pokemon.url);

      return {
        ...pokemon,
        id: pokemonId
      };
    });
  }, [pokemonResults]); */

  /* useEffect(() => {
    setPokemonResults(pokemonResultsWithId);
  }, [pokemonResultsWithId]); */

  const updateFilteredData = (newFilteredData: any | undefined) => {
    setFilteredData(newFilteredData);
  };

  const handleFilterMenuRef = (ref: any) => {
    setFilterMenuRefState(ref);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.headerImageWrapper}>
        <Image
          style={styles.headerImage}
          source={require('@assets/images/background__pokeball--transparent.png')}
        />
      </View>

      <Text style={styles.headerText}>{t('screen-headers.pokedex')}</Text>

      <SearchBar
        pokemonListData={allPokemonList}
        onUpdateFilteredData={updateFilteredData}
        filterMenuRef={filterMenuRefState}
      />

      {isLoading && (
        <ActivityIndicator
          size={90}
          color={LogoColors.red}
          style={styles.loader}
        />
      )}

      {isError && <Text>Error</Text>}

      {!isLoading && !isError && pokemonResults && (
        <FlatList
          data={pokemonResults}
          style={styles.list}
          horizontal={false}
          numColumns={2}
          keyExtractor={(item: PokemonResource) => item.name}
          renderItem={({ item }) => (
            <PokemonCard
              name={item.name}
              url={item.url}
            />
          )}
        />
      )}

      <FilterMenu onFilterMenuRef={handleFilterMenuRef} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    paddingTop: 10,
    height: '100%'
  },
  headerText: HeaderText,
  headerImageWrapper: {
    position: 'absolute',
    right: -120,
    top: -140
  },
  headerImage: {
    width: 350,
    height: 350,
    opacity: 0.3
  },
  list: {
    paddingHorizontal: 20
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%'
  }
});
