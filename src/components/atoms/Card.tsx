/**
 * Card Component (Atom)
 *
 * A flexible card container component with consistent styling and elevation.
 * Built on top of react-native-elements Card with design system integration.
 *
 * @component
 * @example
 * // Basic card
 * <Card variant="elevated" padding="MD">
 *   <Text>Card content</Text>
 * </Card>
 *
 * // Outlined card with custom padding
 * <Card variant="outlined" padding="LG">
 *   <Text>Outlined card content</Text>
 * </Card>
 *
 * @usage Used in:
 * - Content containers throughout the app
 * - Prayer time displays
 * - Quality rating sections
 * - Molecules: ScoreCard, ActivityItem
 * - Organisms: DashboardHeader, PrayersSection, StreaksSection
 * - Screens: All screens for content organization
 */

import React from 'react';
import { View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import {
  CardVariant,
  COMPONENT_DIMENSIONS,
  SHADOWS,
  SPACING,
  SpacingSize,
} from '@/constants/design';

/**
 * Props for the Card component
 * @interface CustomCardProps
 * @extends CardProps from react-native-elements
 */
interface CustomCardProps {
  /**
   * Card visual variant affecting elevation and borders
   * @default CardVariant.DEFAULT
   */
  variant?: CardVariant;

  /**
   * Internal padding using design system spacing
   * @default SpacingSize.MD
   */
  padding?: 'none' | SpacingSize;

  /**
   * Additional container styles
   */
  containerStyle?: ViewStyle | ViewStyle[];

  /**
   * Card content
   */
  children?: React.ReactNode;

  /**
   * Additional style for the card container (alias for containerStyle)
   */
  style?: ViewStyle | ViewStyle[];
}

/**
 * Card component for consistent content containers
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const Card: React.FC<CustomCardProps> = ({
  variant = CardVariant.DEFAULT,
  padding = SpacingSize.MD,
  containerStyle,
  children,
  style,
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
   * Get variant-specific styles for elevation and borders
   * @returns ViewStyle object with variant styles
   */
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case CardVariant.ELEVATED:
        return SHADOWS.LG;
      case CardVariant.OUTLINED:
        return {
          borderWidth: 1,
          borderColor: Colors.border,
          ...SHADOWS.NONE,
        };
      default:
        return SHADOWS.MD;
    }
  };

  /**
   * Get padding value from design system
   * @returns ViewStyle object with padding
   */
  const getPaddingStyle = (): ViewStyle => {
    if (padding === 'none') {
      return { padding: 0 };
    }
    return {
      padding:
        SPACING[padding as keyof typeof SPACING] ||
        COMPONENT_DIMENSIONS.CARD.PADDING,
    };
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
    <View
      style={[
        {
          backgroundColor: Colors.cardBackground,
          borderRadius: COMPONENT_DIMENSIONS.CARD.BORDER_RADIUS,
          margin: COMPONENT_DIMENSIONS.CARD.MARGIN,
          ...getVariantStyle(),
          ...getPaddingStyle(),
        },
        containerStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default Card;
