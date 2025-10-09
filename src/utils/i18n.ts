import { t, setAppLanguage, initializeLanguage, availableLocales } from '../assets/i18n';

// Re-export translation function for easy import throughout the app
export { t, setAppLanguage, initializeLanguage, availableLocales };

// Helper function to translate with fallback
export const translate = (key: string, fallback?: string, options?: object): string => {
  const translated = t(key, options);
  
  // If translation is not found and fallback is provided, return fallback
  if (translated === key && fallback) {
    return fallback;
  }
  
  return translated;
};

// Helper function to get current language
export const getCurrentLanguage = (): string => {
  const { locale } = require('../assets/i18n').default;
  return locale;
};

// Helper function to check if current language is RTL
export const isRTL = (): boolean => {
  const currentLang = getCurrentLanguage();
  const rtlLanguages = ['ur', 'ar', 'he', 'fa'];
  return rtlLanguages.includes(currentLang);
};

// Helper function to get language name by code
export const getLanguageName = (code: string): string => {
  const locale = availableLocales.find(l => l.code === code);
  return locale ? locale.name : code;
};

// Helper function to get native language name by code
export const getNativeLanguageName = (code: string): string => {
  const locale = availableLocales.find(l => l.code === code);
  return locale ? locale.nativeName : code;
};