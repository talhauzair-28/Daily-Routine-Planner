/**
 * ProgressBar Component (Atom)
 *
 * A customizable progress bar component for showing completion status.
 * Built with design system integration for consistent styling.
 *
 * @component
 * @example
 * // Basic progress bar
 * <ProgressBar progress={75} />
 *
 * // Custom styled progress bar
 * <ProgressBar
 *   progress={60}
 *   variant="success"
 *   size="large"
 *   showLabel={true}
 * />
 *
 * @usage Used in:
 * - Daily progress tracking
 * - Quality rating displays
 * - Habit completion indicators
 * - Goal achievement visualization
 * - Molecules: ScoreCard
 * - Organisms: DisciplineScoreBoard
 * - Screens: Analytics, Progress tracking
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import {
  COMPONENT_DIMENSIONS,
  ProgressVariant,
  Size,
  TYPOGRAPHY,
} from '@/constants/design';

import Text from './Text';

/**
 * Props for the ProgressBar component
 * @interface ProgressBarProps
 */
interface ProgressBarProps {
  /**
   * Progress value from 0 to 100
   */
  progress: number;

  /**
   * Progress bar color variant
   * @default ProgressVariant.PRIMARY
   */
  variant?: ProgressVariant;

  /**
   * Progress bar size
   * @default Size.MEDIUM
   */
  size?: Size;

  /**
   * Background color of the track
   * @default Colors.surface
   */
  backgroundColor?: keyof typeof Colors | string;

  /**
   * Whether to show progress label
   * @default false
   */
  showLabel?: boolean;

  /**
   * Custom label text (overrides default percentage)
   */
  label?: string;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Whether to animate progress changes
   * @default true
   */
  animated?: boolean;
}

/**
 * ProgressBar component for showing completion status
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  variant = ProgressVariant.PRIMARY,
  size = Size.MEDIUM,
  backgroundColor = 'surface',
  showLabel = false,
  label,
  style,
  animated = true,
}) => {
  /**
   * Clamp progress value between 0 and 100
   */
  const clampedProgress = Math.max(0, Math.min(100, progress));

  /**
   * Get progress color based on variant
   * @returns string - Color value
   */
  const getProgressColor = (): string => {
    switch (variant) {
      case ProgressVariant.SUCCESS:
        return Colors.success;
      case ProgressVariant.WARNING:
        return Colors.warning;
      case ProgressVariant.ERROR:
        return Colors.error;
      case ProgressVariant.EXCELLENT:
        return Colors.excellent;
      case ProgressVariant.GOOD:
        return Colors.good;
      case ProgressVariant.AVERAGE:
        return Colors.average;
      case ProgressVariant.POOR:
        return Colors.poor;
      case ProgressVariant.PRIMARY:
      default:
        return Colors.primary;
    }
  };

  /**
   * Get background color value
   * @returns string - Background color
   */
  const getBackgroundColor = (): string => {
    if (
      typeof backgroundColor === 'string' &&
      backgroundColor.startsWith('#')
    ) {
      return backgroundColor; // Custom color
    }
    return Colors[backgroundColor as keyof typeof Colors] || Colors.surface;
  };

  /**
   * Get height based on size
   * @returns number - Height in pixels
   */
  const getHeight = (): number => {
    switch (size) {
      case Size.SMALL:
        return COMPONENT_DIMENSIONS.PROGRESS_BAR.HEIGHT - 2;
      case Size.MEDIUM:
        return COMPONENT_DIMENSIONS.PROGRESS_BAR.HEIGHT;
      case Size.LARGE:
        return COMPONENT_DIMENSIONS.PROGRESS_BAR.HEIGHT + 4;
      default:
        return COMPONENT_DIMENSIONS.PROGRESS_BAR.HEIGHT;
    }
  };

  /**
   * Get display label
   * @returns string - Label to display
   */
  const getDisplayLabel = (): string => {
    return label || `${Math.round(clampedProgress)}%`;
  };

  return (
    <View style={[styles.wrapper, style]}>
      <View
        style={[
          styles.container,
          {
            height: getHeight(),
            backgroundColor: getBackgroundColor(),
            borderRadius: COMPONENT_DIMENSIONS.PROGRESS_BAR.BORDER_RADIUS,
          },
        ]}
      >
        <View
          style={[
            styles.progress,
            {
              width: `${clampedProgress}%`,
              backgroundColor: getProgressColor(),
              borderRadius: COMPONENT_DIMENSIONS.PROGRESS_BAR.BORDER_RADIUS,
            },
          ]}
        />
      </View>
      {showLabel && (
        <Text variant="captionSmall" color="textSecondary" style={styles.label}>
          {getDisplayLabel()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  container: {
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
  label: {
    textAlign: 'center',
    marginTop: 4,
    ...TYPOGRAPHY.captionSmall,
  },
});

export default ProgressBar;
