import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import ICU from 'i18next-icu';
import { initReactI18next } from 'react-i18next';

import { en, de } from '@celluloid/i18n';

const deviceLocale = getLocales()[0]?.languageCode ?? 'en';

i18next
  .use(ICU)
  .use(initReactI18next)
  .init({
    lng: deviceLocale,
    fallbackLng: 'en',

    resources: {
      en: {
        translation: en,
      },
      de: {
        translation: de,
      },
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },
  });

export default i18next;
