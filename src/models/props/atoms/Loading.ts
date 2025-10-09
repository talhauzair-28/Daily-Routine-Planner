/**
 * Loading Component Props
 *
 * Prop interface for the Loading atom component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { Size } from '../../enums';

export interface LoadingProps {
  /**
   * Size of the loading indicator
   * @default 'medium'
   */
  size?: Size;

  /**
   * Loading message to display
   */
  message?: string;

  /**
   * Whether to show loading message
   * @default true
   */
  showMessage?: boolean;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

