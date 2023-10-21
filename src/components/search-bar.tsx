import React, { useState } from 'react';
import { Colors } from '@constants/styles/colors';
import { StyleSheet, TextInput, View } from 'react-native';
import { FontFamily } from '@constants/styles/fontsFamily';
import { t } from 'i18next';
import SearchIcon from '@assets/svg/search--grey.svg';

type SearchBarProps = {
  pokemonListData?: Array<any>;
  onUpdateFilteredData?: (data: Array<any>) => void;
};

const SearchButton = () => (
  <SearchIcon
    width={28}
    height={28}
    style={styles.searchIcon}
  />
);

export const SearchBar = ({
  pokemonListData,
  onUpdateFilteredData
}: SearchBarProps): JSX.Element => {
  const [searchText, setSearchText] = useState('');

  const updateSearch = (text: string) => {
    setSearchText(text);
    filterData(text);
  };

  const filterData = (text: string) => {
    const filtered = pokemonListData?.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    if (onUpdateFilteredData) {
      onUpdateFilteredData(filtered);
    }
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  searchBarWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    backgroundColor: Colors.greyTransparent,
    borderRadius: 15,
    marginBottom: 10,
    marginHorizontal: 20,
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
  }
});
