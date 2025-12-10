import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/common.json';
import hi from './hi/common.json';
import te from './te/common.json';
import ta from './ta/common.json';
import kn from './kn/common.json';
import mr from './mr/common.json';
import gu from './gu/common.json';

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati' },
] as const;

export type LanguageCode = (typeof languages)[number]['code'];

i18n.use(initReactI18next).init({
  resources: {
    en: { common: en },
    hi: { common: hi },
    te: { common: te },
    ta: { common: ta },
    kn: { common: kn },
    mr: { common: mr },
    gu: { common: gu },
  },
  lng: 'hi', // Default to Hindi
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
