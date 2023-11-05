import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { CustomText } from './custom-text';
import { TypeIcon } from './type-icon';
import {
  ColorTypesHightlight,
  Colors,
  LogoColors,
  TypesEffectColors
} from '@constants/styles/colors';
import { useTranslation } from 'react-i18next';
import { FontFamily } from '@constants/styles/fontsFamily';
import DownArrowSvg from '@assets/svg/down-arrow-small.svg';
import DownArrowSvgWhite from '@assets/svg/down-arrow-small--white.svg';
import RightArrowSvg from '@assets/svg/right-arrow-small.svg';
import RightArrowSvgWhite from '@assets/svg/right-arrow-small--white.svg';
import {
  NORMAL_COLUMN,
  FIRE_COLUMN,
  BUG_COLUMN,
  DARK_COLUMN,
  DRAGON_COLUMN,
  ELECTRIC_COLUMN,
  FAIRY_COLUMN,
  FIGHTING_COLUMN,
  FLYING_COLUMN,
  GHOST_COLUMN,
  GRASS_COLUMN,
  GROUND_COLUMN,
  ICE_COLUMN,
  POISON_COLUMN,
  PSYCHIC_COLUMN,
  ROCK_COLUMN,
  STEEL_COLUMN,
  WATER_COLUMN
} from '@constants/types-chart';
import { AppThemeContext } from 'context/app-theme-context';

export const TypeChartTable = () => {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  const header = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy'
  ];

  const DownArrowIcon = () =>
    isDarkMode ? (
      <DownArrowSvgWhite
        width={10}
        height={10}
        style={{ marginLeft: 5 }}
      />
    ) : (
      <DownArrowSvg
        width={10}
        height={10}
        style={{ marginLeft: 5 }}
      />
    );

  const RightArrowIcon = () =>
    isDarkMode ? (
      <RightArrowSvgWhite
        width={10}
        height={10}
        style={{ marginLeft: 5 }}
      />
    ) : (
      <RightArrowSvg
        width={10}
        height={10}
        style={{ marginLeft: 5 }}
      />
    );

  function getColumnByType(type: string): any {
    switch (type) {
      case 'normal':
        return NORMAL_COLUMN;
      case 'fire':
        return FIRE_COLUMN;
      case 'water':
        return WATER_COLUMN;
      case 'electric':
        return ELECTRIC_COLUMN;
      case 'grass':
        return GRASS_COLUMN;
      case 'ice':
        return ICE_COLUMN;
      case 'fighting':
        return FIGHTING_COLUMN;
      case 'poison':
        return POISON_COLUMN;
      case 'ground':
        return GROUND_COLUMN;
      case 'flying':
        return FLYING_COLUMN;
      case 'psychic':
        return PSYCHIC_COLUMN;
      case 'bug':
        return BUG_COLUMN;
      case 'rock':
        return ROCK_COLUMN;
      case 'ghost':
        return GHOST_COLUMN;
      case 'dragon':
        return DRAGON_COLUMN;
      case 'dark':
        return DARK_COLUMN;
      case 'steel':
        return STEEL_COLUMN;
      case 'fairy':
        return FAIRY_COLUMN;
      default:
        return [];
    }
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.contentWrapper}>
          <View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText
                  style={{
                    ...styles.extraColumnText,
                    color: isDarkMode ? Colors.pureWhite : Colors.black
                  }}
                >
                  {t('pokemon-types.status.vulnerable')}
                </CustomText>
                <RightArrowIcon />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText
                  style={{
                    ...styles.extraColumnText,
                    color: isDarkMode ? Colors.pureWhite : Colors.black
                  }}
                >
                  {t('pokemon-types.status.strong')}
                </CustomText>
                <DownArrowIcon />
              </View>
            </View>

            <View>
              {header.map((item, index) => (
                <View
                  key={index}
                  style={{
                    ...styles.mainColumn,
                    backgroundColor:
                      ColorTypesHightlight[item as keyof typeof ColorTypesHightlight],
                    borderBottomColor: isDarkMode ? Colors.black : Colors.pureWhite,
                    borderLeftColor: isDarkMode ? Colors.black : Colors.pureWhite
                  }}
                >
                  <TypeIcon
                    type={item}
                    size={16}
                  />
                  <CustomText style={styles.headerText}>
                    {t(`pokemon-types.${item}`)}
                  </CustomText>
                </View>
              ))}
            </View>
          </View>
          <View>
            <ScrollView horizontal>
              {header.map((type, index) => (
                <View key={index}>
                  <View
                    style={{
                      ...styles.mainRow,
                      backgroundColor:
                        ColorTypesHightlight[type as keyof typeof ColorTypesHightlight],
                      borderBottomColor: isDarkMode ? Colors.black : Colors.pureWhite,
                      borderLeftColor: isDarkMode ? Colors.black : Colors.pureWhite
                    }}
                  >
                    <TypeIcon
                      type={type}
                      size={16}
                    />
                    <CustomText style={styles.headerText}>
                      {t(`pokemon-types.${type}`).substring(0, 3)}
                    </CustomText>
                  </View>

                  {getColumnByType(type).map((cell: any, indexCell: number) => (
                    <View
                      key={indexCell}
                      style={[
                        styles.cell,
                        styles[cell.value.color as keyof typeof styles],
                        isDarkMode && styles.cellDark
                      ]}
                    >
                      <CustomText
                        style={[
                          styles.cellText,
                          styles[cell.value.color as keyof typeof styles]
                        ]}
                      >
                        {cell.value.value}
                      </CustomText>
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  contentWrapper: { flexDirection: 'row', flex: 1, paddingRight: 100, paddingBottom: 50 },
  mainColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingRight: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.pureWhite,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingRight: 5,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    width: 50
  },
  headerText: {
    color: Colors.pureWhite,
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium
  },
  extraColumnText: { fontSize: 12, marginLeft: 5 },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 37,
    borderBottomWidth: 1,
    borderBottomColor: Colors.ligthGrey1,
    borderRightWidth: 1,
    borderRightColor: Colors.ligthGrey1
  },
  cellDark: {
    borderBottomColor: LogoColors.darkerBlue,
    borderRightColor: LogoColors.darkerBlue
  },
  cellText: {
    color: Colors.pureWhite,
    fontSize: 14,
    fontFamily: FontFamily.poppinsSemiBold
  },
  neutral: {
    color: 'transparent'
  },
  strong: {
    backgroundColor: TypesEffectColors.superEffective
  },
  weak: {
    backgroundColor: TypesEffectColors.notVeryEffective
  },
  noEffect: {
    backgroundColor: TypesEffectColors.noEffect
  }
});
