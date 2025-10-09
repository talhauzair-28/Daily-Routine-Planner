/**
 * Streaks Section Component Props
 *
 * Prop interface for the StreaksSection organism component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

import type { Streak } from '../../interfaces';

export interface StreaksSectionProps {
  /**
   * List of active streaks
   */
  streaks: Streak[];

  /**
   * Maximum number of streaks to display
   * @default 5
   */
  maxDisplayed?: number;

  /**
   * Whether to show streak targets
   * @default false
   */
  showTargets?: boolean;

  /**
   * Whether to show streak milestones
   * @default true
   */
  showMilestones?: boolean;

  /**
   * Callback when streak is pressed
   */
  onStreakPress?: (streakId: string) => void;

  /**
   * Callback when new streak is added
   */
  onAddStreak?: () => void;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

