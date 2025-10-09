/**
 * Streak Badge Component Props
 *
 * Prop interface for the StreakBadge molecule component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { Size } from '../../enums';

export interface StreakBadgeProps {
  /**
   * Current streak count
   */
  streak: number;

  /**
   * Target streak goal
   */
  target: number;

  /**
   * Habit name for display
   */
  habitName: string;

  /**
   * Whether streak is active
   * @default true
   */
  isActive?: boolean;

  /**
   * Size of the badge
   * @default Size.MEDIUM
   */
  size?: Size;

  /**
   * Whether to show streak count
   * @default true
   */
  showCount?: boolean;

  /**
   * Whether to show target
   * @default false
   */
  showTarget?: boolean;

  /**
   * Callback when badge is pressed
   */
  onPress?: () => void;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

