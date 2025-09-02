/**
 * ScoreCard Component (Molecule)
 *
 * A comprehensive score display component with progress visualization.
 * Designed for Islamic daily routine discipline scoring and quality tracking.
 *
 * @component
 * @example
 * // Daily discipline score
 * <ScoreCard
 *   title="Today's Discipline Score"
 *   score={28}
 *   maxScore={32}
 *   subtitle="Excellent progress!"
 *   variant="default"
 * />
 *
 * // Circular prayer quality score
 * <ScoreCard
 *   title="Prayer Quality"
 *   score={18}
 *   maxScore={20}
 *   variant="circular"
 *   showProgress={true}
 * />
 *
 * @usage Used in:
 * - Daily discipline scoring
 * - Weekly quality summaries
 * - Monthly progress tracking
 * - Habit achievement displays
 * - Organisms: DisciplineScoreBoard, DashboardHeader
 * - Screens: HomeScreen, AnalyticsScreen, TodayScreen
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import {
  CardVariant,
  Category,
  Size,
  SPACING,
  SpacingSize,
} from '@/constants/design';
import {
  getMotivationalMessage,
  getProgressVariant,
  getScoreColor,
  getTitleColor,
} from '@/utils';

import { Card, ProgressBar, Text } from '../atoms';

/**
 * Props for the ScoreCard component
 * @interface ScoreCardProps
 */
interface ScoreCardProps {
  /**
   * Card title/label
   */
  title: string;

  /**
   * Current score value
   */
  score: number;

  /**
   * Maximum possible score
   */
  maxScore: number;

  /**
   * Optional subtitle or description
   */
  subtitle?: string;

  /**
   * Whether to show progress bar/indicator
   * @default true
   */
  showProgress?: boolean;

  /**
   * Visual variant of the score display
   * @default 'default'
   */
  variant?: 'default' | 'circular' | 'compact';

  /**
   * Score category for contextual styling
   * @default 'general'
   */
  category?: Category;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback when card is pressed
   */
  onPress?: () => void;
}

/**
 * ScoreCard component for score visualization
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const ScoreCard: React.FC<ScoreCardProps> = ({
  title,
  score,
  maxScore,
  subtitle,
  showProgress = true,
  variant = 'default',
  category = Category.GENERAL,
  style,
  onPress,
}) => {
  /**
   * Calculate percentage score
   */
  const percentage = Math.round((score / maxScore) * 100);

  /**
   * Render circular score variant
   */
  const renderCircularScore = () => (
    <View style={styles.circularContainer}>
      <View
        style={[
          styles.scoreCircle,
          {
            borderColor: getScoreColor(percentage),
            backgroundColor: Colors.surface,
          },
        ]}
      >
        <Text variant="h2" color={getScoreColor(percentage)}>
          {score}
        </Text>
        <Text variant="caption" color="textSecondary">
          / {maxScore}
        </Text>
      </View>
      <Text variant="bodySmall" color="textSecondary" style={styles.percentage}>
        {percentage}%
      </Text>
      {showProgress && (
        <View style={styles.circularProgress}>
          <ProgressBar
            progress={percentage}
            variant={getProgressVariant(percentage)}
            size={Size.SMALL}
            showLabel={false}
          />
        </View>
      )}
    </View>
  );

  /**
   * Render compact score variant
   */
  const renderCompactScore = () => (
    <View style={styles.compactContainer}>
      <View style={styles.compactScore}>
        <Text variant="h4" color={getScoreColor(percentage)}>
          {score}
        </Text>
        <Text variant="bodySmall" color="textSecondary">
          /{maxScore}
        </Text>
      </View>
      {showProgress && (
        <ProgressBar
          progress={percentage}
          variant={getProgressVariant(percentage)}
          size={Size.SMALL}
          showLabel={true}
          style={styles.compactProgress}
        />
      )}
    </View>
  );

  /**
   * Render default score variant
   */
  const renderDefaultScore = () => (
    <View style={styles.defaultContainer}>
      <View style={styles.scoreHeader}>
        <Text variant="h3" color={getScoreColor(percentage)}>
          {score}
        </Text>
        <Text variant="body" color="textSecondary" style={styles.maxScore}>
          / {maxScore}
        </Text>
        <Text
          variant="bodySmall"
          color="textSecondary"
          style={styles.percentage}
        >
          ({percentage}%)
        </Text>
      </View>

      {showProgress && (
        <ProgressBar
          progress={percentage}
          variant={getProgressVariant(percentage)}
          size={Size.MEDIUM}
          showLabel={false}
          style={styles.progressBar}
        />
      )}

      <Text
        variant="captionSmall"
        color={getScoreColor(percentage)}
        style={styles.motivational}
      >
        {getMotivationalMessage(percentage, 'score')}
      </Text>
    </View>
  );

  return (
    <Card variant={CardVariant.DEFAULT} padding={SpacingSize.MD} style={style}>
      <Text variant="h5" color={getTitleColor(category)} style={styles.title}>
        {title}
      </Text>

      {subtitle && (
        <Text variant="caption" color="textSecondary" style={styles.subtitle}>
          {subtitle}
        </Text>
      )}

      {variant === 'circular' && renderCircularScore()}
      {variant === 'compact' && renderCompactScore()}
      {variant === 'default' && renderDefaultScore()}
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: SPACING.XS,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: SPACING.MD,
  },

  // Circular variant styles
  circularContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.MD,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.SM,
  },
  circularProgress: {
    width: '80%',
    marginTop: SPACING.SM,
  },

  // Compact variant styles
  compactContainer: {
    paddingVertical: SPACING.SM,
  },
  compactScore: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: SPACING.SM,
  },
  compactProgress: {
    marginTop: SPACING.XS,
  },

  // Default variant styles
  defaultContainer: {
    paddingVertical: SPACING.SM,
  },
  scoreHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    marginBottom: SPACING.MD,
  },
  maxScore: {
    marginLeft: SPACING.XS,
  },
  percentage: {
    marginLeft: SPACING.SM,
    textAlign: 'center',
  },
  progressBar: {
    marginBottom: SPACING.SM,
  },
  motivational: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: SPACING.XS,
  },
});

export default ScoreCard;
