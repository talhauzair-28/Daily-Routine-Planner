/**
 * Badge Component Props
 *
 * Prop interface for the Badge atom component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { BadgeVariant, Size } from '../../enums';

export interface CustomBadgeProps {
  /**
   * Visual variant of the badge
   * @default 'primary'
   */
  variant?: BadgeVariant;

  /**
   * Size of the badge
   * @default 'medium'
   */
  size?: Size;

  /**
   * Badge content/value
   */
  children: React.ReactNode;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

