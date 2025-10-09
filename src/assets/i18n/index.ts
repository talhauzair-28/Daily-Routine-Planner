import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import English translations
import englishCommon from './supportedLanguages/english/common.json';
import englishApp from './supportedLanguages/english/app.json';

// Import Urdu translations
import urduCommon from './supportedLanguages/urdu/common.json';
import urduApp from './supportedLanguages/urdu/app.json';

// Create i18n instance
const i18n = new I18n();

// Define translations
i18n.store({
  en: {
    ...englishCommon,
    ...englishApp,
  },
  ur: {
    ...urduCommon,
    ...urduApp,
  },
});

// Set default locale
i18n.defaultLocale = 'en';
i18n.locale = 'en';

// Enable fallbacks
i18n.enableFallback = true;

// Available locales
export const availableLocales = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
];

// Storage key for persisting language preference
const LANGUAGE_STORAGE_KEY = '@app_language';

// Function to get stored language
export const getStoredLanguage = async (): Promise<string> => {
  try {
    const storedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    return storedLanguage || 'en';
  } catch (error) {
    console.warn('Failed to get stored language:', error);
    return 'en';
  }
};

// Function to store language preference
export const storeLanguage = async (languageCode: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
  } catch (error) {
    console.warn('Failed to store language:', error);
  }
};

// Function to set app language
export const setAppLanguage = async (languageCode: string): Promise<void> => {
  i18n.locale = languageCode;
  await storeLanguage(languageCode);
};

// Function to initialize language on app start
export const initializeLanguage = async (): Promise<void> => {
  const storedLanguage = await getStoredLanguage();
  i18n.locale = storedLanguage;
};

// Translation function
export const t = (key: string, options?: object): string => {
  return i18n.t(key, options);
};

// Export i18n instance
export default i18n;