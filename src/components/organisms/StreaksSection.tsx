/**
 * StreaksSection Component (Organism)
 *
 * A comprehensive habit streaks display component for Islamic daily routine tracking.
 * Shows active streaks, milestone celebrations, and motivational streak management.
 *
 * @component
 * @example
 * // Active streaks display
 * <StreaksSection
 *   streaks={activeStreaks}
 *   title="Active Streaks 🔥"
 *   maxDisplay={5}
 *   onStreakPress={handleStreakDetail}
 *   showMilestones={true}
 * />
 *
 * // Compact streaks overview
 * <StreaksSection
 *   streaks={topStreaks}
 *   title="Top Achievements"
 *   variant="compact"
 *   maxDisplay={3}
 * />
 *
 * @usage Used in:
 * - HomeScreen for active streak display
 * - StreakDetailScreen for detailed streak management
 * - Achievement and progress tracking
 * - Motivational displays and celebrations
 * - Analytics screens for streak analysis
 */

import { Colors } from '@/constants/Colors';
import {
  CardVariant,
  ProgressVariant,
  Size,
  SPACING,
  SpacingSize,
} from '@/constants/design';
import { Streak } from '@/types';
import React, { JSX } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Card, ProgressBar, Text } from '../atoms';
import { StreakBadge } from '../molecules';

/**
 * Props for the StreaksSection component
 * @interface StreaksSectionProps
 */
interface StreaksSectionProps {
  /**
   * Array of streak objects to display
   */
  streaks: Streak[];

  /**
   * Section title with motivational context
   * @default "Active Streaks 🔥"
   */
  title?: string;

  /**
   * Maximum number of streaks to display
   * @default 5
   */
  maxDisplay?: number;

  /**
   * Display variant for different layouts
   * @default 'full'
   */
  variant?: 'full' | 'compact' | 'minimal';

  /**
   * Whether to show milestone celebrations
   * @default true
   */
  showMilestones?: boolean;

  /**
   * Whether to show streak statistics
   * @default true
   */
  showStats?: boolean;

  /**
   * Whether to show progress bars for targets
   * @default true
   */
  showProgress?: boolean;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback when streak item is pressed
   */
  onStreakPress?: (streak: Streak) => void;

  /**
   * Callback when "show more" is pressed
   */
  onShowMore?: () => void;
}

