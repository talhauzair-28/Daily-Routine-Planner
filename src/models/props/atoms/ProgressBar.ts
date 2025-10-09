/**
 * Progress Bar Component Props
 *
 * Prop interface for the ProgressBar atom component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { ProgressVariant, Size } from '../../enums';

export interface ProgressBarProps {
  /**
   * Current progress value (0-100)
   */
  progress: number;

  /**
   * Visual variant of the progress bar
   * @default 'primary'
   */
  variant?: ProgressVariant;

  /**
   * Size of the progress bar
   * @default 'medium'
   */
  size?: Size;

  /**
   * Whether to show progress label
   * @default true
   */
  showLabel?: boolean;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

