/**
 * ActivityItem Component (Molecule)
 *
 * A comprehensive activity/task item component for Islamic daily routine tracking.
 * Displays activity status, quality ratings, timing, and interactive elements.
 *
 * @component
 * @example
 * // Prayer activity with quality rating
 * <ActivityItem
 *   title="Fajr Prayer"
 *   subtitle="Dawn prayer - First light"
 *   time="5:30 AM"
 *   quality={4}
 *   completed={true}
 *   iconName="mosque"
 *   category="prayer"
 *   onPress={handlePrayerPress}
 * />
 *
 * // Quran reading with progress badge
 * <ActivityItem
 *   title="Quran Reading"
 *   subtitle="Surah Al-Baqarah"
 *   time="30 min"
 *   completed={false}
 *   iconName="book-open-variant"
 *   category="quran"
 *   badge={{ text: "2/5 pages", variant: "warning" }}
 * />
 *
 * @usage Used in:
 * - Daily activity lists
 * - Prayer time displays
 * - Habit tracking items
 * - Quality assessment lists
 * - Progress tracking
 * - Organisms: PrayersSection, DashboardHeader
 * - Screens: TodayScreen, HabitsScreen, activity lists
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import {
  BadgeVariant,
  BORDER_RADIUS,
  Category,
  Colors,
  COMPONENT_DIMENSIONS,
  IconSize,
  Size,
  SPACING,
  TYPOGRAPHY,
} from '@/constants/design';
import { getQualityDescription } from '@/utils';

import { Badge, Icon, Text } from '../atoms';

/**
 * Props for the ActivityItem component
 * @interface ActivityItemProps
 */
interface ActivityItemProps {
  /**
   * Activity title/name
   */
  title: string;

  /**
   * Optional subtitle or description
   */
  subtitle?: string;

  /**
   * Time information (duration, scheduled time, etc.)
   */
  time?: string;

  /**
   * Quality rating (1-5 stars)
   */
  quality?: number;

  /**
   * Whether the activity is completed
   * @default false
   */
  completed?: boolean;

  /**
   * Material Community Icon name
   */
  iconName?: string;

  /**
   * Activity category for contextual styling
   * @default 'general'
   */
  category?: Category;

  /**
   * Optional badge to display
   */
  badge?: {
    text: string;
    variant?: BadgeVariant;
  };

  /**
   * Whether to show quality stars
   * @default true
   */
  showQuality?: boolean;

  /**
   * Whether the item is interactive
   * @default true
   */
  interactive?: boolean;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Callback when item is pressed
   */
  onPress?: () => void;

  /**
   * Callback when quality stars are pressed
   */
  onQualityPress?: (rating: number) => void;
}