/**
 * StreaksSection component for Islamic habit streak tracking and motivation
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const StreaksSection: React.FC<StreaksSectionProps> = ({
  streaks,
  title = 'Active Streaks 🔥',
  maxDisplay = 5,
  variant = 'full',
  showMilestones = true,
  showStats = true,
  showProgress = true,
  style,
  onStreakPress,
  onShowMore,
}) => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  // Limit displayed streaks if maxDisplay is set
  const displayedStreaks = maxDisplay ? streaks.slice(0, maxDisplay) : streaks;

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
   * Calculate streak statistics
   * @returns Object with streak statistics
   */
  const getStreakStats = () => {
    if (streaks.length === 0) {
      return {
        totalStreaks: 0,
        averageStreak: 0,
        longestStreak: 0,
        milestoneCount: 0,
        totalDays: 0,
      };
    }

    const longestStreak = Math.max(...streaks.map(s => s.currentStreak));
    const totalDays = streaks.reduce((sum, s) => sum + s.currentStreak, 0);
    const averageStreak = totalDays / streaks.length;
    const milestoneStreaks = streaks.filter(s => s.currentStreak >= 7); // 7+ days milestone

    return {
      totalStreaks: streaks.length,
      averageStreak: Math.round(averageStreak * 10) / 10,
      longestStreak,
      milestoneCount: milestoneStreaks.length,
      totalDays,
    };
  };

  /**
   * Get motivational message based on streaks
   * @returns string - Motivational message
   */
  const getMotivationalMessage = (): string => {
    const stats = getStreakStats();

    if (stats.totalStreaks === 0) {
      return 'Start your first habit today! Every journey begins with a single step. 🌱';
    }

    if (stats.longestStreak >= 100) {
      return "Masha'Allah! Century streaks achieved! You're an inspiration! 🏆";
    }

    if (stats.longestStreak >= 30) {
      return "Subhan'Allah! Month-long dedication shows true commitment! ⭐";
    }

    if (stats.milestoneCount >= 3) {
      return "Multiple strong habits! You're building an amazing routine! 💪";
    }

    if (stats.averageStreak >= 14) {
      return 'Consistent progress across all habits! Keep it up! 🔥';
    }

    return 'Great start! Every day of consistency brings you closer to your goals! 📈';
  };

  /**
   * Get celebration emoji based on longest streak
   * @returns string - Celebration emoji
   */
  const getCelebrationEmoji = (): string => {
    const longestStreak = Math.max(...streaks.map(s => s.currentStreak));

    if (longestStreak >= 100) return '🎊';
    if (longestStreak >= 50) return '🏆';
    if (longestStreak >= 30) return '⭐';
    if (longestStreak >= 14) return '🔥';
    if (longestStreak >= 7) return '💪';
    return '🌱';
  };

  // Computed values for render
  const stats = getStreakStats();

  // ==========================================
  // Event Handlers
  // ==========================================
  // (Event handlers are passed as props in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  /**
   * Render empty state when no streaks are available
   * @returns JSX.Element - Empty state with motivational message
   */
  const renderEmptyState = (): JSX.Element => (
    <Card variant={CardVariant.DEFAULT} padding={SpacingSize.LG} style={style}>
      <Text variant="h4" color="text" style={styles.title}>
        {title}
      </Text>
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🌱</Text>
        <Text variant="body" color="textSecondary" style={styles.emptyText}>
          No active streaks yet. Start building your habits!
        </Text>
        <Text
          variant="caption"
          color="textTertiary"
          style={styles.emptySubtext}
        >
          &ldquo;And those who strive for Us - We will surely guide them to Our
          ways.&rdquo; - Quran 29:69
        </Text>
      </View>
    </Card>
  );

  /**
   * Render compact variant for minimal space usage
   * @returns JSX.Element - Compact streaks display
   */
  const renderCompactVariant = (): JSX.Element => (
    <Card variant={CardVariant.DEFAULT} padding={SpacingSize.MD} style={style}>
      <Text variant="h5" color="text" style={styles.compactTitle}>
        {title}
      </Text>
      <View style={styles.compactContainer}>
        {displayedStreaks.map(streak => (
          <StreakBadge
            key={streak.id}
            streakCount={streak.currentStreak}
            habitName={streak.habitName}
            variant="compact"
            size={Size.SMALL}
            onPress={() => onStreakPress?.(streak)}
          />
        ))}
      </View>
    </Card>
  );

  /**
   * Render minimal variant for inline display
   * @returns JSX.Element - Minimal streaks display
   */
  const renderMinimalVariant = (): JSX.Element => (
    <View style={[styles.minimalContainer, style]}>
      {displayedStreaks.map(streak => (
        <StreakBadge
          key={streak.id}
          streakCount={streak.currentStreak}
          habitName={streak.habitName}
          variant="minimal"
          size={Size.SMALL}
          onPress={() => onStreakPress?.(streak)}
        />
      ))}
    </View>
  );

  /**
   * Render header section with title, celebration emoji, and stats
   * @returns JSX.Element - Header section
   */
  const renderHeader = (): JSX.Element => (
    <View style={styles.header}>
      <View style={styles.titleRow}>
        <Text variant="h4" color="streak" style={styles.title}>
          {title}
        </Text>
        <Text style={styles.celebrationEmoji}>{getCelebrationEmoji()}</Text>
      </View>

      {showStats && (
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <Text variant="caption" color="textSecondary">
              {stats.totalStreaks} Active • Avg: {stats.averageStreak} days
            </Text>
            <Text variant="caption" color="streak">
              Longest: {stats.longestStreak} days 🏆
            </Text>
          </View>

          {showProgress && stats.totalDays > 0 && (
            <View style={styles.progressContainer}>
              <Text
                variant="captionSmall"
                color="textTertiary"
                style={styles.progressLabel}
              >
                Total Progress: {stats.totalDays} days of consistency
              </Text>
              <ProgressBar
                progress={Math.min((stats.totalDays / 100) * 100, 100)} // Cap at 100%
                variant={ProgressVariant.PRIMARY}
                size={Size.SMALL}
                showLabel={false}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );

  /**
   * Render individual streak item with optional target progress
   * @param streak - Streak object to render
   * @returns JSX.Element - Streak item
   */
  const renderStreakItem = (streak: Streak): JSX.Element => (
    <View key={streak.id} style={styles.streakItemContainer}>
      <StreakBadge
        streakCount={streak.currentStreak}
        habitName={streak.habitName}
        variant="full"
        size={Size.MEDIUM}
        showIcon={true}
        showHabitName={true}
        onPress={() => onStreakPress?.(streak)}
      />

      {/* Target Progress */}
      {showProgress &&
        streak.target &&
        streak.target > streak.currentStreak && (
          <View style={styles.targetProgress}>
            <Text variant="captionSmall" color="textTertiary">
              Target: {streak.target} days
            </Text>
            <ProgressBar
              progress={(streak.currentStreak / streak.target) * 100}
              variant={ProgressVariant.AVERAGE}
              size={Size.SMALL}
              showLabel={true}
              style={styles.targetBar}
            />
          </View>
        )}
    </View>
  );

  /**
   * Render streaks list container
   * @returns JSX.Element - Streaks list
   */
  const renderStreaksList = (): JSX.Element => (
    <View style={styles.streaksContainer}>
      {displayedStreaks.map(renderStreakItem)}
    </View>
  );

  /**
   * Render motivational message section
   * @returns JSX.Element - Motivational message
   */
  const renderMotivationalMessage = (): JSX.Element | null => {
    if (!showMilestones) return null;

    return (
      <View style={styles.motivationalContainer}>
        <Text variant="caption" color="streak" style={styles.motivationalText}>
          {getMotivationalMessage()}
        </Text>
      </View>
    );
  };

  /**
   * Render show more button
   * @returns JSX.Element - Show more button
   */
  const renderShowMoreButton = (): JSX.Element | null => {
    if (streaks.length <= maxDisplay) return null;

    return (
      <Text
        variant="caption"
        color="primary"
        style={styles.showMore}
        onPress={onShowMore}
      >
        +{streaks.length - maxDisplay} more streaks • View All
      </Text>
    );
  };

  /**
   * Render full variant with all features
   * @returns JSX.Element - Full streaks display
   */
  const renderFullVariant = (): JSX.Element => (
    <Card variant={CardVariant.DEFAULT} padding={SpacingSize.MD} style={style}>
      {renderHeader()}
      {renderStreaksList()}
      {renderMotivationalMessage()}
      {renderShowMoreButton()}
    </Card>
  );

  // ==========================================
  // Return
  // ==========================================
  // Main render logic with variant selection
  if (streaks.length === 0) {
    return renderEmptyState();
  }

  switch (variant) {
    case 'compact':
      return renderCompactVariant();
    case 'minimal':
      return renderMinimalVariant();
    default:
      return renderFullVariant();
  }
};

const styles = StyleSheet.create({
  // Full variant styles
  header: {
    marginBottom: SPACING.MD,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.SM,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: SPACING.XS,
  },
  celebrationEmoji: {
    fontSize: 20,
  },
  statsContainer: {
    alignItems: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: SPACING.XS,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressLabel: {
    marginBottom: SPACING.XS / 2,
  },
  streaksContainer: {
    gap: SPACING.SM,
  },
  streakItemContainer: {
    alignItems: 'center',
  },
  targetProgress: {
    width: '80%',
    alignItems: 'center',
    marginTop: SPACING.XS,
  },
  targetBar: {
    marginTop: SPACING.XS / 2,
  },
  motivationalContainer: {
    marginTop: SPACING.MD,
    paddingTop: SPACING.SM,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    alignItems: 'center',
  },
  motivationalText: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  showMore: {
    textAlign: 'center',
    marginTop: SPACING.MD,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  // Compact variant styles
  compactTitle: {
    textAlign: 'center',
    marginBottom: SPACING.SM,
    fontWeight: 'bold',
  },
  compactContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.XS,
  },

  // Minimal variant styles
  minimalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.XS,
  },

  // Empty state styles
  emptyContainer: {
    paddingVertical: SPACING['3XL'],
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 48,
    marginBottom: SPACING.MD,
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: SPACING.SM,
    fontWeight: 'bold',
  },
  emptySubtext: {
    textAlign: 'center',
    fontStyle: 'italic',
    maxWidth: 280,
  },
});

export default StreaksSection;
