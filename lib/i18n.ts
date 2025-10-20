import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from '../locales/en/common.json';
import esCommon from '../locales/es/common.json';

const resources = {
  en: {
    common: enCommon,
  },
  es: {
    common: esCommon,
  },
};

// Only initialize on client side to prevent hydration issues
if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      debug: process.env.NODE_ENV === 'development',

      interpolation: {
        escapeValue: false, // React already does escaping
      },

      detection: {
        order: ['localStorage', 'htmlTag'],
        caches: ['localStorage'],
        lookupLocalStorage: 'i18nextLng',
      },

      defaultNS: 'common',
      ns: ['common'],
    });
} else {
  // Server-side initialization without language detection
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en', // Default to English on server
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    defaultNS: 'common',
    ns: ['common'],
  });
}

export default i18n;
