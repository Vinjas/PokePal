import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
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
import RightArrowSvg from '@assets/svg/right-arrow-small.svg';
import { NORMAL_COLUMN } from '@constants/types-chart';

const DownArrowIcon = () => (
  <DownArrowSvg
    width={10}
    height={10}
    style={{ marginLeft: 5 }}
  />
);

const RightArrowIcon = () => (
  <RightArrowSvg
    width={10}
    height={10}
    style={{ marginLeft: 5 }}
  />
);

export const TypeChartTable = () => {
  const column1 = [];

  const { t } = useTranslation();

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

  return (
    <View style={styles.wrapper}>
      <ScrollView>
        <View style={styles.contentWrapper}>
          <View>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText style={styles.extraColumnText}>
                  {t('pokemon-types.status.vulnerable')}
                </CustomText>
                <RightArrowIcon />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CustomText style={styles.extraColumnText}>
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
                      ColorTypesHightlight[item as keyof typeof ColorTypesHightlight]
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
              {header.map((item, index) => (
                <View
                  key={index}
                  style={styles.column}
                >
                  <View
                    style={{
                      ...styles.mainRow,
                      backgroundColor:
                        ColorTypesHightlight[item as keyof typeof ColorTypesHightlight]
                    }}
                  >
                    <TypeIcon
                      type={item}
                      size={16}
                    />
                    <CustomText style={styles.headerText}>
                      {t(`pokemon-types.${item}`).substring(0, 3)}
                    </CustomText>
                  </View>

                  {NORMAL_COLUMN.map((cell, indexCell) => (
                    <View
                      key={indexCell}
                      style={[
                        styles.cell,
                        styles[cell.value.color as keyof typeof styles]
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
    borderBottomColor: Colors.pureWhite,
    borderLeftWidth: 1,
    borderLeftColor: Colors.pureWhite,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
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
