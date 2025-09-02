/**
 * Quality Rater Component Props
 *
 * Prop interface for the QualityRater molecule component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { Category, Size } from '../../enums';

export interface QualityRaterProps {
  /**
   * Current quality rating (1-5)
   */
  quality: number;

  /**
   * Category for contextual styling
   * @default Category.GENERAL
   */
  category?: Category;

  /**
   * Whether rating is editable
   * @default false
   */
  editable?: boolean;

  /**
   * Size of the quality rater
   * @default Size.MEDIUM
   */
  size?: Size;

  /**
   * Callback when quality rating changes
   */
  onQualityChange?: (quality: number) => void;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

