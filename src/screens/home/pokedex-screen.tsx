import { PokemonCard } from '@components/pokemon-card';
import { SearchBar } from '@components/search-bar';
import { RQ_KEY } from '@constants/react-query';
import { Colors, LogoColors } from '@constants/styles/colors';
import { HeaderText } from '@constants/styles/screen-header';
import { getPokemonList } from '@services/poke-api';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import RBSheet from 'react-native-raw-bottom-sheet';
import { CustomText } from '@components/custom-text';

type PokemonResource = {
  name: string;
  url: string;
};

export const PokedexScreen = (): JSX.Element => {
  const [pokemonListData, setPokemonListData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const filterMenuRef = useRef<RBSheet>();

  const { isLoading, isError } = useQuery({
    queryKey: [RQ_KEY.ALL_POKEMON_LISTS],
    queryFn: () => getPokemonList({ limit: 1010, offset: 0 }),
    onSuccess: data => {
      setPokemonListData(data.results);
      setFilteredData(data.results);
    }
  });

  const updateFilteredData = (newFilteredData: any | undefined) => {
    setFilteredData(newFilteredData);
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
        pokemonListData={pokemonListData}
        onUpdateFilteredData={updateFilteredData}
        filterMenuRef={filterMenuRef}
      />

      {isLoading && (
        <ActivityIndicator
          size={90}
          color={LogoColors.red}
          style={styles.loader}
        />
      )}

      {isError && <Text>Error</Text>}

      {!isLoading && !isError && filteredData && (
        <FlatList
          data={filteredData}
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

      <RBSheet
        ref={filterMenuRef}
        closeOnDragDown
        height={600}
        customStyles={{
          wrapper: {
            backgroundColor: Colors.blackTransparent
          },
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20
          }
        }}
      >
        <View style={styles.filterMenuContent}>
          <View>
            <CustomText style={styles.filterMenuHeadingText}>Filter</CustomText>

            <CustomText style={styles.filterMenuTitle}>Type</CustomText>
            <ScrollView
              style={{ height: 20 }}
              horizontal={true}
            >
              <CustomText>test 12342342342342</CustomText>
              <Text>test 23423423423423</Text>
              <Text>test 23423423423423</Text>
              <Text>test 23423423423423</Text>
              <Text>test 23423423423423</Text>
              <Text>test 23423423423423</Text>
              <Text>test 23423423423423</Text>
              <Text>test 23423423423423</Text>
            </ScrollView>
            <CustomText style={styles.filterMenuTitle}>Generation</CustomText>
            <ScrollView horizontal={true}>
              <Text>test 1</Text>
              <Text>test 2</Text>
            </ScrollView>

            <CustomText style={styles.filterMenuTitle}>Sort</CustomText>
          </View>

          <RectButton style={styles.filterMenuButton}>
            <CustomText style={styles.filterMenuButtonText}>Apply</CustomText>
          </RectButton>
        </View>
      </RBSheet>
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
  },
  filterMenuContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingBottom: 30
  },
  filterMenuHeadingText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: Colors.black
  },
  filterMenuTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: Colors.darkGrey1
  },
  filterMenuButton: {
    backgroundColor: LogoColors.red,
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    width: '100%',
    elevation: 3
  },
  filterMenuButtonText: {
    color: Colors.pureWhite,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center'
  }
});
