/**
 * PrayersSection Component (Organism)
 *
 * A comprehensive prayers display and management component for Islamic daily routine tracking.
 * Shows prayer times, completion status, quality ratings, and Islamic prayer-specific features.
 *
 * @component
 * @example
 * // Basic prayers section with quality editing
 * <PrayersSection
 *   prayers={todayPrayers}
 *   title="Today's Prayers 🕌"
 *   editable={true}
 *   onPrayerPress={handlePrayerDetail}
 *   onQualityChange={handleQualityUpdate}
 * />
 *
 * // Read-only prayers overview
 * <PrayersSection
 *   prayers={weekPrayers}
 *   title="This Week's Prayer Summary"
 *   editable={false}
 *   showSummary={true}
 * />
 *
 * @usage Used in:
 * - HomeScreen for today's prayer tracking
 * - TodayScreen for detailed prayer management
 * - PrayerDetailScreen for individual prayer focus
 * - Weekly/Monthly prayer summaries
 * - Prayer analytics and progress tracking
 */

import React, { JSX } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import {
  BadgeVariant,
  BORDER_RADIUS,
  CardVariant,
  Category,
  ProgressVariant,
  Size,
  SPACING,
  SpacingSize,
  TYPOGRAPHY,
} from '@/constants/design';
import { Prayer } from '@/types';
import { formatTime, getPrayerIcon, getQualityColor } from '@/utils';

import { Card, ProgressBar, Text } from '../atoms';
import { ActivityItem, QualityRater } from '../molecules';

/**
 * Props for the PrayersSection component
 * @interface PrayersSectionProps
 */
interface PrayersSectionProps {
  /**
   * Array of prayer objects to display
   */
  prayers: Prayer[];

  /**
   * Section title with Islamic context
   * @default "Today's Prayers 🕌"
   */
  title?: string;

  /**
   * Whether prayers can be edited/rated
   * @default false
   */
  editable?: boolean;

  /**
   * Whether to show prayer summary statistics
   * @default true
   */
  showSummary?: boolean;

  /**
   * Whether to show quality raters for each prayer
   * @default true when editable
   */
  showQualityRaters?: boolean;

  /**
   * Maximum number of prayers to display
   * @default undefined (show all)
   */
  maxDisplay?: number;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback when prayer item is pressed
   */
  onPrayerPress?: (prayer: Prayer) => void;

  /**
   * Callback when prayer quality is changed
   */
  onQualityChange?: (prayerId: string, quality: number) => void;

  /**
   * Callback when prayer completion status is toggled
   */
  onCompletionToggle?: (prayerId: string, completed: boolean) => void;
}

