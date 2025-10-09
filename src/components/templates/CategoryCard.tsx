/**
 * CategoryCard Template Component
 *
 * A reusable category card template that displays category information
 * with icon, label, score, and color-coded styling.
 *
 * @fileoverview Category card template component
 * @author Daily Routine Planner Team
 * @version 1.0.0
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text } from '@/components/atoms';
import { Colors } from '@/constants/Colors';
import { ICON_SIZES, SPACING } from '@/constants/design/Dimensions';

/**
 * Props for CategoryCard component
 */
interface CategoryCardProps {
  /** Category name/label */
  label: string;
  /** Icon name for the category */
  icon: string;
  /** Icon color */
  iconColor: string;
  /** Current score */
  currentScore: number;
  /** Maximum possible score */
  maxScore: number;
  /** Score color (calculated based on percentage) */
  scoreColor: string;
}

/**
 * CategoryCard Component
 * 
 * Displays a category with:
 * - Icon representing the category
 * - Category label
 * - Current score / max score
 * - Color-coded score based on performance
 * 
 * @param props - CategoryCard component props
 * @returns React functional component
 */
const CategoryCard: React.FC<CategoryCardProps> = ({
  label,
  icon,
  iconColor,
  currentScore,
  maxScore,
  scoreColor,
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
  // (No helper methods in this component)

  // ==========================================
  // Event Handlers
  // ==========================================
  // (No event handlers in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  // (No separate render methods in this component)

  // ==========================================
  // Return
  // ==========================================
  return (
    <View style={styles.categoryItem}>
      <Icon
        name={icon}
        size={ICON_SIZES.LG}
        color={iconColor}
      />
      <Text
        variant="caption"
        color="textSecondary"
        style={styles.categoryLabel}
      >
        {label}
      </Text>
      <Text
        variant="body"
        style={[
          styles.categoryScore,
          { color: scoreColor },
        ]}
      >
        {currentScore}/{maxScore}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    width: '48%',
    alignItems: 'center',
    padding: SPACING.SM + SPACING.XS, // 12px
    backgroundColor: Colors.surface,
    borderRadius: 8,
    marginBottom: SPACING.SM,
  },
  categoryLabel: {
    marginTop: SPACING.XS,
  },
  categoryScore: {
    marginTop: 2, // Keep small value for tight spacing
  },
});

export default CategoryCard;