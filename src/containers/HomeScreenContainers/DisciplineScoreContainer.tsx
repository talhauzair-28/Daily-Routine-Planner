/**
 * DisciplineScoreContainer
 *
 * Container component that handles discipline score logic and state management.
 * Isolates Redux state subscription to prevent unnecessary re-renders in parent screen.
 *
 * @fileoverview Discipline score section container for HomeScreen
 * @author Daily Routine Planner Team
 * @version 1.0.0
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { useSelector } from 'react-redux';

import { Text } from '@/components/atoms';
import { ScreenSection } from '@/components/templates';
import { Colors } from '@/constants/Colors';
import { TYPOGRAPHY } from '@/constants/design';
import { SPACING } from '@/constants/design/Dimensions';
import { RootState } from '@/store';
import { getScoreColor } from '@/utils';

/**
 * Props for DisciplineScoreContainer component
 */
interface DisciplineScoreContainerProps {
  /** Maximum possible score */
  maxScore: number;
}

/**
 * DisciplineScoreContainer Component
 * 
 * Handles discipline score display:
 * - Subscribes only to discipline-related Redux state
 * - Calculates score level and percentage
 * - Renders score with color-coded styling
 * - Uses ScreenSection template for consistency
 * 
 * @param props - DisciplineScoreContainer component props
 * @returns React functional component
 */
const DisciplineScoreContainer: React.FC<DisciplineScoreContainerProps> = ({
  maxScore = 32,
}) => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  // (No state variables in this component)

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
  const getOverallScore = () => {
    return dailyScores.total;
  };

  const getScoreLevel = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return 'Diamond 💎';
    if (percentage >= 80) return 'Gold 🥇';
    if (percentage >= 60) return 'Silver 🥈';
    if (percentage >= 40) return 'Bronze 🥉';
    return 'Needs Work 📈';
  };

  // ==========================================
  // Event Handlers
  // ==========================================
  // (No event handlers in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  // (No separate render methods in this component)

  // Computed values for render
  const overallScore = getOverallScore();
  const scorePercentage = (overallScore / maxScore) * 100;
  const scoreColorKey = getScoreColor(scorePercentage);

  // ==========================================
  // Return
  // ==========================================
  return (
    <ScreenSection
      title="Today's Discipline Score"
      icon="target"
      iconColor={Colors.primary}
    >
      <View style={styles.scoreContent}>
        <View style={styles.scoreCircle}>
          <Text
            variant="h1"
            style={[
              styles.scoreNumber,
              { color: Colors[scoreColorKey] },
            ]}
          >
            {overallScore}
          </Text>
          <Text
            variant="body"
            color="textSecondary"
            style={styles.scoreTotal}
          >
            / {maxScore}
          </Text>
        </View>
        <View style={styles.scoreDetails}>
          <Badge
            value={getScoreLevel(overallScore, maxScore)}
            badgeStyle={[
              styles.levelBadge,
              { backgroundColor: Colors[scoreColorKey] },
            ]}
            textStyle={styles.levelText}
          />
          <Text
            variant="bodySmall"
            color="textSecondary"
            style={styles.scorePercentage}
          >
            {Math.round(scorePercentage)}% Complete
          </Text>
        </View>
      </View>
    </ScreenSection>
  );
};

const styles = StyleSheet.create({
  scoreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scoreCircle: {
    alignItems: 'center',
  },
  scoreNumber: {
    // Typography handled by variant
  },
  scoreTotal: {
    marginTop: -SPACING.SM,
  },
  scoreDetails: {
    alignItems: 'center',
  },
  levelBadge: {
    paddingHorizontal: SPACING.SM + SPACING.XS, // 12px
    paddingVertical: SPACING.XS,
    borderRadius: SPACING.MD + SPACING.XS, // 20px
  },
  levelText: {
    ...TYPOGRAPHY.bodySmall,
  },
  scorePercentage: {
    marginTop: SPACING.SM,
  },
});

export default DisciplineScoreContainer;