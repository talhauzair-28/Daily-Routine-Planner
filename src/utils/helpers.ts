/**
 * Common Helper Utilities
 *
 * Centralized helper functions to eliminate code duplication across components.
 * These utilities provide consistent behavior for common operations like
 * quality assessment, scoring, streaks, and Islamic app-specific functionality.
 *
 * @usage Used across:
 * - Components: QualityRater, ScoreCard, StreakBadge, DashboardHeader
 * - Organisms: PrayersSection, StreaksSection, DisciplineScoreBoard
 * - Screens: HomeScreen, TodayScreen for consistent behavior
 */

import { Colors } from '../constants/Colors';
import {
  BadgeVariant,
  Category,
  IconSize,
  ProgressVariant,
  Size,
} from '../constants/design';

/**
 * ===========================================
 * QUALITY & SCORING UTILITIES
 * ===========================================
 */

/**
 * Get quality-based color value for consistent quality visualization
 * @param quality - Quality rating (1-5)
 * @returns Color value from Colors object
 */
export const getQualityColor = (quality: number): keyof typeof Colors => {
  if (quality >= 4.5) return `excellent`;
  if (quality >= 3.5) return `good`;
  if (quality >= 2.5) return `average`;
  if (quality >= 1.5) return `poor`;
  if (quality >= 1) return `bad`;
  return `textTertiary`;
};

/**
 * Get quality description with Islamic context
 * @param quality - Quality rating (1-5)
 * @param category - Optional category for specific descriptions
 * @returns Descriptive text for quality level
 */
export const getQualityDescription = (
  quality: number,
  category?: Category
): string => {
  const rating = Math.ceil(quality);

  switch (rating) {
    case 5:
      return category === Category.PRAYER
        ? 'Excellent - Perfect khushoo with complete focus and devotion'
        : 'Excellent - Exceptional quality with full focus and devotion';
    case 4:
      return category === Category.PRAYER
        ? 'Good - Strong concentration with minor distractions'
        : 'Good - High quality with minor distractions';
    case 3:
      return category === Category.PRAYER
        ? 'Average - Moderate focus, room for spiritual improvement'
        : 'Average - Acceptable quality, room for improvement';
    case 2:
      return category === Category.PRAYER
        ? 'Poor - Distracted, needs more spiritual preparation'
        : 'Poor - Below expectations, significant improvement needed';
    case 1:
      return category === Category.PRAYER
        ? "Bad - Minimal focus, seek Allah's guidance for better concentration"
        : 'Bad - Requires immediate attention and improvement';
    default:
      return 'Not rated yet';
  }
};

/**
 * Get score-based color key for Text components
 * @param percentage - Score percentage (0-100)
 * @returns Color key from Colors object
 */
export const getScoreColor = (percentage: number): keyof typeof Colors => {
  // Islamic routine specific thresholds
  if (percentage >= 90) return 'excellent'; // Excellent (90-100%)
  if (percentage >= 75) return 'good'; // Good (75-89%)
  if (percentage >= 60) return 'average'; // Average (60-74%)
  if (percentage >= 40) return 'poor'; // Poor (40-59%)
  return 'bad'; // Bad (0-39%)
};

/**
 * Get progress variant based on score percentage
 * @param percentage - Score percentage (0-100)
 * @returns ProgressVariant enum value
 */
export const getProgressVariant = (percentage: number): ProgressVariant => {
  // Islamic routine specific thresholds
  if (percentage >= 90) return ProgressVariant.EXCELLENT; // Excellent (90-100%)
  if (percentage >= 75) return ProgressVariant.GOOD; // Good (75-89%)
  if (percentage >= 60) return ProgressVariant.AVERAGE; // Average (60-74%)
  if (percentage >= 40) return ProgressVariant.POOR; // Poor (40-59%)
  return ProgressVariant.ERROR; // Bad (0-39%)
};

/**
 * Get title color based on category for consistent theming
 * @param category - Category type
 * @returns Color key from Colors object
 */
export const getTitleColor = (category: Category): keyof typeof Colors => {
  switch (category) {
    case Category.PRAYER:
      return 'prayer';
    case Category.QURAN:
      return 'quran';
    case Category.ZIKR:
      return 'zikr';
    case Category.LEARNING:
      return 'secondary';
    case Category.FAMILY:
      return 'error'; // Pink-ish
    case Category.EXERCISE:
      return 'warning';
    case Category.GENERAL:
    default:
      return 'text';
  }
};

/**
 * Get badge variant based on score percentage
 * @param percentage - Score percentage (0-100)
 * @returns BadgeVariant enum value
 */
export const getScoreBadgeVariant = (percentage: number): BadgeVariant => {
  // Islamic routine scoring thresholds
  if (percentage >= 90) return BadgeVariant.SUCCESS; // Excellent
  if (percentage >= 75) return BadgeVariant.SUCCESS; // Good
  if (percentage >= 60) return BadgeVariant.WARNING; // Average
  if (percentage >= 40) return BadgeVariant.WARNING; // Needs improvement
  return BadgeVariant.ERROR; // Requires attention
};

/**
 * ===========================================
 * STREAK UTILITIES
 * ===========================================
 */

/**
 * Get streak-based color for consistent streak visualization
 * @param streakCount - Number of consecutive days
 * @returns Color value from Colors object
 */
export const getStreakColor = (streakCount: number): keyof typeof Colors => {
  if (streakCount >= 30) return `excellent`; // 30+ days - Excellent
  if (streakCount >= 14) return `good`; // 2+ weeks - Good
  if (streakCount >= 7) return `average`; // 1+ week - Average
  if (streakCount >= 3) return `warning`; // 3+ days - Warning
  if (streakCount >= 1) return `poor`; // 1+ day - Poor
  return `textTertiary`; // No streak
};

