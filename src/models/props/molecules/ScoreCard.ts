/**
 * Score Card Component Props
 *
 * Prop interface for the ScoreCard molecule component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { Category } from '../../enums';

export interface ScoreCardProps {
  /**
   * Card title/label
   */
  title: string;

  /**
   * Current score value
   */
  score: number;

  /**
   * Maximum possible score
   */
  maxScore: number;

  /**
   * Optional subtitle or description
   */
  subtitle?: string;

  /**
   * Whether to show progress bar/indicator
   * @default true
   */
  showProgress?: boolean;

  /**
   * Visual variant of the score display
   * @default 'default'
   */
  variant?: 'default' | 'circular' | 'compact';

  /**
   * Score category for contextual styling
   * @default Category.GENERAL
   */
  category?: Category;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback when card is pressed
   */
  onPress?: () => void;
}

