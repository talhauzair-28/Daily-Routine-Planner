/**
 * Dimensions System
 *
 * This file defines all spacing, sizing, and dimensional values used throughout the app.
 * Following 8px grid system for consistent spacing and sizing.
 *
 * @fileoverview Dimension definitions for consistent spacing and sizing
 * @author Daily Routine Planner Team
 * @version 1.0.0
 * @usage Import specific dimensions in components for consistent spacing
 */

/**
 * Base spacing unit - 8px
 * All spacing should be multiples of this value
 */
export const SPACING_UNIT = 8;

/**
 * Spacing scale following 8px grid system
 */
export const SPACING = {
  /** No spacing - 0px */
  NONE: 0,
  /** Extra small spacing - 4px */
  XS: SPACING_UNIT * 0.5,
  /** Small spacing - 8px */
  SM: SPACING_UNIT,
  /** Medium spacing - 16px */
  MD: SPACING_UNIT * 2,
  /** Large spacing - 24px */
  LG: SPACING_UNIT * 3,
  /** Extra large spacing - 32px */
  XL: SPACING_UNIT * 4,
  /** 2X large spacing - 40px */
  '2XL': SPACING_UNIT * 5,
  /** 3X large spacing - 48px */
  '3XL': SPACING_UNIT * 6,
  /** 4X large spacing - 56px */
  '4XL': SPACING_UNIT * 7,
  /** 5X large spacing - 64px */
  '5XL': SPACING_UNIT * 8,
} as const;

/**
 * Icon sizes for consistent icon scaling
 */
export const ICON_SIZES = {
  /** Extra small icon - 12px */
  XS: 12,
  /** Small icon - 16px */
  SM: 16,
  /** Medium icon - 20px */
  MD: 20,
  /** Large icon - 24px */
  LG: 24,
  /** Extra large icon - 32px */
  XL: 32,
  /** 2X large icon - 40px */
  '2XL': 40,
  /** 3X large icon - 48px */
  '3XL': 48,
  /** 4X large icon - 56px */
  '4XL': 56,
  /** 5X large icon - 64px */
  '5XL': 64,
} as const;

/**
 * Border radius values for consistent rounded corners
 */
export const BORDER_RADIUS = {
  /** No border radius - 0px */
  NONE: 0,
  /** Small border radius - 4px */
  SM: 4,
  /** Medium border radius - 8px */
  MD: 8,
  /** Large border radius - 12px */
  LG: 12,
  /** Extra large border radius - 16px */
  XL: 16,
  /** 2X large border radius - 24px */
  '2XL': 24,
  /** Full circle border radius - 9999px */
  FULL: 9999,
} as const;

/**
 * Component specific dimensions
 */
export const COMPONENT_DIMENSIONS = {
  /** Button dimensions */
  BUTTON: {
    /** Small button height */
    HEIGHT_SM: 32,
    /** Medium button height */
    HEIGHT_MD: 40,
    /** Large button height */
    HEIGHT_LG: 48,
    /** Button horizontal padding */
    PADDING_HORIZONTAL: SPACING.MD,
    /** Button vertical padding */
    PADDING_VERTICAL: SPACING.SM,
  },
  /** Input field dimensions */
  INPUT: {
    /** Input field height */
    HEIGHT: 48,
    /** Input horizontal padding */
    PADDING_HORIZONTAL: SPACING.MD,
    /** Input vertical padding */
    PADDING_VERTICAL: SPACING.SM,
  },
  /** Card dimensions */
  CARD: {
    /** Card padding */
    PADDING: SPACING.MD,
    /** Card margin */
    MARGIN: SPACING.SM,
    /** Card border radius */
    BORDER_RADIUS: BORDER_RADIUS.LG,
    /** Card elevation (shadow) */
    ELEVATION: 3,
  },
  /** Badge dimensions */
  BADGE: {
    /** Small badge size */
    SIZE_SM: 16,
    /** Medium badge size */
    SIZE_MD: 20,
    /** Large badge size */
    SIZE_LG: 24,
    /** Badge padding */
    PADDING: SPACING.XS,
  },
  /** Avatar/Profile picture dimensions */
  AVATAR: {
    /** Small avatar size */
    SIZE_SM: 32,
    /** Medium avatar size */
    SIZE_MD: 40,
    /** Large avatar size */
    SIZE_LG: 48,
    /** Extra large avatar size */
    SIZE_XL: 64,
  },
  /** Progress bar dimensions */
  PROGRESS_BAR: {
    /** Progress bar height */
    HEIGHT: 8,
    /** Progress bar border radius */
    BORDER_RADIUS: BORDER_RADIUS.SM,
  },
  /** Switch dimensions */
  SWITCH: {
    /** Switch width */
    WIDTH: 48,
    /** Switch height */
    HEIGHT: 24,
    /** Switch thumb size */
    THUMB_SIZE: 20,
  },
} as const;

