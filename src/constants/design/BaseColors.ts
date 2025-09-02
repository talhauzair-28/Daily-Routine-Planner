/**
 * Base Color Palette
 *
 * This file contains the fundamental color definitions used throughout the app.
 * All theme colors should be derived from these base colors.
 *
 * @fileoverview Base color definitions for the Daily Routine Planner app
 * @author Daily Routine Planner Team
 * @version 1.0.0
 */

/**
 * Primary brand colors - Islamic green theme
 */
export const PRIMARY_COLORS = {
  /** Main brand color - Islamic green */
  GREEN_500: '#2E7D32',
  /** Lighter variant of brand color */
  GREEN_400: '#4CAF50',
  /** Darker variant of brand color */
  GREEN_600: '#1B5E20',
  /** Very light brand color for backgrounds */
  GREEN_50: '#E8F5E8',
  /** Light brand color for subtle elements */
  GREEN_100: '#C8E6C9',
} as const;

export const COLOR_DUMP = {
  PINK: '#E91E63',
  ORANGE: '#FF9800',
  YELLOW: '#FFC107',
  GREEN: '#4CAF50',
  BLUE: '#1976D2',
  PURPLE: '#7B1FA2',
  RED: '#F44336',
  GRAY: '#9E9E9E',
  DARK_GRAY: '#616161',
  VERY_DARK_GRAY: '#424242',
  NEAR_BLACK: '#212121',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
};

/**
 * Secondary colors - Complementary to primary
 */
export const SECONDARY_COLORS = {
  /** Secondary brand color - Deep blue */
  BLUE_500: '#1976D2',
  /** Lighter secondary color */
  BLUE_400: '#2196F3',
  /** Darker secondary color */
  BLUE_600: '#1565C0',
  /** Light secondary background */
  BLUE_50: '#E3F2FD',
  /** Light secondary elements */
  BLUE_100: '#BBDEFB',
} as const;

/**
 * Semantic colors for status indication
 */
export const SEMANTIC_COLORS = {
  /** Success state color */
  SUCCESS: '#4CAF50',
  /** Warning state color */
  WARNING: '#FF9800',
  /** Error state color */
  ERROR: '#F44336',
  /** Info state color */
  INFO: '#2196F3',
} as const;

/**
 * Neutral colors for text and backgrounds
 */
export const NEUTRAL_COLORS = {
  /** Pure white */
  WHITE: '#FFFFFF',
  /** Pure black */
  BLACK: '#000000',
  /** Very light gray for backgrounds */
  GRAY_50: '#FAFAFA',
  /** Light gray for subtle backgrounds */
  GRAY_100: '#F5F5F5',
  /** Light gray for borders */
  GRAY_200: '#EEEEEE',
  /** Medium light gray */
  GRAY_300: '#E0E0E0',
  /** Medium gray for inactive elements */
  GRAY_400: '#BDBDBD',
  /** Medium dark gray for secondary text */
  GRAY_500: '#9E9E9E',
  /** Dark gray for secondary text */
  GRAY_600: '#757575',
  /** Darker gray for primary text */
  GRAY_700: '#616161',
  /** Very dark gray for headings */
  GRAY_800: '#424242',
  /** Near black for main text */
  GRAY_900: '#212121',
} as const;

/**
 * Special Islamic/Religious colors
 */
export const RELIGIOUS_COLORS = {
  /** Gold color for special occasions */
  GOLD: '#FFD700',
  /** Prayer time color */
  PRAYER_BLUE: '#1E88E5',
  /** Quran recitation color */
  QURAN_GREEN: '#388E3C',
  /** Zikr color */
  ZIKR_PURPLE: '#7B1FA2',
  /** Streak fire color */
  STREAK_ORANGE: '#FF5722',
} as const;

/**
 * Quality rating colors (star ratings)
 */
export const QUALITY_COLORS = {
  /** Excellent quality (5 stars) */
  EXCELLENT: '#4CAF50',
  /** Good quality (4 stars) */
  GOOD: '#8BC34A',
  /** Average quality (3 stars) */
  AVERAGE: '#FFC107',
  /** Poor quality (2 stars) */
  POOR: '#FF9800',
  /** Bad quality (1 star) */
  BAD: '#F44336',
} as const;

/**
 * All base colors combined for easy access
 */
export const BASE_COLORS = {
  ...PRIMARY_COLORS,
  ...SECONDARY_COLORS,
  ...SEMANTIC_COLORS,
  ...NEUTRAL_COLORS,
  ...RELIGIOUS_COLORS,
  ...QUALITY_COLORS,
  ...COLOR_DUMP,
} as const;

/**
 * Type for all available base colors
 */
export type BaseColorKey = keyof typeof BASE_COLORS;
