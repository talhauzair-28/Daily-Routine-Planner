/**
 * Exercise Section Component Props
 *
 * Prop interface for the ExerciseSection organism component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

export interface ExerciseSectionProps {
  /**
   * Exercise record for today
   */
  exercise: {
    warmup: { duration: number; completed: boolean };
    mainActivity: {
      duration: number;
      activity: string;
      intensity: 'Low' | 'Medium' | 'High';
      completed: boolean;
    };
    cooldown: { duration: number; completed: boolean };
    quality: number;
  };

  /**
   * Whether to show exercise details
   * @default true
   */
  showDetails?: boolean;

  /**
   * Whether to show quality rating
   * @default true
   */
  showQuality?: boolean;

  /**
   * Whether to show duration information
   * @default true
   */
  showDuration?: boolean;

  /**
   * Callback when exercise component is pressed
   */
  onComponentPress?: (component: 'warmup' | 'mainActivity' | 'cooldown') => void;

  /**
   * Callback when quality changes
   */
  onQualityChange?: (quality: number) => void;

  /**
   * Callback when completion changes
   */
  onCompletionChange?: (component: string, completed: boolean) => void;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

