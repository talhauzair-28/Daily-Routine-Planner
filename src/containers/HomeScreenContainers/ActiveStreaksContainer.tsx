/**
 * ActiveStreaksContainer
 *
 * Container component that handles active streaks logic and state management.
 * Isolates Redux state subscription to prevent unnecessary re-renders in parent screen.
 *
 * @fileoverview Active streaks section container for HomeScreen
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

/**
 * Props for ActiveStreaksContainer component
 */
interface ActiveStreaksContainerProps {
  /** Maximum number of streaks to display */
  maxStreaks?: number;
}

/**
 * ActiveStreaksContainer Component
 * 
 * Handles active streaks display:
 * - Subscribes only to streaks-related Redux state
 * - Renders streak items with color-coded badges
 * - Uses ScreenSection template for consistency
 * - Limits display to top streaks for performance
 * 
 * @param props - ActiveStreaksContainer component props
 * @returns React functional component
 */
const ActiveStreaksContainer: React.FC<ActiveStreaksContainerProps> = ({
  maxStreaks = 3,
}) => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  // (No state variables in this component)

  // ==========================================
  // Hooks/Custom Hooks
  // ==========================================
  // Only subscribe to streaks-related state to prevent unnecessary re-renders
  const activeStreaks = useSelector((state: RootState) => state.streaks.activeStreaks);

  // ==========================================
  // Use Effects
  // ==========================================
  // (No useEffect in this component)

  // ==========================================
  // Helper Methods
  // ==========================================
  const getStreakBadgeColor = (streakCount: number) => {
    if (streakCount >= 30) return Colors.excellent;
    if (streakCount >= 14) return Colors.good;
    if (streakCount >= 7) return Colors.average;
    return Colors.warning;
  };

  const getDisplayedStreaks = () => {
    return activeStreaks.slice(0, maxStreaks);
  };

  // ==========================================
  // Event Handlers
  // ==========================================
  // (No event handlers in this component)

  // ==========================================
  // Render Methods
  // ==========================================
  const renderStreakItem = (streak: any) => (
    <View key={streak.id} style={styles.streakItem}>
      <Text variant="bodySmall" color="text" style={styles.streakName}>
        {streak.habitName}
      </Text>
      <Badge
        value={`${streak.currentStreak} days`}
        badgeStyle={[
          styles.streakBadge,
          { backgroundColor: getStreakBadgeColor(streak.currentStreak) },
        ]}
        textStyle={styles.streakText}
      />
    </View>
  );

  const renderStreaksContent = () => {
    const displayedStreaks = getDisplayedStreaks();
    
    if (displayedStreaks.length === 0) {
      return (
        <Text variant="body" color="textSecondary" style={styles.noStreaksText}>
          No active streaks yet. Start building your habits! 💪
        </Text>
      );
    }

    return (
      <View style={styles.streaksContainer}>
        {displayedStreaks.map(renderStreakItem)}
      </View>
    );
  };

  // ==========================================
  // Return
  // ==========================================
  return (
    <ScreenSection
      title="Active Streaks 🔥"
      icon="fire"
      iconColor={Colors.accent}
    >
      {renderStreaksContent()}
    </ScreenSection>
  );
};

const styles = StyleSheet.create({
  streaksContainer: {
    gap: SPACING.SM,
  },
  streakItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.SM,
    paddingHorizontal: SPACING.XS,
  },
  streakName: {
    flex: 1,
  },
  streakBadge: {
    borderRadius: 12,
    paddingHorizontal: SPACING.SM,
  },
  streakText: {
    ...TYPOGRAPHY.bodySmall,
  },
  noStreaksText: {
    textAlign: 'center',
    paddingVertical: SPACING.LG,
  },
});

export default ActiveStreaksContainer;