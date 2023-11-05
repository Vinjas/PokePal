import React, { useContext } from 'react';
import { Colors } from '@constants/styles/colors';
import { StyleSheet, TextInput, View } from 'react-native';
import { FontFamily } from '@constants/styles/fontsFamily';
import SearchIcon from '@assets/svg/search--grey.svg';
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';

const SearchButton = () => (
  <SearchIcon
    width={28}
    height={28}
    style={styles.searchIcon}
  />
);

export const SearchBarGeneric = ({
  updateSearch,
  searchValue
}: {
  updateSearch: any;
  searchValue: string;
}): JSX.Element => {
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
