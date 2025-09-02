/**
 * Star Rating Component Props
 *
 * Prop interface for the StarRating atom component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { Size } from '../../enums';

export interface StarRatingProps {
  /**
   * Current rating value (1-5)
   */
  rating: number;

  /**
   * Maximum rating value
   * @default 5
   */
  maxRating?: number;

  /**
   * Size of the stars
   * @default 'medium'
   */
  size?: Size;

  /**
   * Whether rating is editable
   * @default false
   */
  editable?: boolean;

  /**
   * Color of filled stars
   */
  starColor?: string;

  /**
   * Color of empty stars
   */
  emptyStarColor?: string;

  /**
   * Callback when rating changes
   */
  onRatingChange?: (rating: number) => void;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

