import { MoveCard } from '@components/move-card';
import { SearchBarMoves } from '@components/search-bar-moves';
import { DEFAULT_VIEWABILITY_CONFIG } from '@constants/flat-list-load';
import { RQ_KEY } from '@constants/react-query';
import { Colors, LogoColors } from '@constants/styles/colors';
import { getAllMoves } from '@services/poke-api';
import { useQuery } from '@tanstack/react-query';
import { AppThemeContext } from 'context/app-theme-context';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList
} from 'react-native';

export const MovesScreen = ({ navigation }: any): JSX.Element => {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  const [movesList, setMovesList] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const { isLoading, isError } = useQuery({
    queryKey: [RQ_KEY.ALL_POKEMON_LISTS],
    queryFn: () => getAllMoves({ limit: 922, offset: 0 }),
    onSuccess: (data: any) => {
      setMovesList(data.results);
      setSearchResults(data.results);
    }
  });

  const updateSearch = (text: string) => {
    setSearchText(text);

    const filteredData = movesList.filter((item: any) => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });

    setSearchResults(filteredData);
  };

  return (
    <SafeAreaView
      style={[styles.wrapper, isDarkMode ? styles.wrapperDark : styles.wrapperLight]}
    >
      <SearchBarMoves
        updateSearch={updateSearch}
        searchValue={searchText}
      />

      {isLoading && (
        <ActivityIndicator
          size={90}
          color={LogoColors.red}
          style={styles.loader}
        />
      )}

      {isError && <Text>Error</Text>}

      {!isLoading && !isError && movesList && (
        <FlatList
          data={searchResults}
          style={styles.list}
          horizontal={false}
          viewabilityConfig={DEFAULT_VIEWABILITY_CONFIG}
          numColumns={1}
          keyExtractor={item => item.url}
          renderItem={({ item }) => (
            <MoveCard
              key={item.name}
              name={item.name}
              url={item.url}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 0,
    paddingTop: 10,
    height: '100%',
    overflow: 'hidden'
  },
  wrapperDark: {
    backgroundColor: Colors.black
  },
  wrapperLight: {
    backgroundColor: Colors.pureWhite
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%'
  },
  list: {
    paddingHorizontal: 20
  }
});
