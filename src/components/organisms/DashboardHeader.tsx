/**
 * DashboardHeader Component (Organism)
 *
 * A comprehensive dashboard header displaying daily greeting, work type, and overall progress.
 * Designed as the main header for the Islamic daily routine planner with contextual information.
 *
 * @component
 * @example
 * // Basic dashboard header
 * <DashboardHeader
 *   greeting="As-salamu alaikum, Ahmad!"
 *   date="Monday, December 16, 2024"
 *   workType="office"
 *   overallScore={28}
 *   maxScore={32}
 * />
 *
 * // Weekend header without score
 * <DashboardHeader
 *   greeting="Jumu'ah Mubarak!"
 *   date="Friday, December 20, 2024"
 *   workType="weekend"
 * />
 *
 * @usage Used in:
 * - HomeScreen as the main dashboard header
 * - TodayScreen for daily overview
 * - Main app navigation header
 * - Daily routine summary display
 * - Progress tracking overview
 */

import React, { JSX } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import {
  BadgeVariant,
  CardVariant,
  Size,
  SPACING,
  SpacingSize,
  TYPOGRAPHY,
} from '@/constants/design';
import { getMotivationalMessage, getScoreBadgeVariant } from '@/utils';

import { Badge, Card, Text } from '../atoms';

/**
 * Props for the DashboardHeader component
 * @interface DashboardHeaderProps
 */
interface DashboardHeaderProps {
  /**
   * Islamic greeting or welcome message
   */
  greeting: string;

  /**
   * Current date in readable format
   */
  date: string;

  /**
   * Type of work day for contextual styling
   */
  workType: 'office' | 'wfh' | 'weekend';

  /**
   * Current overall discipline score
   */
  overallScore?: number;

  /**
   * Maximum possible score
   */
  maxScore?: number;

  /**
   * Additional Islamic context (e.g., prayer times, Islamic date)
   */
  islamicContext?: {
    hijriDate?: string;
    nextPrayer?: string;
    nextPrayerTime?: string;
  };

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback when header is pressed
   */
  onPress?: () => void;
}

