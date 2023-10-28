import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';
import en from './en.json';
import es from './es.json';
import it from './it.json';
import de from './de.json';
import fr from './fr.json';
import ja from './ja.json';
import ko from './ko.json';
import { storage } from '@app-storage/app-storage';
import { STORAGE } from '@constants/storage';

const resources = {
  en: { translation: en },
  es: { translation: es },
  it: { translation: it },
  de: { translation: de },
  fr: { translation: fr },
  ja: { translation: ja },
  ko: { translation: ko }
};

i18n
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    // use react-native-localize to determine the user's locale
    lng: storage.getString(STORAGE.LANG) ?? getLocales()[0].languageCode,
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
