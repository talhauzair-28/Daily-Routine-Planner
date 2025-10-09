/**
 * Prayers Section Component Props
 *
 * Prop interface for the PrayersSection organism component
 */
import React from 'react';
import { ViewStyle } from 'react-native';

export interface PrayersSectionProps {
  /**
   * List of prayers to display
   */
  prayers: Array<{
    id: string;
    name: string;
    targetTime: string;
    actualTime?: string;
    quality: number;
    completed: boolean;
  }>;

  /**
   * Whether to show quality ratings
   * @default true
   */
  showQuality?: boolean;

  /**
   * Whether to show time information
   * @default true
   */
  showTime?: boolean;

  /**
   * Whether to show completion status
   * @default true
   */
  showStatus?: boolean;

  /**
   * Callback when prayer is pressed
   */
  onPrayerPress?: (prayerId: string) => void;

  /**
   * Callback when prayer quality changes
   */
  onQualityChange?: (prayerId: string, quality: number) => void;

  /**
   * Callback when prayer completion changes
   */
  onCompletionChange?: (prayerId: string, completed: boolean) => void;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

