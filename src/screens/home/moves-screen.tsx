import { MoveCard } from '@components/move-card';
import { SearchBarGeneric } from '@components/search-bar-generic';
import { RQ_KEY } from '@constants/react-query';
import { Colors, LogoColors } from '@constants/styles/colors';
import { getAllMoves } from '@services/poke-api';
import { useQuery } from '@tanstack/react-query';
import { AppThemeContext } from 'context/app-theme-context';
import React, { useContext, useState } from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  View,
  Image
} from 'react-native';
import i18n from '@i18n/i18n';
import BackIcon from '@assets/svg/back.svg';
import BackIconWhite from '@assets/svg/back--white.svg';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { FontFamily } from '@constants/styles/fontsFamily';

export const MovesScreen = ({ navigation }: any): JSX.Element => {
  const { isDarkMode } = useContext(AppThemeContext);

  const { t } = useTranslation();

  const [movesList, setMovesList] = useState<any[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const { isLoading, isError } = useQuery({
    queryKey: [RQ_KEY.ALL_POKEMON_LISTS],
    queryFn: () => getAllMoves(),
    onSuccess: (data: any) => {
      setMovesList(data);
      setSearchResults(data);
    }
  });

  const BackButton = () => {
    return isDarkMode ? (
      <BackIconWhite
        width={20}
        height={20}
      />
    ) : (
      <BackIcon
        width={20}
        height={20}
      />
    );
  };

  const updateSearch = (text: string) => {
    setSearchText(text);

    const filteredData = movesList.filter((item: any) => {
      return item.names[i18n.language].toLowerCase().includes(text.toLowerCase());
    });

    setSearchResults(filteredData);
  };

  return (
    <SafeAreaView
      style={[styles.wrapper, isDarkMode ? styles.wrapperDark : styles.wrapperLight]}
    >
      <View style={styles.headerBar}>
        <BorderlessButton
          style={{ padding: 10 }}
          onPress={() => navigation.goBack()}
        >
          <BackButton />
        </BorderlessButton>
        <Text
          style={[
            styles.headerText,
            isDarkMode ? styles.headerTextDark : styles.headerTextLight
          ]}
        >
          {t('home.moves')}
        </Text>
      </View>

      <SearchBarGeneric
        updateSearch={updateSearch}
        searchValue={searchText}
      />

      <View style={styles.headerImageWrapper}>
        <Image
          style={styles.headerImage}
          source={
            isDarkMode
              ? require('@assets/images/background__pokeball--white-transparent.png')
              : require('@assets/images/background__pokeball--transparent.png')
          }
        />
      </View>

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
          numColumns={1}
          keyExtractor={item => item.url}
          renderItem={({ item }) => (
            <MoveCard
              key={item.name}
              name={item.name}
              names={item.names}
              isLvl={false}
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
  },
  headerImageWrapper: {
    position: 'absolute',
    right: -120,
    top: -140
  },
  headerImage: {
    width: 350,
    height: 350,
    opacity: 0.5
  },
  headerText: {
    fontSize: 32,
    fontFamily: FontFamily.poppinsBold,
    color: Colors.black,
    paddingHorizontal: 10,
    lineHeight: 40
  },
  headerTextLight: {
    color: Colors.black
  },
  headerTextDark: {
    color: Colors.pureWhite
  },
  headerBar: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10
  }
});
