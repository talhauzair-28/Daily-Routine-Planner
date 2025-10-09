/**
 * Application Color System
 *
 * This file defines the complete color system for the Daily Routine Planner app.
 * All colors are derived from the base color palette to ensure consistency.
 *
 * @fileoverview Main color definitions using base colors
 * @author Daily Routine Planner Team
 * @version 1.0.0
 * @usage Import Colors object in components for consistent theming
 */

import { BASE_COLORS } from './design/BaseColors';
import { Category } from '../models/enums';

/**
 * Main application colors derived from base colors
 * Used throughout the app for consistent theming
 */
export const Colors = {
  // Primary brand colors
  /** Primary brand color - Islamic green */
  primary: BASE_COLORS.GREEN_500,
  /** Primary light variant */
  primaryLight: BASE_COLORS.GREEN_400,
  /** Primary dark variant */
  primaryDark: BASE_COLORS.GREEN_600,

  // Secondary colors
  /** Secondary brand color */
  secondary: BASE_COLORS.BLUE_500,
  /** Secondary light variant */
  secondaryLight: BASE_COLORS.BLUE_400,
  /** Secondary dark variant */
  secondaryDark: BASE_COLORS.BLUE_600,

  // Semantic colors
  /** Success state color */
  success: BASE_COLORS.SUCCESS,
  /** Warning state color */
  warning: BASE_COLORS.WARNING,
  /** Error state color */
  error: BASE_COLORS.ERROR,
  /** Info state color */
  info: BASE_COLORS.INFO,

  // Background colors
  /** Primary background color */
  background: BASE_COLORS.WHITE,
  /** Surface background color */
  surface: BASE_COLORS.GRAY_50,
  /** Card background color */
  cardBackground: BASE_COLORS.WHITE,

  // Text colors
  /** Primary text color */
  text: BASE_COLORS.GRAY_900,
  /** Secondary text color */
  textSecondary: BASE_COLORS.GRAY_600,
  /** Tertiary text color */
  textTertiary: BASE_COLORS.GRAY_500,
  /** Disabled text color */
  textDisabled: BASE_COLORS.GRAY_400,
  /** Text on primary color */
  textOnPrimary: BASE_COLORS.WHITE,
  /** Text on dark backgrounds */
  textOnDark: BASE_COLORS.WHITE,

  // Border colors
  /** Primary border color */
  border: BASE_COLORS.GRAY_200,
  /** Secondary border color */
  borderSecondary: BASE_COLORS.GRAY_300,
  /** Focused border color */
  borderFocused: BASE_COLORS.GREEN_500,

  // Quality rating colors
  /** Excellent quality (5 stars) */
  excellent: BASE_COLORS.EXCELLENT,
  /** Good quality (4 stars) */
  good: BASE_COLORS.GOOD,
  /** Average quality (3 stars) */
  average: BASE_COLORS.AVERAGE,
  /** Poor quality (2 stars) */
  poor: BASE_COLORS.POOR,
  /** Bad quality (1 star) */
  bad: BASE_COLORS.BAD,

  // Religious/Islamic colors
  /** Prayer time color */
  prayer: BASE_COLORS.PRAYER_BLUE,
  /** Quran recitation color */
  quran: BASE_COLORS.QURAN_GREEN,
  /** Zikr color */
  zikr: BASE_COLORS.ZIKR_PURPLE,
  /** Streak fire color */
  streak: BASE_COLORS.STREAK_ORANGE,
  /** Gold color for special occasions */
  gold: BASE_COLORS.GOLD,

  // Interactive states
  /** Pressed/active state */
  pressed: BASE_COLORS.GRAY_100,
  /** Hover state */
  hover: BASE_COLORS.GRAY_50,
  /** Focused state */
  focused: BASE_COLORS.GREEN_50,
  /** Selected state */
  selected: BASE_COLORS.GREEN_100,

  // Overlay colors
  /** Modal overlay */
  overlay: 'rgba(0, 0, 0, 0.5)',
  /** Light overlay */
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  /** Dark overlay */
  overlayDark: 'rgba(0, 0, 0, 0.7)',

  // Shadow colors
  /** Shadow color */
  shadow: BASE_COLORS.BLACK,

  // Islamic/Family colors
  /** Spiritual/Islamic color */
  spiritual: BASE_COLORS.ZIKR_PURPLE,
  /** Family/relationship color */
  family: BASE_COLORS.PINK, // Pink for family
  /** Accent color */
  accent: BASE_COLORS.WARNING, // Orange for accent

  // Special colors
  /** Transparent color */
  transparent: 'transparent',
  /** Pure white */
  white: BASE_COLORS.WHITE,
  /** Pure black */
  black: BASE_COLORS.BLACK,
} as const;

