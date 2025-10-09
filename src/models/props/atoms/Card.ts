/**
 * Card Component Props
 *
 * Prop interface for the Card atom component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { CardVariant, SpacingSize } from '../../enums';

export interface CustomCardProps {
  /**
   * Visual variant of the card
   * @default 'default'
   */
  variant?: CardVariant;

  /**
   * Padding size for card content
   * @default 'medium'
   */
  padding?: SpacingSize;

  /**
   * Whether card is pressable
   * @default false
   */
  pressable?: boolean;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback when card is pressed
   */
  onPress?: () => void;

  /**
   * Card content
   */
  children: React.ReactNode;
}

