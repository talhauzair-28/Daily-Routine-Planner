/**
 * StarRating Component (Atom)
 *
 * An interactive star rating component for quality assessment.
 * Provides visual feedback with color-coded ratings based on Islamic daily routine quality levels.
 *
 * @component
 * @example
 * // Interactive star rating
 * <StarRating
 *   rating={4}
 *   onRatingChange={setRating}
 *   size="large"
 * />
 *
 * // Read-only display
 * <StarRating
 *   rating={3}
 *   readonly={true}
 *   size="medium"
 * />
 *
 * @usage Used in:
 * - Prayer quality ratings
 * - Quran recitation quality
 * - Zikr session quality
 * - Learning session ratings
 * - Family time quality
 * - Exercise quality assessment
 * - Molecules: QualityRater
 * - Screens: TodayScreen, quality assessment forms
 */

import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import { QualityLevel, RELIGIOUS_DIMENSIONS, Size } from '@/constants/design';

import Icon from './Icon';

/**
 * Props for the StarRating component
 * @interface StarRatingProps
 */
interface StarRatingProps {
  /**
   * Current rating value (1-5)
   * @default 0
   */
  rating: number;

  /**
   * Maximum number of stars
   * @default 5
   */
  maxRating?: number;

  /**
   * Callback when rating changes (interactive mode)
   */
  onRatingChange?: (rating: number) => void;

  /**
   * Star size variant
   * @default Size.MEDIUM
   */
  size?: Size;

  /**
   * Whether the rating is read-only
   * @default false
   */
  readonly?: boolean;

  /**
   * Whether to show quality colors
   * @default true
   */
  showQualityColors?: boolean;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];

  /**
   * Custom star icon name
   * @default 'star'
   */
  starIcon?: string;

  /**
   * Custom empty star icon name
   * @default 'star-outline'
   */
  emptyStarIcon?: string;
}

/**
 * StarRating component for quality assessment
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  maxRating = QualityLevel.EXCELLENT,
  onRatingChange,
  size = Size.MEDIUM,
  readonly = false,
  showQualityColors = true,
  style,
  starIcon = 'star',
  emptyStarIcon = 'star-outline',
}) => {
  /**
   * Get star size based on size prop
   * @returns number - Star size in pixels
   */
  const getStarSize = (): number => {
    switch (size) {
      case Size.SMALL:
        return RELIGIOUS_DIMENSIONS.QUALITY_RATING.STAR_SIZE - 4;
      case Size.MEDIUM:
        return RELIGIOUS_DIMENSIONS.QUALITY_RATING.STAR_SIZE;
      case Size.LARGE:
        return RELIGIOUS_DIMENSIONS.QUALITY_RATING.STAR_SIZE + 8;
      default:
        return RELIGIOUS_DIMENSIONS.QUALITY_RATING.STAR_SIZE;
    }
  };

  /**
   * Get star color based on rating and quality colors setting
   * @param starIndex - Index of the star (1-based)
   * @returns string - Star color
   */
  const getStarColor = (starIndex: number): string => {
    if (starIndex > rating) {
      return Colors.textTertiary; // Empty star
    }

    if (!showQualityColors) {
      return Colors.warning; // Default star color
    }

    // Quality-based colors for Islamic daily routine
    switch (Math.ceil(rating)) {
      case 5:
        return Colors.excellent; // Excellent quality
      case 4:
        return Colors.good; // Good quality
      case 3:
        return Colors.average; // Average quality
      case 2:
        return Colors.poor; // Poor quality
      case 1:
        return Colors.bad; // Bad quality
      default:
        return Colors.textTertiary;
    }
  };

  /**
   * Handle star press
   * @param starIndex - Index of pressed star (1-based)
   */
  const handleStarPress = (starIndex: number) => {
    if (readonly || !onRatingChange) return;

    // Allow deselecting by tapping the same star
    const newRating = rating === starIndex ? 0 : starIndex;
    onRatingChange(newRating);
  };

  /**
   * Render individual star
   * @param starIndex - Index of the star (1-based)
   * @returns JSX.Element
   */
  const renderStar = (starIndex: number) => {
    const isFilled = starIndex <= rating;
    const iconName = isFilled ? starIcon : emptyStarIcon;
    const starColor = getStarColor(starIndex);

    const StarComponent = readonly ? View : TouchableOpacity;
    const starProps = readonly
      ? {}
      : {
          onPress: () => handleStarPress(starIndex),
          activeOpacity: 0.7,
        };

    return (
      <StarComponent
        key={starIndex}
        style={styles.starContainer}
        {...starProps}
      >
        <Icon name={iconName} size={getStarSize()} color={starColor} />
      </StarComponent>
    );
  };

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: maxRating }, (_, index) => renderStar(index + 1))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    marginRight: RELIGIOUS_DIMENSIONS.QUALITY_RATING.SPACING,
  },
});

export default StarRating;
