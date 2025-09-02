/**
 * QualityRater Component (Molecule)
 *
 * A comprehensive quality rating component that combines star rating with descriptive labels.
 * Specifically designed for Islamic daily routine quality assessment (Prayer, Quran, Zikr, etc.).
 *
 * @component
 * @example
 * // Prayer quality rating
 * <QualityRater
 *   title="Prayer Quality"
 *   rating={4}
 *   onRatingChange={setPrayerRating}
 *   category="prayer"
 * />
 *
 * // Read-only Quran quality display
 * <QualityRater
 *   title="Quran Recitation"
 *   rating={5}
 *   readonly={true}
 *   category="quran"
 *   showDescription={true}
 * />
 *
 * @usage Used in:
 * - Prayer quality assessment
 * - Quran recitation rating
 * - Zikr session quality
 * - Learning session evaluation
 * - Family time quality rating
 * - Exercise quality assessment
 * - Organisms: PrayersSection, DashboardHeader
 * - Screens: TodayScreen, quality tracking forms
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Category, Size, SPACING } from '@/constants/design';
import { getQualityColor, getQualityDescription, getTitleColor } from '@/utils';

import { StarRating, Text } from '../atoms';

/**
 * Props for the QualityRater component
 * @interface QualityRaterProps
 */
interface QualityRaterProps {
  /**
   * Title/label for the quality rating
   */
  title: string;

  /**
   * Current rating value (0-5)
   * @default 0
   */
  rating: number;

  /**
   * Callback when rating changes
   */
  onRatingChange?: (rating: number) => void;

  /**
   * Category for contextual styling
   * @default Category.GENERAL
   */
  category?: Category;

  /**
   * Whether the rating is read-only
   * @default false
   */
  readonly?: boolean;

  /**
   * Whether to show quality description
   * @default true
   */
  showDescription?: boolean;

  /**
   * Star rating size
   * @default Size.MEDIUM
   */
  size?: Size;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Custom description text (overrides default)
   */
  customDescription?: string;
}

/**
 * QualityRater component for Islamic routine quality assessment
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const QualityRater: React.FC<QualityRaterProps> = ({
  title,
  rating,
  onRatingChange,
  category = Category.GENERAL,
  readonly = false,
  showDescription = true,
  size = Size.MEDIUM,
  style,
  customDescription,
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
   * Get quality description using centralized utility
   * @returns string - Quality description
   */
  const getDescription = (): string => {
    if (customDescription) return customDescription;
    if (rating === 0) return 'Not completed';
    if (rating === null || rating === undefined)
      return 'Tap stars to rate quality';

    return getQualityDescription(rating, category);
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
  return (
    <View style={[styles.container, style]}>
      {/* Title */}
      <Text variant="h6" color={getTitleColor(category)} style={styles.title}>
        {title}
      </Text>

      {/* Star Rating */}
      <View style={styles.ratingContainer}>
        <StarRating
          rating={rating}
          onRatingChange={onRatingChange}
          size={size}
          readonly={readonly}
          showQualityColors={true}
        />

        {/* Rating Number */}
        <Text
          variant="bodySmall"
          color="textSecondary"
          style={styles.ratingNumber}
        >
          {rating > 0 ? `${rating}/5` : '0/5'}
        </Text>
      </View>

      {/* Quality Description */}
      {showDescription && (
        <Text
          variant="caption"
          color={getQualityColor(rating)}
          style={styles.description}
        >
          {getDescription()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.SM,
  },
  title: {
    marginBottom: SPACING.XS,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.XS,
  },
  ratingNumber: {
    marginLeft: SPACING.SM,
    minWidth: 30,
  },
  description: {
    marginTop: SPACING.XS,
    fontStyle: 'italic',
  },
});

export default QualityRater;
