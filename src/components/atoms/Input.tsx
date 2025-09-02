/**
 * Input Component (Atom)
 *
 * A customizable input field component with consistent styling and behavior.
 * Built on top of react-native-elements Input with design system integration.
 *
 * @component
 * @example
 * // Basic input
 * <Input
 *   placeholder="Enter your name"
 *   variant="outlined"
 *   size="medium"
 * />
 *
 * // Input with label and error
 * <Input
 *   label="Email"
 *   placeholder="Enter your email"
 *   variant="filled"
 *   errorMessage="Invalid email format"
 * />
 *
 * @usage Used in:
 * - Form fields throughout the app
 * - Search inputs
 * - Text entry components
 * - Settings screens
 * - User input forms
 * - Login and registration screens
 */

import React from 'react';
import { TextStyle, ViewStyle } from 'react-native';
import { InputProps, Input as RNEInput } from 'react-native-elements';

import { Colors } from '@/constants/Colors';
import {
  BORDER_RADIUS,
  COMPONENT_DIMENSIONS,
  InputVariant,
  Size,
  TYPOGRAPHY,
} from '@/constants/design';

/**
 * Props for the Input component
 * @interface CustomInputProps
 * @extends InputProps from react-native-elements
 */
interface CustomInputProps extends InputProps {
  /**
   * Input visual variant
   * @default InputVariant.OUTLINED
   */
  variant?: InputVariant;

  /**
   * Input size affecting height and text size
   * @default Size.MEDIUM
   */
  size?: Size;

  /**
   * Additional container styles
   */
  containerStyle?: ViewStyle | ViewStyle[];

  /**
   * Additional input styles
   */
  inputStyle?: TextStyle | TextStyle[];

  /**
   * Additional input container styles
   */
  inputContainerStyle?: ViewStyle | ViewStyle[];

  /**
   * Label text for the input
   */
  label?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Error message to display
   */
  errorMessage?: string;
}

/**
 * Input component for consistent text input
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const Input: React.FC<CustomInputProps> = ({
  variant = InputVariant.OUTLINED,
  size = Size.MEDIUM,
  containerStyle,
  inputStyle,
  inputContainerStyle,
  label,
  placeholder,
  errorMessage,
  ...props
}) => {
  /**
   * Get variant-specific container styles
   * @returns ViewStyle object with variant styles
   */
  const getVariantContainerStyle = (): ViewStyle => {
    switch (variant) {
      case InputVariant.FILLED:
        return {
          backgroundColor: Colors.surface,
          borderRadius: BORDER_RADIUS.MD,
          borderWidth: 0,
        };
      case InputVariant.UNDERLINED:
        return {
          backgroundColor: Colors.transparent,
          borderRadius: 0,
          borderWidth: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border,
        };
      case InputVariant.OUTLINED:
      default:
        return {
          backgroundColor: Colors.transparent,
          borderRadius: BORDER_RADIUS.MD,
          borderWidth: 1,
          borderColor: Colors.border,
        };
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
          height: COMPONENT_DIMENSIONS.INPUT.HEIGHT - 8,
        };
      case Size.MEDIUM:
        return {
          height: COMPONENT_DIMENSIONS.INPUT.HEIGHT,
        };
      case Size.LARGE:
        return {
          height: COMPONENT_DIMENSIONS.INPUT.HEIGHT + 8,
        };
      default:
        return {
          height: COMPONENT_DIMENSIONS.INPUT.HEIGHT,
        };
    }
  };

  /**
   * Get input text style
   * @returns TextStyle object for input text
   */
  const getInputTextStyle = (): TextStyle => {
    return {
      ...TYPOGRAPHY.input,
      color: Colors.text,
    };
  };

  /**
   * Get label style
   * @returns TextStyle object for label
   */
  const getLabelStyle = (): TextStyle => {
    return {
      ...TYPOGRAPHY.label,
      color: Colors.textSecondary,
    };
  };

  return (
    <RNEInput
      containerStyle={[containerStyle]}
      inputContainerStyle={[
        {
          paddingHorizontal: COMPONENT_DIMENSIONS.INPUT.PADDING_HORIZONTAL,
          ...getVariantContainerStyle(),
          ...getSizeStyle(),
        },
        inputContainerStyle,
      ]}
      inputStyle={[getInputTextStyle(), inputStyle]}
      labelStyle={getLabelStyle()}
      label={label}
      placeholder={placeholder}
      placeholderTextColor={Colors.textTertiary}
      errorMessage={errorMessage}
      errorStyle={{
        ...TYPOGRAPHY.captionSmall,
        color: Colors.error,
      }}
      {...props}
    />
  );
};

export default Input;
