import React, { useContext, useMemo, useState } from 'react';
import { Colors, LogoColors } from '@constants/styles/colors';
import { StyleSheet, TextInput, View } from 'react-native';
import { FontFamily } from '@constants/styles/fontsFamily';
import { t } from 'i18next';
import SearchIcon from '@assets/svg/search--grey.svg';
import SortIcon from '@assets/svg/sort-icon.svg';
import { BaseButton } from 'react-native-gesture-handler';
import { PokemonResultsContext } from 'context/pokemon-results-context';
import { FilterPokemonContext } from 'context/filter-pokemon-context';
import { sortPokemonList } from '@utils/sort-pokemon-list';
import { filterPokemonList } from '@utils/filter-pokemon-list';
import { isEmpty } from 'lodash-es';

type SearchBarProps = {
  filterMenuRef?: any;
};

const SearchButton = () => (
  <SearchIcon
    width={28}
    height={28}
    style={styles.searchIcon}
  />
);

const SortButton = () => (
  <SortIcon
    width={28}
    height={28}
  />
);

export const SearchBar = ({ filterMenuRef }: SearchBarProps): JSX.Element => {
  const { pokemonResults, setPokemonResults, fullPokemonList } =
    useContext<any>(PokemonResultsContext);
  const { sortValue, searchText, setSearchText, filters } =
    useContext<any>(FilterPokemonContext);

  const updateSearch = (text: string) => {
    setSearchText(text);
    filterData(text);
  };

  async function filterData(text: string) {
    const currentPokemonResults = [...pokemonResults];
    let filteredPokemonResults;

    if (!isEmpty(filters.type) || !isEmpty(filters.generation)) {
      filteredPokemonResults = await filterPokemonList(
        currentPokemonResults,
        filters,
        fullPokemonList
      );
    }

    if (!filteredPokemonResults) {
      filteredPokemonResults = fullPokemonList;
    }

    filteredPokemonResults = filteredPokemonResults.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    const sortedFilteredPokemonResults = sortPokemonList(
      filteredPokemonResults,
      sortValue
    );

    setPokemonResults(sortedFilteredPokemonResults);
  }

  function handleFilterOnPress() {
    filterMenuRef.current.open();
  }

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.searchBarWrapper}>
        <SearchButton />

        <TextInput
          style={styles.searchBar}
          placeholder={t('search-bar.placeholder')}
          onChangeText={updateSearch}
          value={searchText}
          placeholderTextColor={Colors.darkGrey1}
        />
      </View>

      <BaseButton
        style={styles.filterButtonWrapper}
        onPress={handleFilterOnPress}
      >
        <SortButton />
      </BaseButton>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginHorizontal: 20
  },
  searchBarWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: Colors.greyTransparent,
    borderRadius: 15,
    marginRight: 20,
    paddingHorizontal: 15
  },
  searchBar: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    color: Colors.black,
    marginTop: 5
  },
  searchIcon: {
    marginRight: 10,
    marginTop: 10
  },
  filterButtonWrapper: {
    backgroundColor: LogoColors.red,
    borderRadius: 50,
    padding: 10,
    elevation: 3
  },
  filterMenuWrapper: {
    paddingHorizontal: 20,
    borderBottomColor: Colors.ligthGrey1,
    borderBottomWidth: 1,
    paddingBottom: 10
  }
});