/**
 * Screen layout dimensions
 */
export const LAYOUT = {
  /** Screen padding */
  SCREEN_PADDING: SPACING.MD,
  /** Section spacing */
  SECTION_SPACING: SPACING.LG,
  /** Header height */
  HEADER_HEIGHT: 56,
  /** Tab bar height */
  TAB_BAR_HEIGHT: 48,
  /** Floating action button size */
  FAB_SIZE: 56,
  /** Minimum touch target size */
  TOUCH_TARGET_SIZE: 44,
} as const;

/**
 * Grid system dimensions
 */
export const GRID = {
  /** Container max width */
  CONTAINER_MAX_WIDTH: 1200,
  /** Grid gutter (spacing between columns) */
  GUTTER: SPACING.MD,
  /** Grid columns */
  COLUMNS: 12,
} as const;

/**
 * Shadow/Elevation values - Cross-platform shadow system
 * 
 * Provides consistent shadows across iOS and Android platforms.
 * iOS uses shadowColor, shadowOffset, shadowOpacity, and shadowRadius.
 * Android uses elevation for Material Design shadows.
 * 
 * Usage: Apply entire shadow object to style for cross-platform compatibility.
 * Example: ...SHADOWS.MD
 */
export const SHADOWS = {
  /** No shadow - Elevation 0 */
  NONE: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  /** Extra small shadow - Elevation 1 */
  XS: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 1,
    elevation: 1,
  },
  /** Small shadow - Elevation 2 */
  SM: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  /** Medium shadow - Elevation 3 (Most commonly used for cards) */
  MD: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 3,
  },
  /** Large shadow - Elevation 4 */
  LG: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  /** Extra large shadow - Elevation 6 */
  XL: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  },
  /** 2X large shadow - Elevation 8 */
  '2XL': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  /** 3X large shadow - Elevation 12 */
  '3XL': {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
  /** Maximum shadow - Elevation 16 */
  MAX: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
} as const;

/**
 * Elevation levels mapping to common use cases
 * 
 * Quick reference for appropriate elevation levels:
 * - FLAT: No elevation (0) - Text, icons, dividers
 * - RAISED: Minimal elevation (1) - Buttons in resting state
 * - CARD: Standard card elevation (3) - Cards, dialogs at rest
 * - FLOATING: Floating elements (4-6) - App bars, floating action buttons
 * - MODAL: Modal/overlay elevation (8) - Navigation drawers, modal dialogs
 * - POPUP: Highest elevation (12-16) - Tooltips, dropdown menus, snackbars
 */
export const ELEVATION = {
  /** No elevation - 0 */
  FLAT: SHADOWS.NONE,
  /** Minimal elevation - 1 */
  RAISED: SHADOWS.XS,
  /** Standard elevation - 2 */
  LOW: SHADOWS.SM,
  /** Card elevation - 3 (Most common for cards) */
  CARD: SHADOWS.MD,
  /** Button elevation - 4 */
  BUTTON: SHADOWS.LG,
  /** Floating element elevation - 6 */
  FLOATING: SHADOWS.XL,
  /** Modal elevation - 8 */
  MODAL: SHADOWS['2XL'],
  /** Popup elevation - 12 */
  POPUP: SHADOWS['3XL'],
  /** Maximum elevation - 16 */
  MAXIMUM: SHADOWS.MAX,
} as const;

/**
 * Islamic/Religious specific dimensions
 */
export const RELIGIOUS_DIMENSIONS = {
  /** Prayer time card dimensions */
  PRAYER_CARD: {
    HEIGHT: 80,
    PADDING: SPACING.MD,
    ICON_SIZE: ICON_SIZES.LG,
  },
  /** Zikr counter dimensions */
  ZIKR_COUNTER: {
    SIZE: 120,
    BORDER_WIDTH: 4,
    ICON_SIZE: ICON_SIZES.XL,
  },
  /** Streak badge dimensions */
  STREAK_BADGE: {
    HEIGHT: 32,
    PADDING: SPACING.SM,
    ICON_SIZE: ICON_SIZES.SM,
  },
  /** Quality rating dimensions */
  QUALITY_RATING: {
    STAR_SIZE: ICON_SIZES.MD,
    SPACING: SPACING.XS,
  },
} as const;

/**
 * All dimensions combined for easy access
 */
export const DIMENSIONS = {
  SPACING,
  ICON_SIZES,
  BORDER_RADIUS,
  COMPONENT_DIMENSIONS,
  LAYOUT,
  GRID,
  SHADOWS,
  ELEVATION,
  RELIGIOUS_DIMENSIONS,
} as const;

/**
 * Type definitions for dimension keys
 */
export type SpacingKey = keyof typeof SPACING;
export type IconSizeKey = keyof typeof ICON_SIZES;
export type BorderRadiusKey = keyof typeof BORDER_RADIUS;
