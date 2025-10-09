/**
 * ScreenHeaderCard Template Component
 *
 * A reusable header card template that displays greeting, date, and contextual information
 * consistently across different screens.
 *
 * @fileoverview Screen header card template component
 * @author Daily Routine Planner Team
 * @version 1.0.0
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Card, Text } from '@/components/atoms';
import { Colors } from '@/constants/Colors';
import { BORDER_RADIUS, CardVariant, ELEVATION } from '@/constants/design';
import { ICON_SIZES, SPACING } from '@/constants/design/Dimensions';

/**
 * Props for ScreenHeaderCard component
 */
interface ScreenHeaderCardProps {
  /** Main greeting text */
  greeting?: string;
  /** Date to display */
  date?: string;
  /** Context information (work type, screen context, etc.) */
  contextInfo?: {
    /** Display text for context */
    text: string;
    /** Icon name for context */
    icon: string;
    /** Color for icon and text */
    color: string;
  };
  /** Whether to show greeting text */
  showGreeting?: boolean;
  /** Whether to show date */
  showDate?: boolean;
  /** Whether to show context info */
  showContext?: boolean;
}

/**
 * ScreenHeaderCard Component
 * 
 * Provides a consistent header structure for screens:
 * - Greeting message
 * - Current date formatted nicely
 * - Contextual information with icon
 * 
 * @param props - ScreenHeaderCard component props
 * @returns React functional component
 */
const ScreenHeaderCard: React.FC<ScreenHeaderCardProps> = ({
  greeting = 'Assalamu Alaikum! 🌅',
  date,
  contextInfo,
  showGreeting = true,
  showDate = true,
  showContext = true,
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
  const formatDate = (dateString?: string) => {
    const dateToFormat = dateString ? new Date(dateString) : new Date();
    return dateToFormat.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

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
    <Card
      variant={CardVariant.DEFAULT}
      padding={SPACING.MD}
      style={styles.headerCard}
    >
      <View style={styles.headerContent}>
        {showGreeting && (
          <Text variant="h3" color="primary" style={styles.greeting}>
            {greeting}
          </Text>
        )}
        
        {showDate && (
          <Text variant="body" color="textSecondary" style={styles.date}>
            {formatDate(date)}
          </Text>
        )}
        
        {showContext && contextInfo && (
          <View style={styles.contextContainer}>
            <Icon
              name={contextInfo.icon}
              size={ICON_SIZES.MD}
              color={contextInfo.color}
              style={styles.contextIcon}
            />
            <Text
              variant="bodySmall"
              style={[styles.contextText, { color: contextInfo.color }]}
            >
              {contextInfo.text}
            </Text>
          </View>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  headerCard: {
    marginHorizontal: SPACING.MD,
    marginTop: SPACING.MD,
    borderRadius: BORDER_RADIUS.LG,
    ...ELEVATION.CARD,
  },
  headerContent: {
    alignItems: 'center',
    paddingVertical: SPACING.SM,
  },
  greeting: {
    textAlign: 'center',
  },
  date: {
    marginTop: SPACING.XS,
    textAlign: 'center',
  },
  contextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.SM,
  },
  contextIcon: {
    marginRight: SPACING.XS,
  },
  contextText: {
    // Typography handled by variant
  },
});

export default ScreenHeaderCard;