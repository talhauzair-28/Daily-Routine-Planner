/**
 * Switch Component (Atom)
 *
 * A customizable toggle switch component with consistent styling.
 * Built on top of React Native Switch with design system integration.
 *
 * @component
 * @example
 * // Basic switch
 * <Switch
 *   value={isEnabled}
 *   onValueChange={setIsEnabled}
 * />
 *
 * // Themed switch with custom colors
 * <Switch
 *   value={prayerNotifications}
 *   onValueChange={setPrayerNotifications}
 *   variant="prayer"
 *   size="large"
 * />
 *
 * @usage Used in:
 * - Settings screens
 * - Preference toggles
 * - Feature enable/disable
 * - Notification settings
 * - Prayer time settings
 * - Habit tracking options
 */

import React from 'react';
import { Switch as RNSwitch, SwitchProps, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import { BadgeVariant, Size } from '@/constants/design';

/**
 * Props for the Switch component
 * @interface CustomSwitchProps
 * @extends SwitchProps from react-native
 */
interface CustomSwitchProps extends SwitchProps {
  /**
   * Switch color variant
   * @default BadgeVariant.PRIMARY
   */
  variant?: BadgeVariant;

  /**
   * Switch size
   * @default Size.MEDIUM
   */
  size?: Size;

  /**
   * Switch value (controlled component)
   */
  value?: boolean;

  /**
   * Callback when switch value changes
   */
  onValueChange?: (value: boolean) => void;

  /**
   * Additional styles for the switch container
   */
  style?: ViewStyle | ViewStyle[];
}

/**
 * Switch component for toggle controls
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const Switch: React.FC<CustomSwitchProps> = ({
  variant = BadgeVariant.PRIMARY,
  size = Size.MEDIUM,
  trackColor,
  thumbColor,
  value,
  onValueChange,
  style,
  ...props
}) => {
  /**
   * Get active track color based on variant
   * @returns string - Track color when switch is on
   */
  const getActiveTrackColor = (): string => {
    switch (variant) {
      case BadgeVariant.SECONDARY:
        return Colors.secondary;
      case BadgeVariant.SUCCESS:
        return Colors.success;
      case BadgeVariant.PRAYER:
        return Colors.prayer;
      case BadgeVariant.QURAN:
        return Colors.quran;
      case BadgeVariant.ZIKR:
        return Colors.zikr;
      case BadgeVariant.PRIMARY:
      default:
        return Colors.primary;
    }
  };

  /**
   * Get size-specific transform styles
   * @returns ViewStyle object with transform
   */
  const getSizeTransform = (): ViewStyle => {
    switch (size) {
      case Size.SMALL:
        return {
          transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
        };
      case Size.MEDIUM:
        return {};
      case Size.LARGE:
        return {
          transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
        };
      default:
        return {};
    }
  };

  /**
   * Get track colors for on/off states
   * @returns Object with track colors
   */
  const getTrackColors = () => {
    return {
      false: Colors.border,
      true: getActiveTrackColor(),
      ...trackColor,
    };
  };

  /**
   * Get thumb color
   * @returns string - Thumb color
   */
  const getThumbColor = (): string => {
    return (thumbColor as string) || Colors.white;
  };

  return (
    <RNSwitch
      trackColor={getTrackColors()}
      thumbColor={getThumbColor()}
      value={value}
      onValueChange={onValueChange}
      style={[getSizeTransform(), style]}
      {...props}
    />
  );
};

export default Switch;
