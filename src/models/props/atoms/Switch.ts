/**
 * Switch Component Props
 *
 * Prop interface for the Switch atom component
 */
import React from 'react';
import { ViewStyle } from 'react-native';
import { SwitchProps } from 'react-native';

export interface CustomSwitchProps extends SwitchProps {
  /**
   * Whether switch is enabled/disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Switch value
   */
  value: boolean;

  /**
   * Callback when switch value changes
   */
  onValueChange: (value: boolean) => void;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

