/**
 * DisciplineScoreBoard Component (Organism)
 *
 * A comprehensive Islamic discipline scoring component with detailed breakdown and progress tracking.
 * Displays the 32-point daily discipline system across timing, spiritual, family, and personal categories.
 *
 * @component
 * @example
 * // Daily discipline scoreboard
 * <DisciplineScoreBoard
 *   totalScore={28}
 *   maxScore={32}
 *   categoryBreakdown={{
 *     timing: { score: 8, maxScore: 8 },
 *     spiritual: { score: 7, maxScore: 10 },
 *     family: { score: 6, maxScore: 8 },
 *     personal: { score: 7, maxScore: 6 }
 *   }}
 *   showDetails={true}
 *   editable={false}
 * />
 *
 * // Compact discipline overview
 * <DisciplineScoreBoard
 *   totalScore={25}
 *   maxScore={32}
 *   variant="compact"
 *   showMotivational={true}
 * />
 *
 * @usage Used in:
 * - HomeScreen for daily discipline display
 * - TodayScreen for detailed discipline tracking
 * - DisciplineChallengesScreen for full breakdown
 * - Analytics screens for discipline trends
 * - Progress tracking and goal setting
 */

import { Colors } from '@/constants/Colors';
import {
  BORDER_RADIUS,
  CardVariant,
  SPACING,
  SpacingSize,
} from '@/constants/design';
import { getMotivationalMessage } from '@/utils';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Card, Text } from '../atoms';

/**
 * Category score breakdown interface
 * @interface CategoryScore
 */
interface CategoryScore {
  /** Current score for this category */
  score: number;
  /** Maximum possible score for this category */
  maxScore: number;
  /** Optional details about scoring */
  details?: string[];
}

/**
 * Props for the DisciplineScoreBoard component
 * @interface DisciplineScoreBoardProps
 */
interface DisciplineScoreBoardProps {
  /**
   * Total discipline score achieved
   */
  totalScore: number;

  /**
   * Maximum possible discipline score (32)
   */
  maxScore: number;

  /**
   * Breakdown by category
   */
  categoryBreakdown?: {
    timing?: CategoryScore;
    spiritual?: CategoryScore;
    family?: CategoryScore;
    personal?: CategoryScore;
  };

  /**
   * Display variant for different layouts
   * @default 'full'
   */
  variant?: 'full' | 'compact' | 'summary';

  /**
   * Whether to show detailed breakdown
   * @default true
   */
  showDetails?: boolean;

  /**
   * Whether to show motivational messages
   * @default true
   */
  showMotivational?: boolean;

  /**
   * Whether the scores can be edited
   * @default false
   */
  editable?: boolean;

  /**
   * Current streak of discipline achievements
   */
  currentStreak?: number;

  /**
   * Best discipline streak achieved
   */
  bestStreak?: number;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback when category is pressed for editing
   */
  onCategoryPress?: (category: string) => void;

  /**
   * Callback when score card is pressed
   */
  onPress?: () => void;
}