/**
 * Get streak badge variant based on streak count
 * @param streakCount - Number of consecutive days
 * @returns BadgeVariant enum value
 */
export const getStreakVariant = (streakCount: number): BadgeVariant => {
  if (streakCount >= 30) return BadgeVariant.SUCCESS;
  if (streakCount >= 14) return BadgeVariant.STREAK;
  if (streakCount >= 7) return BadgeVariant.WARNING;
  return BadgeVariant.SECONDARY;
};

/**
 * Get formatted streak text
 * @param streakCount - Number of consecutive days
 * @param customText - Optional custom text override
 * @returns Formatted streak text
 */
export const getStreakText = (
  streakCount: number,
  customText?: string
): string => {
  if (customText) return customText;

  if (streakCount === 0) return 'No streak';
  if (streakCount === 1) return '1 day';
  return `${streakCount} days`;
};

/**
 * ===========================================
 * ISLAMIC UTILITIES
 * ===========================================
 */

/**
 * Get prayer-specific icon based on prayer name
 * @param prayerName - Name of the prayer
 * @returns Icon name string for Material Icons
 */
export const getPrayerIcon = (prayerName: string): string => {
  switch (prayerName.toLowerCase()) {
    case 'fajr':
      return 'weather-sunset-up'; // Dawn
    case 'dhuhr':
      return 'weather-sunny'; // Noon
    case 'asr':
      return 'weather-sunset-down'; // Afternoon
    case 'maghrib':
      return 'weather-sunset'; // Sunset
    case 'isha':
      return 'weather-night'; // Night
    default:
      return 'mosque'; // Default mosque icon
  }
};

/**
 * Format time string for display
 * @param time - Time string in HH:mm format
 * @returns Formatted time string with AM/PM
 */
export const formatTime = (time: string): string => {
  try {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return time; // Return original if parsing fails
  }
};

/**
 * ===========================================
 * MOTIVATIONAL UTILITIES
 * ===========================================
 */

/**
 * Get motivational message based on score percentage
 * @param percentage - Score percentage (0-100)
 * @param context - Context for specific messaging (dashboard, score, streak)
 * @returns Motivational message with Islamic context
 */
export const getMotivationalMessage = (
  percentage: number,
  context: 'dashboard' | 'score' | 'streak' = 'dashboard'
): string => {
  if (context === 'score') {
    if (percentage >= 95)
      return '🌟 Exceptional! May Allah bless your dedication!';
    if (percentage >= 90) return '⭐ Excellent work! Keep up the great effort!';
    if (percentage >= 75) return "👍 Good progress! You're doing well!";
    if (percentage >= 60) return '📈 Fair effort, room for improvement!';
    if (percentage >= 40) return '💪 Keep trying, every effort counts!';
    return "🤲 Don't give up, start small and build up!";
  }

  if (context === 'dashboard') {
    if (percentage >= 95) return "Masha'Allah! Exceptional dedication! 🌟";
    if (percentage >= 90) return 'Alhamdulillah! Excellent progress! ⭐';
    if (percentage >= 75) return 'Keep up the good work! 👍';
    if (percentage >= 60) return 'Steady progress, keep going! 📈';
    if (percentage >= 40) return 'Every step counts, stay strong! 💪';
    return 'New day, fresh start! You can do this! 🤲';
  }

  // Default general motivational messages
  if (percentage >= 90) return 'Alhamdulillah! Outstanding commitment!';
  if (percentage >= 75) return "Masha'Allah! Great consistency!";
  if (percentage >= 60) return 'Good effort! Keep building those habits!';
  if (percentage >= 40) return 'Every step towards Allah is blessed!';
  return 'Start small, stay consistent, trust Allah!';
};

/**
 * Get streak-specific motivational message
 * @param streakCount - Current streak count
 * @param longestStreak - Longest streak achieved
 * @param totalStreaks - Total number of streaks
 * @returns Streak-specific motivational message
 */
export const getStreakMotivationalMessage = (
  streakCount: number,
  longestStreak: number = 0,
  totalStreaks: number = 0
): string => {
  if (totalStreaks === 0) {
    return 'Start your first habit today! Every journey begins with a single step. 🌱';
  }

  if (longestStreak >= 100) {
    return "Masha'Allah! Century streaks achieved! You're an inspiration! 🏆";
  }

  if (streakCount >= 30) {
    return `${streakCount} days strong! You're building amazing habits! 🔥`;
  }

  if (streakCount >= 7) {
    return `Week ${Math.floor(streakCount / 7)} of consistency! Keep it up! 📅`;
  }

  if (streakCount >= 3) {
    return 'Great start! Consistency is the key to success! 💪';
  }

  return 'Every day is a new opportunity to grow closer to Allah! 🤲';
};

/**
 * ===========================================
 * SIZE & ICON UTILITIES
 * ===========================================
 */

/**
 * Convert Size enum to IconSize enum
 * @param size - Size enum value
 * @returns IconSize enum value
 */
export const sizeToIconSize = (size: Size): IconSize => {
  switch (size) {
    case Size.SMALL:
      return IconSize.SM;
    case Size.MEDIUM:
      return IconSize.MD;
    case Size.LARGE:
      return IconSize.LG;
    default:
      return IconSize.MD;
  }
};

/**
 * Get numeric icon size from IconSize enum or number
 * @param size - IconSize enum value or number
 * @param iconSizes - Icon sizes object from design system
 * @returns Numeric size in pixels
 */
export const getNumericIconSize = (
  size: IconSize | number,
  iconSizes: Record<string, number>
): number => {
  if (typeof size === 'number') {
    return size;
  }
  return iconSizes[size as keyof typeof iconSizes] || iconSizes.MD;
};
