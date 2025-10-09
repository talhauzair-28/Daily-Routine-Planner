/**
 * Activity Item Component Props
 *
 * Prop interface for the ActivityItem molecule component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { Category } from '../../enums';

export interface ActivityItemProps {
  /**
   * Activity title/name
   */
  title: string;

  /**
   * Activity description or details
   */
  description?: string;

  /**
   * Activity status
   */
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';

  /**
   * Activity quality rating (1-5)
   */
  quality?: number;

  /**
   * Activity category
   */
  category: Category;

  /**
   * Whether to show quality rating
   * @default true
   */
  showQuality?: boolean;

  /**
   * Whether to show status indicator
   * @default true
   */
  showStatus?: boolean;

  /**
   * Callback when activity is pressed
   */
  onPress?: () => void;

  /**
   * Callback when quality changes
   */
  onQualityChange?: (quality: number) => void;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

