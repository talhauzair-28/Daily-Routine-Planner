/**
 * Typography System
 *
 * This file defines the complete typography system for the Daily Routine Planner app.
 * It includes font families, sizes, weights, and line heights following Material Design principles.
 *
 * @fileoverview Typography definitions for consistent text styling
 * @author Daily Routine Planner Team
 * @version 1.0.0
 * @usage Import specific typography styles in components
 */

import { TextStyle } from 'react-native';

/**
 * Font family definitions
 * Using system fonts for better performance and consistency
 */
export const FONT_FAMILIES = {
  /** Primary font family - system default */
  PRIMARY: 'System',
  /** Secondary font family - for Arabic text */
  ARABIC: 'Arial', // You can replace with Arabic font
  /** Monospace font for code/numbers */
  MONOSPACE: 'Courier New',
} as const;

/**
 * Font weights following standard naming conventions
 */
export const FONT_WEIGHTS = {
  /** Light font weight - 300 */
  LIGHT: '300' as TextStyle['fontWeight'],
  /** Regular font weight - 400 */
  REGULAR: '400' as TextStyle['fontWeight'],
  /** Medium font weight - 500 */
  MEDIUM: '500' as TextStyle['fontWeight'],
  /** Semibold font weight - 600 */
  SEMIBOLD: '600' as TextStyle['fontWeight'],
  /** Bold font weight - 700 */
  BOLD: '700' as TextStyle['fontWeight'],
} as const;

/**
 * Font sizes following 8px grid system
 */
export const FONT_SIZES = {
  /** Extra small text - 10px */
  XS: 10,
  /** Small text - 12px */
  SM: 12,
  /** Base text size - 14px */
  BASE: 14,
  /** Medium text - 16px */
  MD: 16,
  /** Large text - 18px */
  LG: 18,
  /** Extra large text - 20px */
  XL: 20,
  /** 2X large text - 24px */
  '2XL': 24,
  /** 3X large text - 28px */
  '3XL': 28,
  /** 4X large text - 32px */
  '4XL': 32,
  /** 5X large text - 36px */
  '5XL': 36,
  /** 6X large text - 40px */
  '6XL': 40,
} as const;

/**
 * Line heights for optimal readability
 */
export const LINE_HEIGHTS = {
  /** Tight line height - 1.2 */
  TIGHT: 1.2,
  /** Normal line height - 1.4 */
  NORMAL: 1.4,
  /** Relaxed line height - 1.6 */
  RELAXED: 1.6,
  /** Loose line height - 1.8 */
  LOOSE: 1.8,
} as const;

/**
 * Typography variants for different text elements
 * Each variant includes fontSize, lineHeight, and fontWeight
 */
export const TYPOGRAPHY_VARIANTS = {
  /** Main page heading - H1 */
  h1: {
    fontSize: FONT_SIZES['4XL'],
    lineHeight: FONT_SIZES['4XL'] * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Section heading - H2 */
  h2: {
    fontSize: FONT_SIZES['3XL'],
    lineHeight: FONT_SIZES['3XL'] * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.BOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Subsection heading - H3 */
  h3: {
    fontSize: FONT_SIZES['2XL'],
    lineHeight: FONT_SIZES['2XL'] * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Card title - H4 */
  h4: {
    fontSize: FONT_SIZES.XL,
    lineHeight: FONT_SIZES.XL * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.SEMIBOLD,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Small heading - H5 */
  h5: {
    fontSize: FONT_SIZES.LG,
    lineHeight: FONT_SIZES.LG * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Smallest heading - H6 */
  h6: {
    fontSize: FONT_SIZES.MD,
    lineHeight: FONT_SIZES.MD * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Large body text */
  bodyLarge: {
    fontSize: FONT_SIZES.MD,
    lineHeight: FONT_SIZES.MD * LINE_HEIGHTS.RELAXED,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Regular body text */
  body: {
    fontSize: FONT_SIZES.BASE,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.RELAXED,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Small body text */
  bodySmall: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Caption text */
  caption: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Small caption text */
  captionSmall: {
    fontSize: FONT_SIZES.XS,
    lineHeight: FONT_SIZES.XS * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Button text */
  button: {
    fontSize: FONT_SIZES.BASE,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Large button text */
  buttonLarge: {
    fontSize: FONT_SIZES.MD,
    lineHeight: FONT_SIZES.MD * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Small button text */
  buttonSmall: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Input label text */
  label: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Input text */
  input: {
    fontSize: FONT_SIZES.BASE,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Tab text */
  tab: {
    fontSize: FONT_SIZES.SM,
    lineHeight: FONT_SIZES.SM * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
  /** Badge text */
  badge: {
    fontSize: FONT_SIZES.XS,
    lineHeight: FONT_SIZES.XS * LINE_HEIGHTS.TIGHT,
    fontWeight: FONT_WEIGHTS.MEDIUM,
    fontFamily: FONT_FAMILIES.PRIMARY,
  },
} as const;

/**
 * Special typography for Islamic/Arabic content
 */
export const ARABIC_TYPOGRAPHY = {
  /** Arabic Quran text */
  quranArabic: {
    fontSize: FONT_SIZES.LG,
    lineHeight: FONT_SIZES.LG * LINE_HEIGHTS.LOOSE,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.ARABIC,
    textAlign: 'right' as TextStyle['textAlign'],
  },
  /** Arabic prayer text */
  prayerArabic: {
    fontSize: FONT_SIZES.MD,
    lineHeight: FONT_SIZES.MD * LINE_HEIGHTS.RELAXED,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.ARABIC,
    textAlign: 'right' as TextStyle['textAlign'],
  },
  /** Arabic zikr text */
  zikrArabic: {
    fontSize: FONT_SIZES.BASE,
    lineHeight: FONT_SIZES.BASE * LINE_HEIGHTS.NORMAL,
    fontWeight: FONT_WEIGHTS.REGULAR,
    fontFamily: FONT_FAMILIES.ARABIC,
    textAlign: 'center' as TextStyle['textAlign'],
  },
} as const;

/**
 * Combined typography system
 */
export const TYPOGRAPHY = {
  ...TYPOGRAPHY_VARIANTS,
  ...ARABIC_TYPOGRAPHY,
} as const;

/**
 * Typography variant keys type
 */
export type TypographyVariant = keyof typeof TYPOGRAPHY;

/**
 * Utility function to get typography style
 * @param variant - Typography variant name
 * @returns TextStyle object for the variant
 */
export const getTypographyStyle = (variant: TypographyVariant): TextStyle => {
  return TYPOGRAPHY[variant];
};
