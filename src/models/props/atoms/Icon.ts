/**
 * Icon Component Props
 *
 * Prop interface for the Icon atom component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { Size } from '../../enums';

export interface IconProps {
  /**
   * Icon name from MaterialCommunityIcons
   */
  name: string;

  /**
   * Size of the icon
   * @default 'medium'
   */
  size?: Size;

  /**
   * Icon color
   */
  color?: string;

  /**
   * Additional icon styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback when icon is pressed
   */
  onPress?: () => void;
}

