/**
 * Text Component (Atom)
 *
 * A customizable text component that provides consistent typography throughout the app.
 * Built on top of react-native-elements Text with design system integration.
 *
 * @component
 * @example
 * // Basic usage
 * <Text variant="h1" color="primary">Welcome</Text>
 *
 * // With custom styling
 * <Text variant="body" color="textSecondary" weight="bold">
 *   Secondary text
 * </Text>
 *
 * @usage Used in:
 * - All text display throughout the app
 * - Molecules: QualityRater, StreakBadge, ScoreCard, ActivityItem
 * - Organisms: DashboardHeader, PrayersSection, StreaksSection, DisciplineScoreBoard
 * - Screens: HomeScreen, TodayScreen, and all other screens
 */

import React from 'react';
import { TextStyle } from 'react-native';
import { Text as RNEText, TextProps } from 'react-native-elements';

import { Colors } from '@/constants/Colors';
import { TYPOGRAPHY, TypographyVariant } from '@/constants/design';

/**
 * Props for the Text component
 * @interface CustomTextProps
 * @extends TextProps from react-native-elements
 */
interface CustomTextProps extends TextProps {
  /**
   * Typography variant defining size, weight, and line height
   * @default TypographyVariant.BODY
   */
  variant?: TypographyVariant;

  /**
   * Text color from the design system
   * @default 'text'
   */
  color?: keyof typeof Colors;

  /**
   * Additional text styles
   */
  style?: TextStyle | TextStyle[];

  /**
   * Text content
   */
  children?: React.ReactNode;
}

/**
 * Text component for consistent typography
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const Text: React.FC<CustomTextProps> = ({
  variant = 'body',
  color = 'text',
  style,
  children,
  ...props
}) => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  // (No state variables in this component)

  // ==========================================
  // Hooks/Custom Hooks
  // ==========================================
  // (No hooks in this component)

  // ==========================================
  // Use Effects
  // ==========================================
  // (No useEffect in this component)

  // ==========================================
  // Helper Methods
  // ==========================================
  /**
   * Get typography style from design system
   * @returns TextStyle object for the variant
   */
  const getTypographyStyle = (): TextStyle => {
    return TYPOGRAPHY[variant] || TYPOGRAPHY.body;
  };

  /**
   * Get color value from design system
   * @returns Color string
   */
  const getColorValue = (): string => {
    return Colors[color] || Colors.text;
  };

  // ==========================================
  // Event Handlers
  // ==========================================
  // (Event handlers are passed as props in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  // (No separate render methods in this component)

  // ==========================================
  // Return
  // ==========================================
  return (
    <RNEText
      style={[getTypographyStyle(), { color: getColorValue() }, style]}
      {...props}
    >
      {children}
    </RNEText>
  );
};

export default Text;
