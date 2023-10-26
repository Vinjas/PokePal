import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import en from './en.json';
import es from './es.json';
import { storage } from '@app-storage/app-storage';

const resources = {
  en: { translation: en },
  es: { translation: es }
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    // use react-native-localize to determine the user's locale
    lng: storage.getString('language') ?? getLocales()[0].languageCode,
    compatibilityJSON: 'v3',
    debug: false,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    react: {
      useSuspense: false
    },
    resources
  });

export default i18n;
