import { PokemonCard } from '@components/pokemon-card';
import { RQ_KEY } from '@constants/react-query';
import { HeaderText } from '@constants/styles/screen-header';
import { getPokemonList } from '@services/poke-api';
import { useQuery } from '@tanstack/react-query';
import { t } from 'i18next';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type PokemonResource = {
  name: string;
  url: string;
};

export const PokedexScreen = (): JSX.Element => {
  const {
    data: pokemonListData,
    isLoading,
    isError
  } = useQuery({
    queryKey: [RQ_KEY.ALL_POKEMON_LISTS],
    queryFn: () => getPokemonList({ limit: 4, offset: 0 })
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.headerImageWrapper}>
        <Image
          style={styles.headerImage}
          source={require('@assets/images/background__pokeball--transparent.png')}
        />
      </View>

      <Text style={styles.headerText}>{t('screen-headers.pokedex')}</Text>

      {isLoading && <Text>Loading...</Text>}

      {isError && <Text>Error</Text>}

      {!isLoading && !isError && pokemonListData && (
        <View style={styles.content}>
          {pokemonListData.results.map((pokemon: PokemonResource) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
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
  }
});