/**
 * ActivityItem component for Islamic routine activity tracking
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const ActivityItem: React.FC<ActivityItemProps> = ({
  title,
  subtitle,
  time,
  quality,
  completed = false,
  iconName,
  category = Category.GENERAL,
  badge,
  showQuality = true,
  interactive = true,
  style,
  onPress,
  onQualityPress,
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
   * Get status color based on completion and quality
   * @returns keyof typeof Colors - Color key
   */
  const getStatusColor = (): keyof typeof Colors => {
    if (completed) {
      if (quality) {
        if (quality >= 4) return 'excellent';
        if (quality >= 3) return 'good';
        if (quality >= 2) return 'average';
        return 'poor';
      }
      return 'success';
    }
    return 'textTertiary';
  };

  /**
   * Get category color for icon background
   * @returns keyof typeof Colors - Color key
   */
  const getCategoryColor = (): keyof typeof Colors => {
    switch (category) {
      case Category.PRAYER:
        return 'prayer';
      case Category.QURAN:
        return 'quran';
      case Category.ZIKR:
        return 'zikr';
      case Category.LEARNING:
        return 'secondary';
      case Category.FAMILY:
        return 'error'; // Pink-ish
      case Category.EXERCISE:
        return 'warning';
      default:
        return completed ? 'success' : 'textTertiary';
    }
  };

  /**
   * Get completion status text
   * @returns string - Status text
   */
  const getStatusText = (): string => {
    if (completed) {
      if (quality && quality > 0) {
        // Extract just the first word from quality description
        const description = getQualityDescription(quality, category);
        return description.split(' ')[0]; // Get "Excellent", "Good", etc.
      }
      return 'Completed';
    }
    return 'Pending';
  };

  /**
   * Render quality stars
   */
  const renderQualityStars = () => {
    if (!showQuality || !quality) return null;

    return (
      <View style={styles.qualityContainer}>
        {Array.from({ length: 5 }, (_, index) => {
          const starIndex = index + 1;
          const isFilled = starIndex <= quality;

          return (
            <TouchableOpacity
              key={index}
              onPress={() => onQualityPress?.(starIndex)}
              disabled={!onQualityPress}
              style={styles.starButton}
            >
              <Icon
                name={isFilled ? 'star' : 'star-outline'}
                size={IconSize.SM}
                color={isFilled ? getStatusColor() : 'textTertiary'}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  // Computed values for render
  const Container = interactive && onPress ? TouchableOpacity : View;
  const containerProps =
    interactive && onPress
      ? {
          onPress,
          activeOpacity: 0.7,
        }
      : {};

  // ==========================================
  // Event Handlers
  // ==========================================
  // (Event handlers are passed as props in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  // (renderQualityStars method is already defined above)

  // ==========================================
  // Return
  // ==========================================
  return (
    <Container
      style={[
        styles.container,
        {
          opacity: completed ? 1 : 0.8,
          backgroundColor: completed ? Colors.focused : Colors.transparent,
        },
        style,
      ]}
      {...containerProps}
    >
      {/* Left Section - Icon and Text */}
      <View style={styles.leftSection}>
        {iconName && (
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: Colors[getCategoryColor()] },
            ]}
          >
            <Icon name={iconName} size={IconSize.MD} color="textOnPrimary" />
          </View>
        )}

        <View style={styles.textContainer}>
          <Text
            variant="body"
            color="text"
            style={[styles.title, ...(completed ? [styles.completedText] : [])]}
          >
            {title}
          </Text>

          {subtitle && (
            <Text
              variant="caption"
              color="textSecondary"
              style={styles.subtitle}
            >
              {subtitle}
            </Text>
          )}

          {time && (
            <Text
              variant="captionSmall"
              color="textTertiary"
              style={styles.time}
            >
              ⏰ {time}
            </Text>
          )}
        </View>
      </View>

      {/* Right Section - Status, Quality, Badge */}
      <View style={styles.rightSection}>
        {/* Status Badge */}
        <Text
          variant="captionSmall"
          color={getStatusColor()}
          style={styles.status}
        >
          {getStatusText()}
        </Text>

        {/* Custom Badge */}
        {badge && (
          <Badge
            value={badge.text}
            variant={badge.variant || BadgeVariant.PRIMARY}
            size={Size.SMALL}
            style={styles.badge}
          />
        )}

        {/* Quality Stars */}
        {renderQualityStars()}

        {/* Completion Check */}
        {completed && (
          <Icon
            name="check-circle"
            size={IconSize.MD}
            color={completed ? 'success' : 'textTertiary'}
            style={styles.checkIcon}
          />
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.MD,
    paddingHorizontal: SPACING.MD,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    borderRadius: BORDER_RADIUS.SM,
    marginVertical: SPACING.XS,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: COMPONENT_DIMENSIONS.AVATAR.SIZE_MD,
    height: COMPONENT_DIMENSIONS.AVATAR.SIZE_MD,
    borderRadius: COMPONENT_DIMENSIONS.AVATAR.SIZE_MD / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.MD,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: SPACING.XS / 2,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  subtitle: {
    marginBottom: SPACING.XS / 2,
  },
  time: {
    fontStyle: 'italic',
  },
  rightSection: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  status: {
    marginBottom: SPACING.XS,
    ...TYPOGRAPHY.captionSmall,
  },
  badge: {
    marginBottom: SPACING.XS,
  },
  qualityContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.XS,
  },
  starButton: {
    padding: 2,
  },
  checkIcon: {
    marginTop: SPACING.XS,
  },
});

export default ActivityItem;
