/**
 * QuickActionsContainer
 *
 * Container component that handles quick actions logic and navigation.
 * Provides navigation actions without requiring Redux state subscriptions.
 *
 * @fileoverview Quick actions section container for HomeScreen
 * @author Daily Routine Planner Team
 * @version 1.0.0
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button } from '@/components/atoms';
import { ScreenSection } from '@/components/templates';
import { Colors } from '@/constants/Colors';
import { ICON_SIZES, SPACING } from '@/constants/design/Dimensions';
import { t } from '@/utils/i18n';

/**
 * Action button configuration interface
 */
interface ActionButton {
  /** Button title */
  title: string;
  /** Icon name */
  icon: string;
  /** Background color */
  backgroundColor: string;
  /** Action to execute when pressed */
  onPress: () => void;
}

/**
 * Props for QuickActionsContainer component
 */
interface QuickActionsContainerProps {
  /** Navigation callbacks for each action */
  onNavigateToToday?: () => void;
  onNavigateToDiscipline?: () => void;
  onNavigateToAnalytics?: () => void;
  onNavigateToHabits?: () => void;
}

/**
 * QuickActionsContainer Component
 * 
 * Handles quick action buttons:
 * - No Redux state subscriptions (pure presentation)
 * - Configurable navigation callbacks
 * - Uses ScreenSection template for consistency
 * - Reusable across different screens
 * 
 * @param props - QuickActionsContainer component props
 * @returns React functional component
 */
const QuickActionsContainer: React.FC<QuickActionsContainerProps> = ({
  onNavigateToToday = () => {},
  onNavigateToDiscipline = () => {},
  onNavigateToAnalytics = () => {},
  onNavigateToHabits = () => {},
}) => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  const actionButtons: ActionButton[] = [
    {
      title: t('todaysProgress'),
      icon: 'today',
      backgroundColor: Colors.primary,
      onPress: onNavigateToToday,
    },
    {
      title: t('logQuality'),
      icon: 'star',
      backgroundColor: Colors.secondary,
      onPress: onNavigateToDiscipline,
    },
    {
      title: t('viewAnalytics'),
      icon: 'chart-line',
      backgroundColor: Colors.accent,
      onPress: onNavigateToAnalytics,
    },
    {
      title: t('habits'),
      icon: 'format-list-checks',
      backgroundColor: Colors.spiritual,
      onPress: onNavigateToHabits,
    },
  ];

  // ==========================================
  // Hooks/Custom Hooks
  // ==========================================
  // No Redux state subscriptions - this is a pure presentation component

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
  // (Event handlers are passed as props)

  // ==========================================
  // Render Methods
  // ==========================================
  const renderActionButton = (action: ActionButton) => (
    <Button
      key={action.title}
      title={action.title}
      icon={
        <Icon
          name={action.icon}
          size={ICON_SIZES.MD}
          color="white"
          style={styles.buttonIcon}
        />
      }
      buttonStyle={[
        styles.actionButton,
        { backgroundColor: action.backgroundColor },
      ]}
      onPress={action.onPress}
    />
  );

  const renderActionButtons = () => {
    return actionButtons.map(renderActionButton);
  };

  // ==========================================
  // Return
  // ==========================================
  return (
    <ScreenSection
      title={t('quickActions')}
      icon="lightning-bolt"
      iconColor={Colors.primary}
    >
      <View style={styles.actionsGrid}>
        {renderActionButtons()}
      </View>
    </ScreenSection>
  );
};

const styles = StyleSheet.create({
  actionsGrid: {
    gap: SPACING.SM + SPACING.XS, // 12px
  },
  actionButton: {
    borderRadius: 8,
    paddingVertical: SPACING.SM + SPACING.XS, // 12px
  },
  buttonIcon: {
    marginRight: SPACING.SM,
  },
});

export default QuickActionsContainer;