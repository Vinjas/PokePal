import { AppThemeContext } from 'context/app-theme-context';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const ItemsScreen = ({ navigation }: any): JSX.Element => {
  const { t } = useTranslation();

  const { isDarkMode } = useContext(AppThemeContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('home.items')}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentText}>{t('home.moves')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
