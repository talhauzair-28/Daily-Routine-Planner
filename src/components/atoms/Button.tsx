/**
 * Button Component (Atom)
 *
 * A customizable button component with consistent styling and behavior.
 * Built on top of react-native-elements Button with design system integration.
 *
 * @component
 * @example
 * // Primary button
 * <Button variant="primary" size="large" onPress={handlePress}>
 *   Submit
 * </Button>
 *
 * // Secondary button with icon
 * <Button variant="secondary" size="medium" icon="check">
 *   Complete
 * </Button>
 *
 * @usage Used in:
 * - Form submissions and actions
 * - Navigation elements
 * - Call-to-action elements
 * - Molecules: NavigationButton
 * - Organisms: Throughout all organisms for user actions
 * - Screens: All screens for user interactions
 */

import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { ButtonProps, Button as RNEButton } from 'react-native-elements';

import { Colors } from '@/constants/Colors';
import {
  BORDER_RADIUS,
  ButtonVariant,
  COMPONENT_DIMENSIONS,
  Size,
  TYPOGRAPHY,
} from '@/constants/design';

/**
 * Props for the Button component
 * @interface CustomButtonProps
 * @extends ButtonProps from react-native-elements
 */
interface CustomButtonProps extends ButtonProps {
  /**
   * Button style variant
   * @default Variant.PRIMARY
   */
  variant?:
    | ButtonVariant.PRIMARY
    | ButtonVariant.SECONDARY
    | ButtonVariant.SUCCESS
    | ButtonVariant.WARNING
    | ButtonVariant.ERROR
    | ButtonVariant.OUTLINED;

  /**
   * Button size affecting padding and text size
   * @default Size.MEDIUM
   */
  size?: Size;

  /**
   * Additional button container styles
   */
  buttonStyle?: ViewStyle | ViewStyle[];

  /**
   * Additional title text styles
   */
  titleStyle?: TextStyle | TextStyle[];
}

/**
 * Button component for consistent user interactions
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const Button: React.FC<CustomButtonProps> = ({
  variant = ButtonVariant.PRIMARY,
  size = Size.MEDIUM,
  buttonStyle,
  titleStyle,
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
      case ButtonVariant.PRIMARY:
        return { backgroundColor: Colors.primary };
      case ButtonVariant.SECONDARY:
        return { backgroundColor: Colors.secondary };
      case ButtonVariant.SUCCESS:
        return { backgroundColor: Colors.success };
      case ButtonVariant.WARNING:
        return { backgroundColor: Colors.warning };
      case ButtonVariant.ERROR:
        return { backgroundColor: Colors.error };
      case ButtonVariant.OUTLINED:
        return { 
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Colors.primary 
        };
      default:
        return { backgroundColor: Colors.primary };
    }
  };

  /**
   * Get size-specific styles
   * @returns ViewStyle object with size-related styles
   */
  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case Size.SMALL:
        return {
          height: COMPONENT_DIMENSIONS.BUTTON.HEIGHT_SM,
          paddingHorizontal: COMPONENT_DIMENSIONS.BUTTON.PADDING_HORIZONTAL,
        };
      case Size.MEDIUM:
        return {
          height: COMPONENT_DIMENSIONS.BUTTON.HEIGHT_MD,
          paddingHorizontal: COMPONENT_DIMENSIONS.BUTTON.PADDING_HORIZONTAL,
        };
      case Size.LARGE:
        return {
          height: COMPONENT_DIMENSIONS.BUTTON.HEIGHT_LG,
          paddingHorizontal: COMPONENT_DIMENSIONS.BUTTON.PADDING_HORIZONTAL,
        };
      default:
        return {
          height: COMPONENT_DIMENSIONS.BUTTON.HEIGHT_MD,
          paddingHorizontal: COMPONENT_DIMENSIONS.BUTTON.PADDING_HORIZONTAL,
        };
    }
  };

  /**
   * Get title typography style based on size
   * @returns TextStyle object for title
   */
  const getTitleStyle = (): TextStyle => {
    switch (size) {
      case Size.SMALL:
        return TYPOGRAPHY.buttonSmall;
      case Size.MEDIUM:
        return TYPOGRAPHY.button;
      case Size.LARGE:
        return TYPOGRAPHY.buttonLarge;
      default:
        return TYPOGRAPHY.button;
    }
  };

  /**
   * Get title color based on variant
   * @returns Color string for title text
   */
  const getTitleColor = (): string => {
    switch (variant) {
      case ButtonVariant.OUTLINED:
        return Colors.primary;
      default:
        return Colors.textOnPrimary;
    }
  };

  return (
    <RNEButton
      buttonStyle={[
        {
          borderRadius: BORDER_RADIUS.MD,
          ...getVariantStyle(),
          ...getSizeStyle(),
        },
        buttonStyle,
      ]}
      titleStyle={[
        {
          color: getTitleColor(),
          ...getTitleStyle(),
        },
        titleStyle,
      ]}
      {...props}
    />
  );
};

export default Button;
