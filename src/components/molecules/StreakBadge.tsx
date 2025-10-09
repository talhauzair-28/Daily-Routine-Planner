/**
 * StreakBadge Component (Molecule)
 *
 * A specialized badge component for displaying habit streaks with fire icon and contextual styling.
 * Provides visual feedback for streak achievements and milestones in Islamic daily routines.
 *
 * @component
 * @example
 * // Prayer streak badge
 * <StreakBadge
 *   streakCount={15}
 *   habitName="Fajr Prayer"
 *   size="large"
 * />
 *
 * // Compact streak display
 * <StreakBadge
 *   streakCount={7}
 *   habitName="Quran Reading"
 *   size="small"
 *   variant="compact"
 * />
 *
 * @usage Used in:
 * - Habit streak displays
 * - Achievement indicators
 * - Progress celebrations
 * - Daily routine tracking
 * - Organisms: StreaksSection, DashboardHeader
 * - Screens: HomeScreen, StreakDetailScreen
 * - Analytics and progress views
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { RELIGIOUS_DIMENSIONS, Size, SPACING, TYPOGRAPHY } from '@/constants/design';
import {
  getStreakColor,
  getStreakText,
  getStreakVariant,
  sizeToIconSize,
} from '@/utils';

import { Badge, Icon, Text } from '../atoms';

/**
 * Props for the StreakBadge component
 * @interface StreakBadgeProps
 */
interface StreakBadgeProps {
  /**
   * Current streak count in days
   */
  streakCount: number;

  /**
   * Name of the habit being tracked
   */
  habitName: string;

  /**
   * Badge size variant
   * @default Size.MEDIUM
   */
  size?: Size;

  /**
   * Display variant
   * @default 'full'
   */
  variant?: 'full' | 'compact' | 'minimal';

  /**
   * Whether to show the fire icon
   * @default true
   */
  showIcon?: boolean;

  /**
   * Whether to show habit name
   * @default true
   */
  showHabitName?: boolean;

  /**
   * Custom streak text (overrides default "X days")
   */
  customText?: string;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback when streak badge is pressed
   */
  onPress?: () => void;
}

/**
 * StreakBadge component for habit streak visualization
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const StreakBadge: React.FC<StreakBadgeProps> = ({
  streakCount,
  habitName,
  size = Size.MEDIUM,
  variant = 'full',
  showIcon = true,
  showHabitName = true,
  customText,
  style,
  onPress,
}) => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  // (No state variables in this component)

  // ==========================================
  // Hooks/Custom Hooks
  // ==========================================
  // (No hooks in this component)

  // ==========================================
  // Use Effects
  // ==========================================
  // (No useEffect in this component)

  // ==========================================
  // Helper Methods
  // ==========================================
  /**
   * Get milestone message
   * @returns string | null - Milestone message if applicable
   */
  const getMilestoneMessage = (): string | null => {
    if (streakCount >= 100) return '🎉 Century!';
    if (streakCount >= 50) return '🏆 50 Day Master!';
    if (streakCount >= 30) return '⭐ Month Strong!';
    if (streakCount >= 14) return '🔥 Two Weeks!';
    if (streakCount >= 7) return '💪 One Week!';
    return null;
  };

  // ==========================================
  // Event Handlers
  // ==========================================
  // (Event handlers are passed as props in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  // (No separate render methods in this component)

  // ==========================================
  // Return
  // ==========================================
  /**
   * Render compact variant
   */
  if (variant === 'compact') {
    return (
      <View style={[styles.compactContainer, style]}>
        {showIcon && (
          <Icon
            name="fire"
            size={sizeToIconSize(size)}
            color={getStreakColor(streakCount)}
          />
        )}
        <Badge
          variant={getStreakVariant(streakCount)}
          size={size}
          value={getStreakText(streakCount, customText)}
        />
      </View>
    );
  }

  /**
   * Render minimal variant
   */
  if (variant === 'minimal') {
    return (
      <Badge
        variant={getStreakVariant(streakCount)}
        size={size}
        value={getStreakText(streakCount, customText)}
        style={style}
      />
    );
  }

  /**
   * Render full variant
   */
  return (
    <View style={[styles.container, style]}>
      {/* Habit Name */}
      {showHabitName && (
        <Text
          variant="bodySmall"
          color="text"
          style={styles.habitName}
          numberOfLines={1}
        >
          {habitName}
        </Text>
      )}

      {/* Streak Display */}
      <View style={styles.streakContainer}>
        {showIcon && (
          <Icon
            name="fire"
            size={sizeToIconSize(size)}
            color={getStreakColor(streakCount)}
            style={styles.icon}
          />
        )}

        <Badge
          variant={getStreakVariant(streakCount)}
          size={size}
          value={getStreakText(streakCount, customText)}
          style={styles.badge}
        />
      </View>

      {/* Milestone Message */}
      {getMilestoneMessage() && (
        <Text
          variant="captionSmall"
          color={getStreakColor(streakCount)}
          style={styles.milestone}
        >
          {getMilestoneMessage()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: SPACING.SM,
    minHeight: RELIGIOUS_DIMENSIONS.STREAK_BADGE.HEIGHT,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.XS,
  },
  habitName: {
    textAlign: 'center',
    marginBottom: SPACING.XS,
    maxWidth: 100,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: SPACING.XS,
  },
  badge: {
    // Badge styles handled by Badge component
  },
  milestone: {
    marginTop: SPACING.XS,
    textAlign: 'center',
    ...TYPOGRAPHY.captionSmall,
  },
});

export default StreakBadge;
