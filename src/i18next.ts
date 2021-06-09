import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import mainEn from './texts/mainEn';

i18n
  .use(initReactI18next)
  .init({
    ns: Object.keys(mainEn),
    resources: {
      en: {
        main: mainEn,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
