import React, { useContext, useMemo, useState } from 'react';
import { Colors, LogoColors } from '@constants/styles/colors';
import { StyleSheet, TextInput, View } from 'react-native';
import { FontFamily } from '@constants/styles/fontsFamily';
import SearchIcon from '@assets/svg/search--grey.svg';
import SortIcon from '@assets/svg/sort-icon.svg';
import { BaseButton } from 'react-native-gesture-handler';
import { PokemonResultsContext } from 'context/pokemon-results-context';
import { FilterPokemonContext } from 'context/filter-pokemon-context';
import { sortPokemonList } from '@utils/sort-pokemon-list';
import { filterPokemonList } from '@utils/filter-pokemon-list';
import { isEmpty } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';

const SearchButton = () => (
  <SearchIcon
    width={28}
    height={28}
    style={styles.searchIcon}
  />
);

export const SearchBarMoves = ({ updateSearch, searchValue }): JSX.Element => {
  const { isDarkMode } = useContext(AppThemeContext);

  const { t } = useTranslation();

  return (
    <View style={styles.containerWrapper}>
      <View style={styles.searchBarWrapper}>
        <SearchButton />

        <TextInput
          style={[
            styles.searchBar,
            isDarkMode ? styles.searchBarDark : styles.searchBarLight
          ]}
          placeholder={t('search-bar.placeholder')}
          onChangeText={text => updateSearch(text)}
          value={searchValue}
          placeholderTextColor={isDarkMode ? Colors.ligthGrey1 : Colors.darkGrey1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginHorizontal: 25
  },
  searchBarWrapper: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: Colors.greyTransparent,
    borderRadius: 15,
    paddingHorizontal: 15
  },
  searchBar: {
    fontSize: 16,
    fontFamily: FontFamily.poppinsMedium,
    marginTop: 5,
    width: '100%'
  },
  searchBarDark: {
    color: Colors.pureWhite
  },
  searchBarLight: {
    color: Colors.darkGrey1
  },
  searchIcon: {
    marginRight: 10,
    marginTop: 10
  }
});