/**
 * DashboardHeader component for Islamic daily routine overview
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  greeting,
  date,
  workType,
  overallScore,
  maxScore,
  islamicContext,
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
   * Get work type information with Islamic context
   * @returns Object with display info for work type
   */
  const getWorkTypeInfo = () => {
    switch (workType) {
      case 'office':
        return {
          text: 'Office Day',
          icon: '🏢',
          color: 'primary' as keyof typeof Colors,
          description: 'May Allah ease your work',
        };
      case 'wfh':
        return {
          text: 'Work From Home',
          icon: '🏠',
          color: 'success' as keyof typeof Colors,
          description: 'Barakallahu feeki',
        };
      case 'weekend':
        return {
          text: 'Weekend',
          icon: '🎉',
          color: 'warning' as keyof typeof Colors,
          description: 'Time for family & worship',
        };
      default:
        return {
          text: 'Day',
          icon: '📅',
          color: 'primary' as keyof typeof Colors,
          description: 'Have a blessed day',
        };
    }
  };

  // Computed values for render
  const workTypeInfo = getWorkTypeInfo();
  const scorePercentage =
    overallScore && maxScore
      ? Math.round((overallScore / maxScore) * 100)
      : null;

  // ==========================================
  // Event Handlers
  // ==========================================
  // (Event handlers are passed as props in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  /**
   * Render left section with greeting and work type information
   * @returns JSX.Element - Left section content
   */
  const renderLeftSection = (): JSX.Element => (
    <View style={styles.leftSection}>
      <Text variant="h3" color="text" style={styles.greeting}>
        {greeting}
      </Text>

      <Text variant="body" color="textSecondary" style={styles.date}>
        {date}
      </Text>

      {islamicContext?.hijriDate && (
        <Text variant="caption" color="textTertiary" style={styles.hijriDate}>
          {islamicContext.hijriDate}
        </Text>
      )}

      {/* Work Type Badge */}
      <View style={styles.workTypeContainer}>
        <Text style={styles.workTypeIcon}>{workTypeInfo.icon}</Text>
        <Text
          variant="bodySmall"
          color={workTypeInfo.color}
          style={styles.workType}
        >
          {workTypeInfo.text}
        </Text>
      </View>

      <Text
        variant="captionSmall"
        color="textTertiary"
        style={styles.workDescription}
      >
        {workTypeInfo.description}
      </Text>
    </View>
  );

  /**
   * Render right section with score and progress information
   * @returns JSX.Element | null - Right section content or null if no score
   */
  const renderRightSection = (): JSX.Element | null => {
    if (!overallScore || !maxScore) return null;

    return (
      <View style={styles.rightSection}>
        <View style={styles.scoreContainer}>
          <Text
            variant="h2"
            color={
              scorePercentage ? getScoreBadgeVariant(scorePercentage) : 'text'
            }
          >
            {overallScore}
          </Text>
          <Text variant="body" color="textSecondary" style={styles.maxScore}>
            /{maxScore}
          </Text>
        </View>

        {scorePercentage && (
          <Badge
            value={`${scorePercentage}%`}
            variant={
              scorePercentage
                ? getScoreBadgeVariant(scorePercentage)
                : BadgeVariant.PRIMARY
            }
            size={Size.MEDIUM}
            style={styles.scoreBadge}
          />
        )}

        <Text
          variant="captionSmall"
          color={
            scorePercentage ? getScoreBadgeVariant(scorePercentage) : 'text'
          }
          style={styles.motivational}
        >
          {scorePercentage
            ? getMotivationalMessage(scorePercentage, 'dashboard')
            : ''}
        </Text>
      </View>
    );
  };

  /**
   * Render next prayer information section
   * @returns JSX.Element | null - Prayer info or null if not available
   */
  const renderNextPrayerInfo = (): JSX.Element | null => {
    if (!islamicContext?.nextPrayer || !islamicContext?.nextPrayerTime)
      return null;

    return (
      <View style={styles.nextPrayerContainer}>
        <Text
          variant="captionSmall"
          color="prayer"
          style={styles.nextPrayerLabel}
        >
          Next Prayer: {islamicContext.nextPrayer}
        </Text>
        <Text variant="bodySmall" color="prayer" style={styles.nextPrayerTime}>
          {islamicContext.nextPrayerTime}
        </Text>
      </View>
    );
  };

  // ==========================================
  // Return
  // ==========================================
  return (
    <Card variant={CardVariant.ELEVATED} padding={SpacingSize.LG} style={style}>
      <View style={styles.container}>
        {renderLeftSection()}
        {renderRightSection()}
      </View>
      {renderNextPrayerInfo()}
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    marginRight: SPACING.MD,
  },
  greeting: {
    marginBottom: SPACING.XS,
  },
  date: {
    marginBottom: SPACING.XS / 2,
  },
  hijriDate: {
    marginBottom: SPACING.SM,
    fontStyle: 'italic',
  },
  workTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XS / 2,
  },
  workTypeIcon: {
    ...TYPOGRAPHY.body,
    marginRight: SPACING.XS,
  },
  workType: {
    ...TYPOGRAPHY.bodySmall,
  },
  workDescription: {
    fontStyle: 'italic',
  },
  rightSection: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.XS,
  },
  maxScore: {
    marginLeft: SPACING.XS / 2,
  },
  scoreBadge: {
    marginBottom: SPACING.XS,
  },
  motivational: {
    textAlign: 'right',
    maxWidth: 120,
    fontStyle: 'italic',
  },
  nextPrayerContainer: {
    marginTop: SPACING.MD,
    paddingTop: SPACING.SM,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextPrayerLabel: {
    ...TYPOGRAPHY.captionSmall,
  },
  nextPrayerTime: {
    ...TYPOGRAPHY.bodySmall,
  },
});

export default DashboardHeader;
