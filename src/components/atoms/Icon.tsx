/**
 * Icon Component (Atom)
 *
 * A standardized icon component using Material Community Icons with consistent sizing.
 * Provides predefined sizes from the design system and color integration.
 *
 * @component
 * @example
 * // Basic usage
 * <Icon name="home" size="MD" color="primary" />
 *
 * // Custom size
 * <Icon name="star" size={32} color="warning" />
 *
 * @usage Used in:
 * - Buttons for visual enhancement
 * - Navigation elements
 * - Status indicators
 * - Molecules: StreakBadge, ActivityItem
 * - Organisms: PrayersSection, DashboardHeader
 * - Throughout the app for visual communication
 */

import React from 'react';
import { ViewStyle } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Colors } from '@/constants/Colors';
import { ICON_SIZES, IconSize, IconSizeKey } from '@/constants/design';

/**
 * Props for the Icon component
 * @interface IconProps
 */
interface IconProps {
  /**
   * Material Community Icons name
   * @see https://materialdesignicons.com/
   */
  name: string;

  /**
   * Icon size - can be a predefined size key or custom number
   * @default IconSize.MD
   */
  size?: IconSize | number;

  /**
   * Icon color from design system or custom color string
   * @default 'text'
   */
  color?: keyof typeof Colors | string;

  /**
   * Additional styles for the icon
   */
  style?: ViewStyle;

  /**
   * Additional props passed to MaterialIcon
   */
  [key: string]: any;
}

/**
 * Icon component for consistent iconography
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const Icon: React.FC<IconProps> = ({
  name,
  size = IconSize.MD,
  color = 'text',
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
   * Get icon size value
   * @returns number - Size in pixels
   */
  const getIconSize = (): number => {
    if (typeof size === 'number') {
      return size;
    }
    return ICON_SIZES[size as IconSizeKey] || ICON_SIZES.MD;
  };

  /**
   * Get color value from design system or use custom color
   * @returns string - Color value
   */
  const getColorValue = (): string => {
    if (typeof color === 'string' && color.startsWith('#')) {
      return color; // Custom color
    }
    return Colors[color as keyof typeof Colors] || Colors.text;
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
    <MaterialIcon
      name={name}
      size={getIconSize()}
      color={getColorValue()}
      style={style}
      {...props}
    />
  );
};

export default Icon;
