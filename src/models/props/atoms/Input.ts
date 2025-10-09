/**
 * Input Component Props
 *
 * Prop interface for the Input atom component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { InputVariant, Size } from '../../enums';

export interface CustomInputProps {
  /**
   * Visual variant of the input
   * @default 'outlined'
   */
  variant?: InputVariant;

  /**
   * Size of the input
   * @default 'medium'
   */
  size?: Size;

  /**
   * Whether input has an error
   * @default false
   */
  error?: boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Input label
   */
  label: string;

  /**
   * Input value
   */
  value: string;

  /**
   * Callback when input value changes
   */
  onChangeText: (text: string) => void;
}

