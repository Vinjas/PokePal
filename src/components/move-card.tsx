import React, { useContext, useMemo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { CustomText } from './custom-text';
import { AppThemeContext } from 'context/app-theme-context';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { RQ_KEY } from '@constants/react-query';
import { getMove } from '@services/poke-api';
import {
  ColorTypesHightlight,
  Colors,
  DamageColors,
  LogoColors
} from '@constants/styles/colors';
import i18n from '@i18n/i18n';
import { FontFamily } from '@constants/styles/fontsFamily';
import { TypeIcon } from './type-icon';
import { parseNewLines } from '@utils/parse-new-lines';

export const MoveCard = ({
  isLvl,
  names,
  url,
  level
}: {
  isLvl: boolean;
  name: string;
  names?: any[];
  url: string;
  level?: number;
}) => {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  const {
    data: moveData,
    isLoading: moveDataLoading,
    isError: moveDataError
  } = useQuery({
    queryKey: [RQ_KEY.MOVE, url],
    queryFn: () => getMove(url),
    enabled: !!url
  });

  const translatedName = useMemo(() => {
    if (!moveData) return { name: '' };

    return moveData?.names?.filter((name: any) => name.language.name === i18n.language);
  }, [moveData]);

  const translatedFlavorText = useMemo(() => {
    if (!moveData) return { name: '' };

    const filteredFlavorText = moveData?.flavor_text_entries?.filter(
      (name: any) => name.language.name === i18n.language
    );

    const parsedFlavorText = parseNewLines(filteredFlavorText?.[0]?.flavor_text);

    return parsedFlavorText;
  }, [moveData]);

  return (
    <View
      style={[
        styles.cardWrapper,
        isDarkMode ? styles.cardWrapperDark : styles.cardWrapperLight
      ]}
    >
      <View>
        <View
          style={[
            styles.cardHeader,
            isDarkMode ? styles.cardHeaderDark : styles.cardHeaderLight
          ]}
        >
          {isLvl && (
            <CustomText style={{ marginTop: 3 }}>{t('moves.headers.level')}</CustomText>
          )}
          <CustomText style={{ marginTop: 3 }}>{t('moves.headers.move')}</CustomText>
          <CustomText style={{ marginTop: 3 }}>{t('moves.headers.pwr')}</CustomText>
          <CustomText style={{ marginTop: 3 }}>{t('moves.headers.acc')}</CustomText>
          <CustomText style={{ marginTop: 3 }}>{t('moves.headers.pp')}</CustomText>
        </View>
        <View
          style={[
            styles.cardContent,
            isDarkMode ? styles.cardContentDark : styles.cardContentLight
          ]}
        >
          {moveDataLoading && (
            <ActivityIndicator
              size={50}
              color={LogoColors.red}
              style={styles.loader}
            />
          )}

          {!moveDataLoading && !moveDataError && moveData && (
            <View>
              <View style={styles.statsWrapper}>
                {isLvl && (
                  <CustomText
                    style={[
                      styles.dataText,
                      isDarkMode ? styles.dataTextDark : styles.dataTextLight
                    ]}
                  >
                    {level ? level.toString() : '-'}
                  </CustomText>
                )}
                <CustomText
                  style={[
                    styles.dataText,
                    { fontFamily: FontFamily.poppinsSemiBold },
                    isDarkMode ? styles.dataTextDark : styles.dataTextLight
                  ]}
                >
                  {names?.[i18n.language as keyof typeof names] ?? translatedName
                    ? translatedName[0]?.name
                    : moveData.name}
                </CustomText>
                <CustomText
                  style={[
                    styles.dataText,
                    isDarkMode ? styles.dataTextDark : styles.dataTextLight
                  ]}
                >
                  {moveData.power ?? '-'}
                </CustomText>
                <CustomText
                  style={[
                    styles.dataText,
                    isDarkMode ? styles.dataTextDark : styles.dataTextLight
                  ]}
                >
                  {moveData.accuracy ?? '-'}
                </CustomText>
                <CustomText
                  style={[
                    styles.dataText,
                    isDarkMode ? styles.dataTextDark : styles.dataTextLight
                  ]}
                >
                  {moveData.pp}
                </CustomText>
              </View>

              <View style={styles.typeRow}>
                {/* Type */}
                <View
                  style={{
                    ...styles.typeWrapper,
                    backgroundColor:
                      ColorTypesHightlight[
                        moveData.type.name as keyof typeof ColorTypesHightlight
                      ]
                  }}
                >
                  <TypeIcon
                    type={moveData.type.name}
                    size={15}
                  />
                  <CustomText style={styles.typeText}>
                    {t(`pokemon-types.${moveData.type.name}`)}
                  </CustomText>
                </View>

                {/* Category */}
                <View
                  style={{
                    ...styles.catWrapper,
                    backgroundColor:
                      DamageColors[
                        moveData.damage_class.name as 'status' | 'physical' | 'special'
                      ]
                  }}
                >
                  <CustomText style={styles.classText}>
                    {t(`moves.class.${moveData.damage_class.name}`)}
                  </CustomText>
                </View>
              </View>

              <CustomText
                style={[
                  styles.textFlavor,
                  isDarkMode ? styles.textFlavorDark : styles.textFlavorLight
                ]}
              >
                {translatedFlavorText
                  ? translatedFlavorText.toString()
                  : moveData?.flavor_text_entries[0]?.flavor_text}
              </CustomText>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    margin: 5
  },
  cardWrapperDark: {},
  cardWrapperLight: {},
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  cardHeaderDark: {
    backgroundColor: Colors.darkGrey1
  },
  cardHeaderLight: {
    backgroundColor: Colors.ligthGrey1
  },
  cardContent: {
    flex: 1,
    elevation: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10
  },
  cardContentDark: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.darkGrey1
  },
  cardContentLight: {
    backgroundColor: Colors.pureWhite
  },
  statsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  typeText: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 13,
    color: Colors.pureWhite,
    marginTop: 2
  },
  dataText: {
    fontFamily: FontFamily.poppinsRegular
  },
  dataTextDark: {
    color: Colors.pureWhite
  },
  dataTextLight: {
    color: Colors.black,
    fontSize: 13
  },
  typeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    width: '58%'
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  catWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 5,
    width: '38%'
  },
  classText: {
    fontFamily: FontFamily.poppinsSemiBold,
    fontSize: 13,
    color: Colors.pureWhite,
    marginTop: 2,
    textTransform: 'uppercase'
  },
  textFlavor: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
    width: '100%'
  },
  textFlavorDark: {
    color: Colors.pureWhite
  },
  textFlavorLight: {
    color: LogoColors.darkerBlue
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  }
});