/**
 * PrayersSection component for Islamic prayer tracking and management
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const PrayersSection: React.FC<PrayersSectionProps> = ({
  prayers,
  title = "Today's Prayers 🕌",
  editable = false,
  showSummary = true,
  showQualityRaters,
  maxDisplay,
  style,
  onPrayerPress,
  onQualityChange,
  onCompletionToggle,
}) => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  // Show quality raters by default when editable
  const shouldShowQualityRaters = showQualityRaters ?? editable;
  // Limit displayed prayers if maxDisplay is set
  const displayedPrayers = maxDisplay ? prayers.slice(0, maxDisplay) : prayers;

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
   * Get prayer-specific status badges
   * @param prayer - Prayer object
   * @returns Badge object or undefined
   */
  const getPrayerStatusBadge = (prayer: Prayer) => {
    const badges = [];

    // Jamat (congregation) badge - highest priority
    if (prayer.withJamat) {
      badges.push({
        text: 'Jamat',
        variant: BadgeVariant.SUCCESS,
        priority: 3,
      });
    }

    // Takbeer-e-Oola (first takbeer) badge
    if (prayer.takbeerEOola) {
      badges.push({
        text: 'Takbeer-e-Oola',
        variant: BadgeVariant.WARNING,
        priority: 2,
      });
    }

    // Masjid location badge
    if (prayer.location === 'Masjid') {
      badges.push({
        text: 'Masjid',
        variant: BadgeVariant.PRAYER,
        priority: 1,
      });
    }

    // Return highest priority badge
    return badges.sort((a, b) => b.priority - a.priority)[0];
  };

  /**
   * Calculate prayer statistics
   * @returns Object with prayer statistics
   */
  const getPrayerStats = () => {
    if (prayers.length === 0) {
      return {
        completionRate: 0,
        averageQuality: 0,
        completedCount: 0,
        jamaatCount: 0,
        masjidCount: 0,
      };
    }

    const completedPrayers = prayers.filter(p => p.completed);
    const jamaatPrayers = prayers.filter(p => p.withJamat);
    const masjidPrayers = prayers.filter(p => p.location === 'Masjid');

    return {
      completionRate: Math.round(
        (completedPrayers.length / prayers.length) * 100
      ),
      averageQuality:
        completedPrayers.length > 0
          ? completedPrayers.reduce((sum, prayer) => sum + prayer.quality, 0) /
            completedPrayers.length
          : 0,
      completedCount: completedPrayers.length,
      jamaatCount: jamaatPrayers.length,
      masjidCount: masjidPrayers.length,
    };
  };

  // Computed values for render
  const stats = getPrayerStats();

  // ==========================================
  // Event Handlers
  // ==========================================
  // (Event handlers are passed as props in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  /**
   * Render header section with title
   * @returns JSX.Element - Header with title
   */
  const renderHeader = (): JSX.Element => (
    <View style={styles.header}>
      <Text variant="h4" color="prayer" style={styles.title}>
        {title}
      </Text>
    </View>
  );

  /**
   * Render prayer statistics summary
   * @returns JSX.Element | null - Summary stats or null if not shown
   */
  const renderSummary = (): JSX.Element | null => {
    if (!showSummary || prayers.length === 0) return null;

    return (
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text variant="caption" color="textSecondary">
            Completed: {stats.completedCount}/{prayers.length}
          </Text>
          <Text variant="caption" color={getQualityColor(stats.averageQuality)}>
            Avg Quality: {stats.averageQuality.toFixed(1)}/5 ⭐
          </Text>
        </View>

        <ProgressBar
          progress={stats.completionRate}
          variant={ProgressVariant.PRIMARY}
          size={Size.SMALL}
          showLabel={true}
          label={`${stats.completionRate}% Complete`}
          style={styles.progressBar}
        />

        {(stats.jamaatCount > 0 || stats.masjidCount > 0) && (
          <View style={styles.bonusStats}>
            {stats.jamaatCount > 0 && (
              <Text variant="captionSmall" color="success">
                🤝 {stats.jamaatCount} in Jamat
              </Text>
            )}
            {stats.masjidCount > 0 && (
              <Text variant="captionSmall" color="prayer">
                🕌 {stats.masjidCount} in Masjid
              </Text>
            )}
          </View>
        )}
      </View>
    );
  };

  /**
   * Render quality rater for a prayer if needed
   * @param prayer - Prayer object
   * @returns JSX.Element | null - Quality rater or null
   */
  const renderQualityRater = (prayer: Prayer): JSX.Element | null => {
    if (!shouldShowQualityRaters || !prayer.completed) return null;

    return (
      <View style={styles.qualityRaterContainer}>
        <QualityRater
          title="Prayer Quality Assessment"
          rating={prayer.quality}
          onRatingChange={rating => onQualityChange?.(prayer.id, rating)}
          category={Category.PRAYER}
          readonly={!editable}
          size={Size.SMALL}
          showDescription={true}
          customDescription={
            prayer.quality > 0
              ? `${prayer.name} quality: Focus, khushoo, and spiritual connection`
              : undefined
          }
        />
      </View>
    );
  };

  /**
   * Render individual prayer item with activity details
   * @param prayer - Prayer object to render
   * @returns JSX.Element - Prayer item
   */
  const renderPrayerItem = (prayer: Prayer): JSX.Element => (
    <View key={prayer.id} style={styles.prayerItemContainer}>
      <ActivityItem
        title={prayer.name}
        subtitle={`Target: ${formatTime(prayer.targetTime)}`}
        time={
          prayer.actualTime
            ? `Prayed: ${formatTime(prayer.actualTime)}`
            : undefined
        }
        quality={prayer.quality}
        completed={prayer.completed}
        iconName={getPrayerIcon(prayer.name)}
        category={Category.PRAYER}
        badge={getPrayerStatusBadge(prayer)}
        onPress={() => onPrayerPress?.(prayer)}
        onQualityPress={
          editable ? rating => onQualityChange?.(prayer.id, rating) : undefined
        }
      />
      {renderQualityRater(prayer)}
    </View>
  );

  /**
   * Render prayers list container
   * @returns JSX.Element - Prayers list
   */
  const renderPrayersList = (): JSX.Element => (
    <View style={styles.prayersContainer}>
      {displayedPrayers.map(renderPrayerItem)}
    </View>
  );

  /**
   * Render show more indicator
   * @returns JSX.Element | null - Show more text or null
   */
  const renderShowMore = (): JSX.Element | null => {
    if (!maxDisplay || prayers.length <= maxDisplay) return null;

    return (
      <Text variant="caption" color="prayer" style={styles.showMore}>
        +{prayers.length - maxDisplay} more prayers
      </Text>
    );
  };

  // ==========================================
  // Return
  // ==========================================
  return (
    <Card variant={CardVariant.DEFAULT} padding={SpacingSize.MD} style={style}>
      {/* Header with Title and Summary */}
      <View style={styles.header}>
        <Text variant="h4" color="prayer" style={styles.title}>
          {title}
        </Text>

        {showSummary && prayers.length > 0 && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text variant="caption" color="textSecondary">
                Completed: {stats.completedCount}/{prayers.length}
              </Text>
              <Text
                variant="caption"
                color={getQualityColor(stats.averageQuality)}
              >
                Avg Quality: {stats.averageQuality.toFixed(1)}/5 ⭐
              </Text>
            </View>

            <ProgressBar
              progress={stats.completionRate}
              variant={ProgressVariant.PRIMARY}
              size={Size.SMALL}
              showLabel={true}
              label={`${stats.completionRate}% Complete`}
              style={styles.progressBar}
            />

            {(stats.jamaatCount > 0 || stats.masjidCount > 0) && (
              <View style={styles.bonusStats}>
                {stats.jamaatCount > 0 && (
                  <Text variant="captionSmall" color="success">
                    🤝 {stats.jamaatCount} in Jamat
                  </Text>
                )}
                {stats.masjidCount > 0 && (
                  <Text variant="captionSmall" color="prayer">
                    🕌 {stats.masjidCount} in Masjid
                  </Text>
                )}
              </View>
            )}
          </View>
        )}
      </View>

      {/* Prayers List */}
      <View style={styles.prayersContainer}>
        {displayedPrayers.map(prayer => (
          <View key={prayer.id} style={styles.prayerItemContainer}>
            <ActivityItem
              title={prayer.name}
              subtitle={`Target: ${formatTime(prayer.targetTime)}`}
              time={
                prayer.actualTime
                  ? `Prayed: ${formatTime(prayer.actualTime)}`
                  : undefined
              }
              quality={prayer.quality}
              completed={prayer.completed}
              iconName={getPrayerIcon(prayer.name)}
              category={Category.PRAYER}
              badge={getPrayerStatusBadge(prayer)}
              onPress={() => onPrayerPress?.(prayer)}
              onQualityPress={
                editable
                  ? rating => onQualityChange?.(prayer.id, rating)
                  : undefined
              }
            />

            {/* Quality Rater for Detailed Assessment */}
            {shouldShowQualityRaters && prayer.completed && (
              <View style={styles.qualityRaterContainer}>
                <QualityRater
                  title="Prayer Quality Assessment"
                  rating={prayer.quality}
                  onRatingChange={rating =>
                    onQualityChange?.(prayer.id, rating)
                  }
                  category={Category.PRAYER}
                  readonly={!editable}
                  size={Size.SMALL}
                  showDescription={true}
                  customDescription={
                    prayer.quality > 0
                      ? `${prayer.name} quality: Focus, khushoo, and spiritual connection`
                      : undefined
                  }
                />
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Show More Indicator */}
      {maxDisplay && prayers.length > maxDisplay && (
        <Text variant="caption" color="prayer" style={styles.showMore}>
          +{prayers.length - maxDisplay} more prayers
        </Text>
      )}

      {/* Empty State */}
      {prayers.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text variant="body" color="textSecondary" style={styles.emptyText}>
            Prayer times will appear here based on your location and date.
          </Text>
          <Text
            variant="caption"
            color="textTertiary"
            style={styles.emptySubtext}
          >
            May Allah guide us to establish regular prayers 🤲
          </Text>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: SPACING.MD,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.SM,
    ...TYPOGRAPHY.h4,
  },
  summaryContainer: {
    width: '100%',
    marginBottom: SPACING.SM,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.XS,
  },
  progressBar: {
    marginBottom: SPACING.XS,
  },
  bonusStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.MD,
  },
  prayersContainer: {
    gap: SPACING.XS,
  },
  prayerItemContainer: {
    marginBottom: SPACING.XS,
  },
  qualityRaterContainer: {
    paddingHorizontal: SPACING.MD,
    paddingVertical: SPACING.SM,
    backgroundColor: Colors.surface,
    borderRadius: BORDER_RADIUS.SM,
    marginTop: SPACING.XS,
    borderLeftWidth: 3,
    borderLeftColor: Colors.prayer,
  },
  showMore: {
    textAlign: 'center',
    marginTop: SPACING.MD,
    ...TYPOGRAPHY.caption,
  },
  emptyContainer: {
    paddingVertical: SPACING['3XL'],
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: SPACING.SM,
  },
  emptySubtext: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default PrayersSection;
