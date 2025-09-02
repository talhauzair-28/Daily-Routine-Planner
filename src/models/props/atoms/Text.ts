/**
 * Text Component Props
 *
 * Prop interface for the Text atom component
 */
import React from 'react';
import { ViewStyle, TextProps as RNTextProps } from 'react-native';

export interface CustomTextProps extends RNTextProps {
  /**
   * Typography variant for consistent styling
   */
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'bodySmall' | 'caption' | 'captionSmall';

  /**
   * Text color from design system
   */
  color?: keyof typeof import('@/constants/Colors').Colors;

  /**
   * Additional text styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Text content
   */
  children: React.ReactNode;
}

