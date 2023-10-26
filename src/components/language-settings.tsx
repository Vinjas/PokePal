import { LANGUAGES_OPTIONS } from '@constants/languages';
import { getFlag } from '@utils/getFlag';
import { Dropdown } from 'react-native-element-dropdown';
import { CustomText } from './custom-text';
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Colors, LogoColors } from '@constants/styles/colors';
import { FontFamily } from '@constants/styles/fontsFamily';
import { useTranslation } from 'react-i18next';
import { storage } from '@app-storage/app-storage';

export const LanguageSettings = () => {
  const { t, i18n } = useTranslation();

  const [languageValue, setLanguageValue] = useState(i18n.language);

  function handleOnChangeLanguage({ value }: { value: string }) {
    i18n.changeLanguage(value);
    storage.set('language', value);
    setLanguageValue(value);
  }

  return (
    <Dropdown
      search
      style={styles.dropdown}
      selectedTextStyle={styles.dropdownSelectedTextStyle}
      containerStyle={styles.dropdownContainerStyle}
      itemTextStyle={styles.dropdownItemTextStyle}
      iconStyle={{ position: 'absolute', left: 45 }}
      inputSearchStyle={styles.dropdownSearchStyles}
      mode={'modal'}
      renderItem={(item: any) => (
        <View style={styles.dropdownRenderItem}>
          {getFlag(item.value, '30')}
          <CustomText style={styles.dropdownItemTextStyle}>{item.label}</CustomText>
        </View>
      )}
      renderLeftIcon={() => getFlag(languageValue, '40')}
      data={LANGUAGES_OPTIONS}
      searchPlaceholder={t('search-bar.placeholder')}
      labelField='label'
      valueField='value'
      value={languageValue}
      onChange={(value: any) => handleOnChangeLanguage(value)}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 15,
    borderWidth: 0
  },
  dropdownSelectedTextStyle: {
    color: LogoColors.darkBlue,
    fontSize: 14,
    fontFamily: FontFamily.poppinsMedium,
    paddingLeft: 20
  },
  dropdownContainerStyle: {
    minWidth: 300,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: LogoColors.blue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: Colors.pureWhite
  },
  dropdownItemTextStyle: {
    color: LogoColors.darkBlue,
    fontSize: 16,
    fontFamily: FontFamily.poppinsRegular,
    paddingLeft: 20
  },
  dropdownSearchStyles: {
    borderRadius: 15,
    marginHorizontal: 0
  },
  dropdownRenderItem: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
