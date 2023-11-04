import { CustomText } from '@components/custom-text';
import { GenerationButton } from '@components/generation-button';
import { TypeButton } from '@components/type-button';
import { GENERATIONS } from '@constants/generations';
import { Colors, LogoColors } from '@constants/styles/colors';
import { POKEMON_TYPES } from '@constants/types';
import React, { useContext, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import RBSheet from 'react-native-raw-bottom-sheet';
import { SORT_OPTIONS } from '@constants/sort-options';
import { FontFamily } from '@constants/styles/fontsFamily';
import { FilterPokemonContext } from 'context/filter-pokemon-context';
import { PokemonResultsContext } from 'context/pokemon-results-context';
import { sortPokemonList } from '@utils/sort-pokemon-list';
import { filterPokemonList } from '@utils/filter-pokemon-list';
import { useTranslation } from 'react-i18next';
import { AppThemeContext } from 'context/app-theme-context';
import CloseGreySvg from '@assets/svg/close--grey.svg';
import i18n from '@i18n/i18n';

type FilterMenuProps = {
  onFilterMenuRef: (ref: any) => void;
};

const CloseIcon = () => (
  <CloseGreySvg
    width={12}
    height={12}
    style={{ marginRight: 5 }}
  />
);

export const FilterMenu = ({ onFilterMenuRef }: FilterMenuProps): JSX.Element => {
  const filterMenuRef = useRef<RBSheet>();

  const { isDarkMode } = useContext(AppThemeContext);

  const { t } = useTranslation();

  const { filters } = useContext<any>(FilterPokemonContext);
  const { sortValue, setFilters, setSortValue, searchText } =
    useContext<any>(FilterPokemonContext);
  const { pokemonResults, setPokemonResults, fullPokemonList } =
    useContext<any>(PokemonResultsContext);

  useEffect(() => {
    onFilterMenuRef(filterMenuRef);
  }, [onFilterMenuRef]);

  async function handleApply(isClearingFilters: boolean) {
    const currentPokemonResults = [...pokemonResults];

    if (isClearingFilters) {
      setFilters({ type: [], generation: [] });
      setSortValue(SORT_OPTIONS[0].value);
    }

    let filteredPokemonResults = await filterPokemonList(
      currentPokemonResults,
      isClearingFilters ? { type: [], generation: [] } : filters,
      fullPokemonList
    );

    if (searchText && filteredPokemonResults) {
      filteredPokemonResults = filteredPokemonResults.filter(item =>
        item.names[i18n.language].toLowerCase().includes(searchText.toLowerCase())
      );
    }

    const sortedFilteredPokemonResults = sortPokemonList(
      filteredPokemonResults,
      isClearingFilters ? SORT_OPTIONS[0].value : sortValue
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
          elevation: 30,
          backgroundColor: isDarkMode ? Colors.black : Colors.pureWhite,
          zIndex: 10
        }
      }}
    >
      <View style={styles.filterMenuContent}>
        <View>
          <View style={styles.titleWrapper}>
            <CustomText
              style={[
                styles.filterMenuHeadingText,
                isDarkMode
                  ? styles.filterMenuHeadingTextDark
                  : styles.filterMenuHeadingTextLight
              ]}
            >
              {t('label.filters')}
            </CustomText>
            <TouchableOpacity
              style={styles.clearFiltersWrapper}
              onPress={() => {
                handleApply(true);
              }}
            >
              <CloseIcon />
              <CustomText style={styles.clearFiltersText}>
                {t('label.clear-filters')}
              </CustomText>
            </TouchableOpacity>
          </View>

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
          <TouchableOpacity
            onPress={() => handleApply(false)}
            style={styles.applyButton}
          >
            <CustomText style={styles.applyButtonText}>{t('label.apply')}</CustomText>
          </TouchableOpacity>
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
  filterMenuHeadingTextDark: {
    color: Colors.pureWhite
  },
  filterMenuHeadingTextLight: {
    color: Colors.black
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
  applyButton: {
    backgroundColor: LogoColors.red,
    width: '100%',
    paddingVertical: 15,
    borderRadius: 30,
    position: 'absolute',
    zIndex: 20
  },
  applyButtonText: {
    color: Colors.pureWhite,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsMedium,
    fontSize: 16,
    zIndex: 30
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
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  clearFiltersWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.darkGrey1,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  clearFiltersText: {
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    marginTop: 2,
    color: Colors.darkGrey1,
    marginLeft: 5
  }
});
