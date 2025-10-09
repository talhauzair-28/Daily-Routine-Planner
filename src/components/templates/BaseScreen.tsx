/**
 * BaseScreen Template Component
 *
 * A reusable template component that provides consistent structure and styling
 * for all screens in the Daily Routine Planner app.
 *
 * @fileoverview Base screen template for consistent screen structure
 * @author Daily Routine Planner Team
 * @version 1.0.0
 */

import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import { SPACING } from '@/constants/design/Dimensions';

/**
 * Props for BaseScreen component
 */
interface BaseScreenProps {
  /** Child components to render inside the screen */
  children: React.ReactNode;
  /** Whether to show vertical scroll indicator */
  showsVerticalScrollIndicator?: boolean;
  /** Whether to enable scrolling (default: true) */
  scrollable?: boolean;
  /** Additional style for the scroll view container */
  containerStyle?: ViewStyle;
  /** Additional style for the content wrapper */
  contentStyle?: ViewStyle;
  /** Background color override */
  backgroundColor?: string;
  /** Padding override for screen content */
  padding?: number;
}

/**
 * BaseScreen Component
 * 
 * Provides consistent structure for all screens:
 * - Standard background color
 * - Consistent padding and margins
 * - ScrollView wrapper (optional)
 * - Organized comment structure template
 * 
 * @param props - BaseScreen component props
 * @returns React functional component
 */
const BaseScreen: React.FC<BaseScreenProps> = ({
  children,
  showsVerticalScrollIndicator = false,
  scrollable = true,
  containerStyle,
  contentStyle,
  backgroundColor = Colors.background,
  padding = SPACING.MD,
}) => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  // (Screen-specific state variables go here)

  // ==========================================
  // Hooks/Custom Hooks
  // ==========================================
  // (Screen-specific hooks go here)

  // ==========================================
  // Use Effects
  // ==========================================
  // (Screen-specific useEffects go here)

  // ==========================================
  // Helper Methods
  // ==========================================
  // (Screen-specific helper methods go here)

  // ==========================================
  // Event Handlers
  // ==========================================
  // (Screen-specific event handlers go here)

  // ==========================================
  // Render Methods
  // ==========================================
  // (Screen-specific render methods go here)

  // ==========================================
  // Return
  // ==========================================
  if (scrollable) {
    return (
      <ScrollView
        style={[styles.scrollContainer, { backgroundColor }, containerStyle]}
        contentContainerStyle={[styles.scrollContent, { padding }, contentStyle]}
        showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View
      style={[
        styles.staticContainer,
        { backgroundColor, padding },
        containerStyle,
      ]}
    >
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  staticContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default BaseScreen;