/**
 * Dark theme colors (for future dark mode support)
 */
export const DarkColors = {
  // Primary brand colors (same as light)
  primary: BASE_COLORS.GREEN_500,
  primaryLight: BASE_COLORS.GREEN_400,
  primaryDark: BASE_COLORS.GREEN_600,

  // Secondary colors (same as light)
  secondary: BASE_COLORS.BLUE_500,
  secondaryLight: BASE_COLORS.BLUE_400,
  secondaryDark: BASE_COLORS.BLUE_600,

  // Semantic colors (same as light)
  success: BASE_COLORS.SUCCESS,
  warning: BASE_COLORS.WARNING,
  error: BASE_COLORS.ERROR,
  info: BASE_COLORS.INFO,

  // Background colors (inverted)
  background: BASE_COLORS.GRAY_900,
  surface: BASE_COLORS.GRAY_800,
  cardBackground: BASE_COLORS.GRAY_800,

  // Text colors (inverted)
  text: BASE_COLORS.WHITE,
  textSecondary: BASE_COLORS.GRAY_300,
  textTertiary: BASE_COLORS.GRAY_400,
  textDisabled: BASE_COLORS.GRAY_500,
  textOnPrimary: BASE_COLORS.WHITE,
  textOnDark: BASE_COLORS.WHITE,

  // Border colors (adjusted for dark)
  border: BASE_COLORS.GRAY_700,
  borderSecondary: BASE_COLORS.GRAY_600,
  borderFocused: BASE_COLORS.GREEN_400,

  // Quality rating colors (same as light)
  excellent: BASE_COLORS.EXCELLENT,
  good: BASE_COLORS.GOOD,
  average: BASE_COLORS.AVERAGE,
  poor: BASE_COLORS.POOR,
  bad: BASE_COLORS.BAD,

  // Religious colors (same as light)
  prayer: BASE_COLORS.PRAYER_BLUE,
  quran: BASE_COLORS.QURAN_GREEN,
  zikr: BASE_COLORS.ZIKR_PURPLE,
  streak: BASE_COLORS.STREAK_ORANGE,
  gold: BASE_COLORS.GOLD,

  // Interactive states (adjusted for dark)
  pressed: BASE_COLORS.GRAY_700,
  hover: BASE_COLORS.GRAY_800,
  focused: BASE_COLORS.GREEN_600,
  selected: BASE_COLORS.GREEN_500,

  // Overlay colors (same as light)
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  overlayDark: 'rgba(0, 0, 0, 0.7)',

  // Shadow colors
  shadow: BASE_COLORS.BLACK,

  // Islamic/Family colors
  spiritual: BASE_COLORS.ZIKR_PURPLE,
  family: BASE_COLORS.PINK, // Pink for family
  accent: BASE_COLORS.WARNING, // Orange for accent

  // Special colors
  transparent: 'transparent',
  white: BASE_COLORS.WHITE,
  black: BASE_COLORS.BLACK,
} as const;

/**
 * Type for color keys
 */
export type ColorKey = keyof typeof Colors;
