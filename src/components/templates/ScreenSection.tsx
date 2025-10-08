/**
 * ScreenSection Template Component
 *
 * A reusable section template that provides consistent card-based sections
 * with title and content area for screens.
 *
 * @fileoverview Screen section template component
 * @author Daily Routine Planner Team
 * @version 1.0.0
 */

import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Card, Text } from '@/components/atoms';
import { BORDER_RADIUS, CardVariant, ELEVATION } from '@/constants/design';
import { ICON_SIZES, SPACING } from '@/constants/design/Dimensions';

/**
 * Props for ScreenSection component
 */
interface ScreenSectionProps {
  /** Section title */
  title: string;
  /** Icon name for the section */
  icon?: string;
  /** Icon color */
  iconColor?: string;
  /** Section content */
  children: React.ReactNode;
  /** Additional style for the card */
  cardStyle?: ViewStyle;
  /** Additional style for the content area */
  contentStyle?: ViewStyle;
  /** Whether to show the header (title + icon) */
  showHeader?: boolean;
  /** Custom spacing between header and content */
  headerSpacing?: number;
}

/**
 * ScreenSection Component
 * 
 * Provides a consistent section structure:
 * - Card wrapper with standard styling
 * - Optional icon + title header
 * - Content area for custom components
 * - Consistent spacing and styling
 * 
 * @param props - ScreenSection component props
 * @returns React functional component
 */
const ScreenSection: React.FC<ScreenSectionProps> = ({
  title,
  icon,
  iconColor,
  children,
  cardStyle,
  contentStyle,
  showHeader = true,
  headerSpacing = SPACING.MD,
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
  const renderHeader = () => {
    if (!showHeader) return null;

    return (
      <View style={[styles.sectionHeader, { marginBottom: headerSpacing }]}>
        {icon && (
          <Icon
            name={icon}
            size={ICON_SIZES.LG}
            color={iconColor}
            style={styles.headerIcon}
          />
        )}
        <Text variant="h4" color="text" style={styles.sectionTitle}>
          {title}
        </Text>
      </View>
    );
  };

  // ==========================================
  // Return
  // ==========================================
  return (
    <Card
      variant={CardVariant.DEFAULT}
      style={[styles.sectionCard, cardStyle]}
    >
      {renderHeader()}
      <View style={[styles.content, contentStyle]}>
        {children}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    marginHorizontal: SPACING.MD,
    marginTop: SPACING.SM + SPACING.XS, // 12px - consistent with HomeScreen
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.MD,
    ...ELEVATION.CARD,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: SPACING.SM,
  },
  sectionTitle: {
    textAlign: 'center',
  },
  content: {
    // Content area - flex as needed
  },
});

export default ScreenSection;