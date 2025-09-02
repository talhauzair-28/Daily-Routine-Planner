/**
 * Discipline Score Board Component Props
 *
 * Prop interface for the DisciplineScoreBoard organism component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

export interface DisciplineScoreBoardProps {
  /**
   * Discipline scores for different categories
   */
  scores: {
    timing: number;
    spiritual: number;
    family: number;
    personal: number;
    total: number;
  };

  /**
   * Maximum possible score per category
   */
  maxScores: {
    timing: number;
    spiritual: number;
    family: number;
    personal: number;
  };

  /**
   * Whether to show category breakdown
   * @default true
   */
  showBreakdown?: boolean;

  /**
   * Whether to show progress bars
   * @default true
   */
  showProgress?: boolean;

  /**
   * Whether to show motivational messages
   * @default true
   */
  showMotivation?: boolean;

  /**
   * Callback when score card is pressed
   */
  onScorePress?: (category: string) => void;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

