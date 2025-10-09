/**
 * Design System Index
 *
 * Central export point for all design system tokens including colors, typography, dimensions, and enums.
 * This makes it easy to import design tokens throughout the application.
 *
 * @fileoverview Main export for design system tokens
 * @author Daily Routine Planner Team
 * @version 1.0.0
 * @usage Import design tokens from this central location
 */

// Export all base colors
export * from './BaseColors';

// Export typography system
export {
  FONT_FAMILIES,
  FONT_SIZES,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  TYPOGRAPHY,
} from './Typography';
export type { TypographyVariant } from './Typography';

// Export dimensions system
export * from './Dimensions';

// Re-export main colors for convenience
export { Colors, DarkColors } from '../Colors';

// Re-export enums for convenience
export * from '../../models/enums';
