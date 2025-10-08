/**
 * PlaceholderScreen Template Component
 *
 * A template component for screens that are not yet fully implemented,
 * providing consistent structure and messaging.
 *
 * @fileoverview Placeholder screen template component
 * @author Daily Routine Planner Team
 * @version 1.0.0
 */

import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '@/components/atoms';
import { Colors } from '@/constants/Colors';
import { SPACING } from '@/constants/design/Dimensions';

import BaseScreen from './BaseScreen';

/**
 * Props for PlaceholderScreen component
 */
interface PlaceholderScreenProps {
  /** Screen title */
  title: string;
  /** Description of what will be implemented */
  description: string;
  /** Optional icon to display */
  emoji?: string;
}

/**
 * PlaceholderScreen Component
 * 
 * Provides a consistent placeholder structure for unimplemented screens:
 * - Standard screen layout using BaseScreen
 * - Centered content with title and description
 * - Consistent typography and spacing
 * - Optional emoji for visual interest
 * 
 * @param props - PlaceholderScreen component props
 * @returns React functional component
 */
const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({
  title,
  description,
  emoji = '🚧',
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
    <BaseScreen scrollable={false}>
      <View style={styles.container}>
        <Text variant="h1" style={styles.emoji}>
          {emoji}
        </Text>
        <Text variant="h1" color="text" style={styles.title}>
          {title}
        </Text>
        <Text variant="body" color="textSecondary" style={styles.description}>
          {description}
        </Text>
      </View>
    </BaseScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.LG,
  },
  emoji: {
    fontSize: 48,
    marginBottom: SPACING.MD,
    textAlign: 'center',
  },
  title: {
    marginBottom: SPACING.MD,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    maxWidth: 280, // Reasonable max width for readability
  },
});

export default PlaceholderScreen;