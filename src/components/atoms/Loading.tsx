/**
 * Loading Component (Atom)
 *
 * A flexible loading indicator component with consistent styling and behavior.
 * Provides both inline and full-screen loading states with customizable text.
 *
 * @component
 * @example
 * // Full screen loading
 * <Loading
 *   fullScreen={true}
 *   text="Loading Daily Routine Planner..."
 *   size="large"
 * />
 *
 * // Inline loading
 * <Loading
 *   size="small"
 *   text="Saving..."
 *   color="primary"
 * />
 *
 * @usage Used in:
 * - App initialization (LoadingScreen.tsx)
 * - Data fetching states
 * - Form submissions
 * - Async operations
 * - Screen transitions
 * - Component loading states
 */

import React from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';

import { Colors } from '@/constants/Colors';
import { SPACING } from '@/constants/design';

import Text from './Text';

/**
 * Props for the Loading component
 * @interface LoadingProps
 */
interface LoadingProps {
  /**
   * Size of the loading indicator
   * @default Size.LARGE
   */
  size?: 'small' | 'large';

  /**
   * Color of the loading indicator
   * @default Colors.primary
   */
  color?: keyof typeof Colors | string;

  /**
   * Loading text to display below indicator
   * @default 'Loading...'
   */
  text?: string;

  /**
   * Whether to show as full screen overlay
   * @default false
   */
  fullScreen?: boolean;

  /**
   * Additional container styles
   */
  style?: ViewStyle | ViewStyle[];
}

/**
 * Loading component for indicating loading states
 *
 * @param props - Component props
 * @returns JSX.Element
 */
const Loading: React.FC<LoadingProps> = ({
  size = 'large',
  color = 'primary',
  text = 'Loading...',
  fullScreen = false,
  style,
}) => {
  /**
   * Get color value from design system or use custom color
   * @returns string - Color value
   */
  const getColorValue = (): string => {
    if (typeof color === 'string' && color.startsWith('#')) {
      return color; // Custom color
    }
    return Colors[color as keyof typeof Colors] || Colors.primary;
  };

  const containerStyle = fullScreen
    ? styles.fullScreenContainer
    : styles.container;

  return (
    <View style={[containerStyle, style]}>
      <ActivityIndicator size={size} color={getColorValue()} />
      {text && (
        <Text variant="body" color="textSecondary" style={styles.text}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.LG,
  },
  fullScreenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  text: {
    marginTop: SPACING.SM,
    textAlign: 'center',
  },
});

export default Loading;
