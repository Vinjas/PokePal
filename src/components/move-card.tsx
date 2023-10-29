import React, { useContext, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
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
import { use } from 'i18next';
import i18n from '@i18n/i18n';
import { FontFamily } from '@constants/styles/fontsFamily';
import { TypeButton } from './type-button';
import { TypeIcon } from './type-icon';
import { formatPokemonName } from '@utils/format-pokemon-name';

export const MoveCard = ({
  name,
  url,
  level
}: {
  name: string;
  url: string;
  level: number;
}) => {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  const {
    data: moveData,
    isLoading,
    isError
  } = useQuery({
    queryKey: [RQ_KEY.MOVE, url],
    queryFn: () => getMove(url),
    enabled: !!url
  });

  const translatedName = useMemo(() => {
    if (!moveData) return { name: '' };

    return moveData.names.filter(name => name.language.name === i18n.language);
  }, [moveData]);

  const translatedFlavorText = useMemo(() => {
    if (!moveData) return { name: '' };

    return moveData.flavor_text_entries.filter(
      name => name.language.name === i18n.language
    );
  }, [moveData]);

  return (
    <View
      style={[
        styles.cardWrapper,
        isDarkMode ? styles.cardWrapperDark : styles.cardWrapperLight
      ]}
    >
      {isLoading && (
        <View>
          <CustomText>Loading...</CustomText>
        </View>
      )}

      {isError && (
        <View>
          <CustomText>Error</CustomText>
        </View>
      )}

      {!isLoading && !isError && moveData && (
        <View>
          <View
            style={[
              styles.cardHeader,
              isDarkMode ? styles.cardHeaderDark : styles.cardHeaderLight
            ]}
          >
            <CustomText>{t('moves.headers.level')}</CustomText>
            <CustomText>{t('moves.headers.move')}</CustomText>
            <CustomText>{t('moves.headers.pwr')}</CustomText>
            <CustomText>{t('moves.headers.acc')}</CustomText>
            <CustomText>{t('moves.headers.pp')}</CustomText>
          </View>
          <View
            style={[
              styles.cardContent,
              isDarkMode ? styles.cardContentDark : styles.cardContentLight
            ]}
          >
            <View style={styles.statsWrapper}>
              <CustomText
                style={[
                  styles.dataText,
                  isDarkMode ? styles.dataTextDark : styles.dataTextLight
                ]}
              >
                {level.toString()}
              </CustomText>
              <CustomText
                style={[
                  styles.dataText,
                  { fontFamily: FontFamily.poppinsSemiBold },
                  isDarkMode ? styles.dataTextDark : styles.dataTextLight
                ]}
              >
                {translatedName[0].name}
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
                  backgroundColor: ColorTypesHightlight[moveData.type.name]
                }}
              >
                <TypeIcon
                  type={moveData.type.name}
                  size={15}
                />
                <CustomText style={styles.typeText}>
                  {formatPokemonName(moveData.type.name)}
                </CustomText>
              </View>

              {/* Category */}
              <View
                style={{
                  ...styles.catWrapper,
                  backgroundColor: DamageColors[moveData.damage_class.name]
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
              {translatedFlavorText[0].flavor_text}
            </CustomText>
          </View>
        </View>
      )}
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
    paddingHorizontal: 10,
    paddingVertical: 2,
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
    padding: 10,
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
    alignItems: 'center'
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
    fontSize: 12,
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
  }
});
