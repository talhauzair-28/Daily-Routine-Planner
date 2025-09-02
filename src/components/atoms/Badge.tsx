/**
 * Badge Component (Atom)
 *
 * A small status indicator component for displaying counts, statuses, or labels.
 * Built on top of react-native-elements Badge with design system integration.
 *
 * @component
 * @example
 * // Status badge
 * <Badge variant="success" size="medium" value="5" />
 *
 * // Streak counter badge
 * <Badge variant="warning" size="large" value="30 days" />
 *
 * @usage Used in:
 * - Status indicators
 * - Notification counts
 * - Streak counters
 * - Quality ratings
 * - Molecules: StreakBadge, ActivityItem
 * - Organisms: DashboardHeader, StreaksSection
 * - Screens: HomeScreen, TodayScreen for status display
 */

import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { BadgeProps, Badge as RNEBadge } from 'react-native-elements';

import { Colors } from '@/constants/Colors';
import {
  BadgeVariant,
  BORDER_RADIUS,
  COMPONENT_DIMENSIONS,
  Size,
  TYPOGRAPHY,
} from '@/constants/design';

/**
 * Props for the Badge component
 * @interface CustomBadgeProps
 * @extends BadgeProps from react-native-elements
 */
interface CustomBadgeProps extends BadgeProps {
  /**
   * Badge color variant
   * @default BadgeVariant.PRIMARY
   */
  variant?: BadgeVariant;

  /**
   * Badge size affecting dimensions and text size
   * @default Size.MEDIUM
   */
  size?: Size;

  /**
   * Additional badge container styles
   */
  badgeStyle?: ViewStyle | ViewStyle[];

  /**
   * Additional text styles
   */
  textStyle?: TextStyle | TextStyle[];

  /**
   * Badge content/value
   */
  value?: string | number;

  /**
   * Additional style for the badge container (alias for badgeStyle)
   */
  style?: ViewStyle | ViewStyle[];
}

/**
 * Badge component for status indicators and labels
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const Badge: React.FC<CustomBadgeProps> = ({
  variant = BadgeVariant.PRIMARY,
  size = Size.MEDIUM,
  badgeStyle,
  textStyle,
  value,
  style,
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
   * Get background color based on variant
   * @returns ViewStyle object with backgroundColor
   */
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case BadgeVariant.PRIMARY:
        return { backgroundColor: Colors.primary };
      case BadgeVariant.SECONDARY:
        return { backgroundColor: Colors.secondary };
      case BadgeVariant.SUCCESS:
        return { backgroundColor: Colors.success };
      case BadgeVariant.WARNING:
        return { backgroundColor: Colors.warning };
      case BadgeVariant.ERROR:
        return { backgroundColor: Colors.error };
      case BadgeVariant.STREAK:
        return { backgroundColor: Colors.streak };
      case BadgeVariant.PRAYER:
        return { backgroundColor: Colors.prayer };
      case BadgeVariant.QURAN:
        return { backgroundColor: Colors.quran };
      case BadgeVariant.ZIKR:
        return { backgroundColor: Colors.zikr };
      default:
        return { backgroundColor: Colors.primary };
    }
  };

  /**
   * Get size-specific dimensions
   * @returns ViewStyle object with size-related styles
   */
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case Size.SMALL:
        return {
          minWidth: COMPONENT_DIMENSIONS.BADGE.SIZE_SM,
          height: COMPONENT_DIMENSIONS.BADGE.SIZE_SM,
        };
      case Size.MEDIUM:
        return {
          minWidth: COMPONENT_DIMENSIONS.BADGE.SIZE_MD,
          height: COMPONENT_DIMENSIONS.BADGE.SIZE_MD,
        };
      case Size.LARGE:
        return {
          minWidth: COMPONENT_DIMENSIONS.BADGE.SIZE_LG,
          height: COMPONENT_DIMENSIONS.BADGE.SIZE_LG,
        };
      default:
        return {
          minWidth: COMPONENT_DIMENSIONS.BADGE.SIZE_MD,
          height: COMPONENT_DIMENSIONS.BADGE.SIZE_MD,
        };
    }
  };

  /**
   * Get text style based on size
   * @returns TextStyle object for badge text
   */
  const getTextSizeStyle = (): TextStyle => {
    return {
      ...TYPOGRAPHY.badge,
      color: Colors.textOnPrimary,
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
    <RNEBadge
      badgeStyle={[
        {
          borderRadius: BORDER_RADIUS.FULL,
          padding: COMPONENT_DIMENSIONS.BADGE.PADDING,
          ...getVariantStyle(),
          ...getSizeStyle(),
        },
        badgeStyle,
        style,
      ]}
      textStyle={[getTextSizeStyle(), textStyle]}
      value={value}
      {...props}
    />
  );
};

export default Badge;
