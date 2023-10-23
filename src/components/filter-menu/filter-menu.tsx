import { CustomText } from '@components/custom-text';
import { GenerationButton } from '@components/generation-button';
import { TypeButton } from '@components/type-button';
import { GENERATIONS } from '@constants/generations';
import { Colors, LogoColors } from '@constants/styles/colors';
import { POKEMON_TYPES } from '@constants/types';
import React, { useContext, useEffect, useRef } from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SORT_OPTIONS } from '@constants/sort-options';
import { FontFamily } from '@constants/styles/fontsFamily';
import { t } from 'i18next';
import { FilterPokemonContext } from 'context/filter-pokemon-context';
import { PokemonResultsContext } from 'context/pokemon-results-context';
import { sortPokemonList } from '@utils/sort-pokemon-list';
import { filterPokemonList } from '@utils/filter-pokemon-list';

type FilterMenuProps = {
  onFilterMenuRef: (ref: any) => void;
};

export const FilterMenu = ({ onFilterMenuRef }: FilterMenuProps): JSX.Element => {
  const filterMenuRef = useRef<RBSheet>();

  const { filters } = useContext<any>(FilterPokemonContext);
  const { sortValue, setSortValue } = useContext<any>(FilterPokemonContext);
  const { pokemonResults, setPokemonResults, fullPokemonList } =
    useContext<any>(PokemonResultsContext);

  useEffect(() => {
    onFilterMenuRef(filterMenuRef);
  }, [onFilterMenuRef]);

  async function handleApply() {
    const currentPokemonResults = [...pokemonResults];

    const filteredPokemonResults = await filterPokemonList(
      currentPokemonResults,
      filters,
      fullPokemonList
    );

    console.log('sortValue :>> ', sortValue);

    const sortedFilteredPokemonResults = sortPokemonList(
      filteredPokemonResults,
      sortValue
    );

    setPokemonResults(sortedFilteredPokemonResults);
    filterMenuRef.current?.close();
  }

  return (
    <RBSheet
      ref={filterMenuRef}
      closeOnDragDown
      dragFromTopOnly
      height={630}
      customStyles={{
        wrapper: {
          backgroundColor: Colors.blackTransparent
        },
        container: {
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          elevation: 30
        }
      }}
    >
      <View style={styles.filterMenuContent}>
        <View>
          <CustomText style={styles.filterMenuHeadingText}>
            {t('label.filters')}
          </CustomText>

          <CustomText style={styles.filterMenuTitle}>{t('label.type')}</CustomText>
          <View style={styles.elemList}>
            {POKEMON_TYPES.map((type, index) => (
              <TypeButton
                key={index}
                type={type.name}
              />
            ))}
          </View>
          <CustomText style={{ ...styles.filterMenuTitle }}>
            {t('label.generation')}
          </CustomText>
          <ScrollView
            horizontal
            style={styles.scrollView}
          >
            {GENERATIONS.map((generation, index) => (
              <GenerationButton
                key={index}
                generation={generation.name}
              />
            ))}
          </ScrollView>

          <CustomText style={styles.filterMenuTitle}>{t('label.sort')}</CustomText>
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={styles.dropdownSelectedTextStyle}
            containerStyle={styles.dropdownContainerStyle}
            itemTextStyle={styles.dropdownItemTextStyle}
            mode={'modal'}
            fontFamily={FontFamily.poppinsMedium}
            data={SORT_OPTIONS}
            labelField='label'
            valueField='value'
            value={sortValue}
            onChange={(value: any) => setSortValue(value)}
          />
        </View>

        <View style={styles.filterMenuButton}>
          <Button
            title={t('label.apply')}
            onPress={handleApply}
            color={LogoColors.red}
          />
        </View>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  filterMenuContent: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    paddingBottom: 30,
    paddingTop: 25
  },
  filterMenuHeadingText: {
    fontSize: 24,
    fontFamily: FontFamily.poppinsSemiBold,
    color: Colors.black,
    lineHeight: 28
  },
  filterMenuTitle: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    color: Colors.darkGrey1,
    marginTop: 15
  },
  filterMenuButton: {
    paddingVertical: 15,
    textAlign: 'center',
    width: '100%',
    elevation: 3
  },
  filterMenuButtonText: {
    color: Colors.pureWhite,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    textAlign: 'center'
  },
  scrollView: {
    maxHeight: 45
  },
  elemList: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  dropdown: {
    height: 45,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: LogoColors.blue,
    backgroundColor: LogoColors.lightBlue,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20
  },
  dropdownSelectedTextStyle: {
    color: LogoColors.darkBlue,
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium
  },
  dropdownContainerStyle: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: LogoColors.blue,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: Colors.pureWhite
  },
  dropdownItemTextStyle: {
    color: LogoColors.darkBlue,
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular
  }
});
