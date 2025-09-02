/**
 * Button Component Props
 *
 * Prop interface for the Button atom component
 */
import React from 'react';
import { ViewStyle } from 'react-native';
import { ButtonProps } from 'react-native-elements';

import { ButtonVariant, Size } from '../../enums';

export interface CustomButtonProps extends ButtonProps {
  /**
   * Visual variant of the button
   * @default 'default'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default 'medium'
   */
  size?: Size;

  /**
   * Whether button is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback when button is pressed
   */
  onPress?: () => void;
}

