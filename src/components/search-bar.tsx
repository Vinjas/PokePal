import React, { useState } from 'react';
import { Colors, LogoColors } from '@constants/styles/colors';
import { StyleSheet, TextInput, View } from 'react-native';
import { FontFamily } from '@constants/styles/fontsFamily';
import { t } from 'i18next';
import SearchIcon from '@assets/svg/search--grey.svg';
import SortIcon from '@assets/svg/sort-icon.svg';
import { BaseButton } from 'react-native-gesture-handler';

type SearchBarProps = {
  pokemonListData?: Array<any>;
  onUpdateFilteredData?: (data: Array<any>) => void;
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

export const SearchBar = ({
  pokemonListData,
  onUpdateFilteredData,
  filterMenuRef
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