/**
 * DisciplineScoreBoard component for Islamic daily discipline tracking
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const DisciplineScoreBoard: React.FC<DisciplineScoreBoardProps> = ({
  totalScore,
  maxScore,
  categoryBreakdown,
  variant = 'full',
  showDetails = true,
  showMotivational = true,
  editable = false,
  currentStreak,
  bestStreak,
  style,
  onCategoryPress,
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
   * Calculate percentage score
   */
  const percentage = Math.round((totalScore / maxScore) * 100);

  /**
   * Get score color and grade based on Islamic discipline thresholds
   * @returns Object with color, grade, and description
   */
  const getScoreInfo = () => {
    if (percentage >= 95) {
      return {
        color: 'excellent' as keyof typeof Colors,
        grade: 'A+',
        level: 'Exceptional',
        description: "Masha'Allah! Outstanding Islamic discipline!",
        emoji: '🌟',
      };
    }
    if (percentage >= 90) {
      return {
        color: 'excellent' as keyof typeof Colors,
        grade: 'A',
        level: 'Excellent',
        description: 'Alhamdulillah! Excellent consistency!',
        emoji: '⭐',
      };
    }
    if (percentage >= 85) {
      return {
        color: 'good' as keyof typeof Colors,
        grade: 'A-',
        level: 'Very Good',
        description: 'Great discipline! Keep it up!',
        emoji: '🔥',
      };
    }
    if (percentage >= 75) {
      return {
        color: 'good' as keyof typeof Colors,
        grade: 'B+',
        level: 'Good',
        description: 'Good progress! Room for improvement!',
        emoji: '👍',
      };
    }
    if (percentage >= 65) {
      return {
        color: 'average' as keyof typeof Colors,
        grade: 'B',
        level: 'Fair',
        description: 'Fair effort! Keep building consistency!',
        emoji: '📈',
      };
    }
    if (percentage >= 50) {
      return {
        color: 'poor' as keyof typeof Colors,
        grade: 'C',
        level: 'Needs Work',
        description: 'Keep trying! Every effort counts!',
        emoji: '💪',
      };
    }
    return {
      color: 'bad' as keyof typeof Colors,
      grade: 'D',
      level: 'Start Small',
      description: 'New beginning! Start with small steps!',
      emoji: '🌱',
    };
  };

  /**
   * Get category display info
   * @param categoryKey - Category key
   * @returns Object with category display information
   */
  const getCategoryInfo = (categoryKey: string) => {
    switch (categoryKey) {
      case 'timing':
        return {
          name: 'Timing Discipline',
          icon: '⏰',
          color: 'primary' as keyof typeof Colors,
          description: 'Wake up, sleep, prayer times',
        };
      case 'spiritual':
        return {
          name: 'Spiritual Practice',
          icon: '🤲',
          color: 'prayer' as keyof typeof Colors,
          description: 'Prayers, Quran, Zikr, learning',
        };
      case 'family':
        return {
          name: 'Family Time',
          icon: '👨‍👩‍👧‍👦',
          color: 'error' as keyof typeof Colors, // Pink-ish
          description: 'Quality time, activities, bonding',
        };
      case 'personal':
        return {
          name: 'Personal Care',
          icon: '💪',
          color: 'warning' as keyof typeof Colors,
          description: 'Exercise, health, self-care',
        };
      default:
        return {
          name: categoryKey,
          icon: '📊',
          color: 'textSecondary' as keyof typeof Colors,
          description: '',
        };
    }
  };

  /**
   * Get streak message
   * @returns string - Streak message
   */
  const getStreakMessage = (): string => {
    if (!currentStreak) return '';

    if (currentStreak >= 100) return '🏆 Century of discipline!';
    if (currentStreak >= 50) return '🎉 50-day master!';
    if (currentStreak >= 30) return '⭐ Monthly champion!';
    if (currentStreak >= 14) return '🔥 Two-week warrior!';
    if (currentStreak >= 7) return '💪 One-week strong!';
    if (currentStreak >= 3) return '📈 Building momentum!';
    if (currentStreak >= 1) return '🌱 Great start!';
    return '';
  };

  // Computed values for render
  const scoreInfo = getScoreInfo();

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
  // Compact Variant
  if (variant === 'compact') {
    return (
      <Card
        variant={CardVariant.DEFAULT}
        padding={SpacingSize.MD}
        style={style}
      >
        <View style={styles.compactContainer}>
          <View style={styles.compactScore}>
            <Text variant="h2" color={scoreInfo.color}>
              {totalScore}
            </Text>
            <Text variant="body" color="textSecondary">
              /{maxScore}
            </Text>
          </View>
          <View style={styles.compactInfo}>
            <Text
              variant="bodySmall"
              color={scoreInfo.color}
              style={styles.compactGrade}
            >
              {scoreInfo.grade} • {percentage}%
            </Text>
            <Text variant="caption" color="textSecondary">
              {scoreInfo.level}
            </Text>
          </View>
        </View>
      </Card>
    );
  }

  // Summary Variant
  if (variant === 'summary') {
    return (
      <Card
        variant={CardVariant.OUTLINED}
        padding={SpacingSize.SM}
        style={style}
      >
        <View style={styles.summaryContainer}>
          <Text variant="body" color="text">
            Discipline: {totalScore}/{maxScore}
          </Text>
          <Text variant="bodySmall" color={scoreInfo.color}>
            {scoreInfo.grade} ({percentage}%)
          </Text>
        </View>
      </Card>
    );
  }

  // Full Variant (Default)
  return (
    <Card variant={CardVariant.ELEVATED} padding={SpacingSize.LG} style={style}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="h4" color="primary" style={styles.title}>
          Daily Discipline Score 📊
        </Text>

        <View style={styles.mainScore}>
          <View style={styles.scoreDisplay}>
            <Text variant="h1" color={scoreInfo.color}>
              {totalScore}
            </Text>
            <Text variant="h4" color="textSecondary" style={styles.maxScore}>
              /{maxScore}
            </Text>
          </View>

          <View style={styles.gradeContainer}>
            <Text variant="h3" color={scoreInfo.color} style={styles.grade}>
              {scoreInfo.grade}
            </Text>
            <Text variant="body" color={scoreInfo.color}>
              {percentage}% • {scoreInfo.level}
            </Text>
          </View>
        </View>
      </View>

      {/* Category Breakdown */}
      {showDetails && categoryBreakdown && (
        <View style={styles.categoriesContainer}>
          <Text variant="h6" color="text" style={styles.categoriesTitle}>
            Category Breakdown
          </Text>

          {Object.entries(categoryBreakdown).map(([key, category]) => {
            const categoryInfo = getCategoryInfo(key);
            const categoryPercentage = Math.round(
              (category.score / category.maxScore) * 100
            );

            return (
              <View
                key={key}
                style={[
                  styles.categoryItem,
                  editable && styles.categoryItemEditable,
                ]}
                onTouchEnd={() => editable && onCategoryPress?.(key)}
              >
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryTitle}>
                    <Text style={styles.categoryIcon}>{categoryInfo.icon}</Text>
                    <View>
                      <Text
                        variant="bodySmall"
                        color="text"
                        style={styles.categoryName}
                      >
                        {categoryInfo.name}
                      </Text>
                      <Text variant="captionSmall" color="textTertiary">
                        {categoryInfo.description}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.categoryScore}>
                    <Text variant="body" color={categoryInfo.color}>
                      {category.score}/{category.maxScore}
                    </Text>
                    <Text variant="captionSmall" color="textSecondary">
                      {categoryPercentage}%
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}

      {/* Streak Information */}
      {(currentStreak !== undefined || bestStreak !== undefined) && (
        <View style={styles.streakContainer}>
          {currentStreak !== undefined && (
            <View style={styles.streakItem}>
              <Text variant="caption" color="textSecondary">
                Current Streak
              </Text>
              <Text variant="body" color="streak" style={styles.streakValue}>
                {currentStreak} days
              </Text>
              <Text variant="captionSmall" color="streak">
                {getStreakMessage()}
              </Text>
            </View>
          )}

          {bestStreak !== undefined && bestStreak > 0 && (
            <View style={styles.streakItem}>
              <Text variant="caption" color="textSecondary">
                Best Streak
              </Text>
              <Text variant="body" color="excellent" style={styles.streakValue}>
                {bestStreak} days 🏆
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Motivational Message */}
      {showMotivational && (
        <View style={styles.motivationalContainer}>
          <Text
            variant="caption"
            color={scoreInfo.color}
            style={styles.motivationalText}
          >
            {getMotivationalMessage(
              Math.round((totalScore / maxScore) * 100),
              'dashboard'
            )}
          </Text>

          <Text
            variant="captionSmall"
            color="textTertiary"
            style={styles.islamicQuote}
          >
            &ldquo;And Allah loves those who are constantly repentant and loves
            those who purify themselves.&rdquo; - Quran 2:222
          </Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  // Full variant styles
  header: {
    alignItems: 'center',
    marginBottom: SPACING.LG,
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.MD,
    fontWeight: 'bold',
  },
  mainScore: {
    alignItems: 'center',
    gap: SPACING.SM,
  },
  scoreDisplay: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  maxScore: {
    marginLeft: SPACING.XS,
  },
  gradeContainer: {
    alignItems: 'center',
  },
  grade: {
    fontWeight: 'bold',
  },

  // Categories
  categoriesContainer: {
    marginBottom: SPACING.LG,
  },
  categoriesTitle: {
    textAlign: 'center',
    marginBottom: SPACING.MD,
    fontWeight: 'bold',
  },
  categoryItem: {
    marginBottom: SPACING.SM,
    padding: SPACING.SM,
    backgroundColor: Colors.surface,
    borderRadius: BORDER_RADIUS.MD,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  categoryItemEditable: {
    borderColor: Colors.border,
    borderWidth: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: SPACING.SM,
  },
  categoryName: {
    fontWeight: 'bold',
  },
  categoryScore: {
    alignItems: 'flex-end',
  },

  // Streak
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.LG,
    paddingTop: SPACING.MD,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  streakItem: {
    alignItems: 'center',
  },
  streakValue: {
    fontWeight: 'bold',
    marginVertical: SPACING.XS / 2,
  },

  // Motivational
  motivationalContainer: {
    alignItems: 'center',
    paddingTop: SPACING.MD,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  motivationalText: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: SPACING.SM,
  },
  islamicQuote: {
    textAlign: 'center',
    fontStyle: 'italic',
    maxWidth: 300,
  },

  // Compact variant styles
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  compactScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  compactInfo: {
    alignItems: 'flex-end',
  },
  compactGrade: {
    fontWeight: 'bold',
  },

  // Summary variant styles
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DisciplineScoreBoard;
