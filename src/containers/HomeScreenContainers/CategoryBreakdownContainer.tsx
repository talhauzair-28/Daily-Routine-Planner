/**
 * CategoryBreakdownContainer
 *
 * Container component that handles category breakdown logic and state management.
 * Isolates Redux state subscription to prevent unnecessary re-renders in parent screen.
 *
 * @fileoverview Category breakdown section container for HomeScreen
 * @author Daily Routine Planner Team
 * @version 1.0.0
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import { CategoryCard, ScreenSection } from '@/components/templates';
import { Colors } from '@/constants/Colors';
import { RootState } from '@/store';
import { getScoreColor } from '@/utils';
import { t } from '@/utils/i18n';

/**
 * CategoryBreakdownContainer Component
 * 
 * Handles category breakdown display:
 * - Subscribes only to discipline-related Redux state
 * - Renders category cards with scores and colors
 * - Uses ScreenSection and CategoryCard templates
 * - Optimizes performance by isolating state subscriptions
 * 
 * @returns React functional component
 */
const CategoryBreakdownContainer: React.FC = () => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  // Category configuration with max scores
  const categories = [
    {
      key: 'timing' as const,
      label: t('timing'),
      icon: 'clock-outline',
      iconColor: Colors.primary,
      maxScore: 11,
    },
    {
      key: 'spiritual' as const,
      label: t('spiritual'),
      icon: 'mosque',
      iconColor: Colors.spiritual,
      maxScore: 9,
    },
    {
      key: 'family' as const,
      label: t('family'),
      icon: 'heart-multiple',
      iconColor: Colors.family,
      maxScore: 4,
    },
    {
      key: 'personal' as const,
      label: 'Personal',
      icon: 'dumbbell',
      iconColor: Colors.accent,
      maxScore: 8,
    },
  ];

  // ==========================================
  // Hooks/Custom Hooks
  // ==========================================
  // Only subscribe to discipline-related state to prevent unnecessary re-renders
  const dailyScores = useSelector((state: RootState) => state.discipline.dailyScores);

  // ==========================================
  // Use Effects
  // ==========================================
  // (No useEffect in this component)

  // ==========================================
  // Helper Methods
  // ==========================================
  const getCategoryScore = (categoryKey: keyof typeof dailyScores) => {
    return dailyScores[categoryKey] || 0;
  };

  const getCategoryScoreColor = (currentScore: number, maxScore: number) => {
    const percentage = (currentScore / maxScore) * 100;
    return Colors[getScoreColor(percentage)];
  };

  // ==========================================
  // Event Handlers
  // ==========================================
  // (No event handlers in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  const renderCategoryCards = () => {
    return categories.map(category => {
      const currentScore = getCategoryScore(category.key);
      const scoreColor = getCategoryScoreColor(currentScore, category.maxScore);

      return (
        <CategoryCard
          key={category.key}
          label={category.label}
          icon={category.icon}
          iconColor={category.iconColor}
          currentScore={currentScore}
          maxScore={category.maxScore}
          scoreColor={scoreColor}
        />
      );
    });
  };

  // ==========================================
  // Return
  // ==========================================
  return (
    <ScreenSection
      title={t('categoryBreakdown')}
      icon="view-grid"
      iconColor={Colors.secondary}
    >
      <View style={styles.categoriesGrid}>
        {renderCategoryCards()}
      </View>
    </ScreenSection>
  );
};

const styles = StyleSheet.create({
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default CategoryBreakdownContainer;