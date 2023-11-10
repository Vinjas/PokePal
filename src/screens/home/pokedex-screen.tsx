import { PokemonCard } from '@components/pokemon-card';
import { SearchBar } from '@components/search-bar';
import { RQ_KEY } from '@constants/react-query';
import { Colors, LogoColors } from '@constants/styles/colors';
import { getPokemonList } from '@services/poke-api';
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View, FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FilterMenu } from '@components/filter-menu/filter-menu';
import { PokemonResultsContext } from 'context/pokemon-results-context';
import BackIcon from '@assets/svg/back.svg';
import BackIconWhite from '@assets/svg/back--white.svg';
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';
import { FontFamily } from '@constants/styles/fontsFamily';
import { FilterPokemonContext } from 'context/filter-pokemon-context';
import { SORT_OPTIONS } from '@constants/sort-options';

type PokemonResource = {
  name: string;
  id: number;
  type: { typePrimary: string; typeSecondary: string };
  sprite: { spriteGif: string; spriteOfficial: string };
  names: {
    en: string;
    ja: string;
    fr: string;
    it: string;
    de: string;
    es: string;
    ko: string;
  };
  generation: string;
  stats: any[];
  url: string;
};

export const PokedexScreen = ({ navigation }: any): JSX.Element => {
  const [filterMenuRefState, setFilterMenuRefState] = useState(null);

  const { t } = useTranslation();

  const { pokemonResults, setPokemonResults, setFullPokemonList } =
    useContext<any>(PokemonResultsContext);
  const { setSortValue, setSearchText, setFilters } =
    useContext<any>(FilterPokemonContext);

  const { isDarkMode } = useContext(AppThemeContext);

  const { isLoading, isError } = useQuery({
    queryKey: [RQ_KEY.ALL_POKEMON_LISTS],
    queryFn: () => getPokemonList(),
    onSuccess: data => {
      setPokemonResults(data);
      setFullPokemonList(data);
      setSortValue(SORT_OPTIONS[0].value);
      setSearchText('');
      setFilters({ type: [], generation: [] });
    }
  });

  const handleFilterMenuRef = (ref: any) => {
    setFilterMenuRefState(ref);
  };

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

  return (
    <SafeAreaView
      style={[styles.wrapper, isDarkMode ? styles.wrapperDark : styles.wrapperLight]}
    >
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
          {t('screen-headers.pokedex')}
        </Text>
      </View>

      <SearchBar filterMenuRef={filterMenuRefState} />

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
              id={item.id}
              names={item.names}
              typePrimary={item.type.typePrimary}
              typeSecondary={item.type.typeSecondary}
              spriteGif={item.sprite.spriteGif}
              spriteOfficial={item.sprite.spriteOfficial}
              url={item.url}
              navigation={navigation}
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
    height: '100%',
    overflow: 'hidden'
  },
  wrapperDark: {
    backgroundColor: Colors.black
  },
  wrapperLight: {
    backgroundColor: Colors.pureWhite
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
  list: {
    paddingHorizontal: 20
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%'
  }
});
