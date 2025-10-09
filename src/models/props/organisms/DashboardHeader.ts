/**
 * Dashboard Header Component Props
 *
 * Prop interface for the DashboardHeader organism component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import { WorkType } from '../../enums';

export interface DashboardHeaderProps {
  /**
   * User's name for greeting
   */
  userName?: string;

  /**
   * Current date for display
   */
  currentDate: string;

  /**
   * Today's work type
   */
  workType: WorkType;

  /**
   * Overall discipline score
   */
  overallScore: number;

  /**
   * Maximum possible score
   */
  maxScore: number;

  /**
   * Whether to show motivational message
   * @default true
   */
  showMotivation?: boolean;

  /**
   * Callback when header is pressed
   */
  onPress?: () => void;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

