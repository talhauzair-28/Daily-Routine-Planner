/**
 * Family Time Section Component Props
 *
 * Prop interface for the FamilyTimeSection organism component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

export interface FamilyTimeSectionProps {
  /**
   * Family time activities for today
   */
  familyTime: Array<{
    id: string;
    timeSlot: string;
    duration: number;
    activities: string[];
    quality: number;
    completed: boolean;
  }>;

  /**
   * Whether to show quality ratings
   * @default true
   */
  showQuality?: boolean;

  /**
   * Whether to show duration information
   * @default true
   */
  showDuration?: boolean;

  /**
   * Whether to show activity list
   * @default true
   */
  showActivities?: boolean;

  /**
   * Callback when family time item is pressed
   */
  onItemPress?: (itemId: string) => void;

  /**
   * Callback when quality changes
   */
  onQualityChange?: (itemId: string, quality: number) => void;

  /**
   * Callback when completion changes
   */
  onCompletionChange?: (itemId: string, completed: boolean) => void;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

