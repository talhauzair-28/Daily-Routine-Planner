/**
 * Models Index
 *
 * Central export file for all application models including:
 * - Enums: Type-safe constants and categories
 * - Interfaces: Data structure definitions
 * - Props: Component prop interfaces
 *
 * @fileoverview Centralized model exports for the Daily Routine Planner app
 * @author Daily Routine Planner Team
 * @version 1.0.0
 */

// Export all enums
export * from './enums';

// Export all interfaces
export * from './interfaces';

// Export all component props
export * from './props/atoms';
export * from './props/molecules';
export * from './props/organisms';

// Re-export commonly used types for convenience
export type {
  // Core data interfaces
  DailyRecord,
  Prayer,
  ZikrSession,
  QuranSession,
  LearningSession,
  FamilyTime,
  Exercise,
  DisciplineChallenge,
  Streak,
  WeeklyAnalysis,
  MonthlyAnalysis,
  UserSettings,
} from './interfaces';

// Re-export component props
export type {
  CustomButtonProps,
  CustomTextProps,
  CustomInputProps,
  CustomSwitchProps,
  CustomBadgeProps,
  ProgressBarProps,
  IconProps,
  CustomCardProps,
  LoadingProps,
  StarRatingProps,
} from './props/atoms';

export type {
  ScoreCardProps,
  QualityRaterProps,
  ActivityItemProps,
  StreakBadgeProps,
} from './props/molecules';

export type {
  DashboardHeaderProps,
  DisciplineScoreBoardProps,
  PrayersSectionProps,
  StreaksSectionProps,
  FamilyTimeSectionProps,
  ExerciseSectionProps,
} from './props/organisms';

// Re-export commonly used enums for convenience
export {
  // Core categories
  Category,
  DisciplineCategory,
  QualityLevel,
  WorkType,
  Status,

  // Component variants
  ButtonVariant,
  BadgeVariant,
  ProgressVariant,
  CardVariant,
  InputVariant,
  DisplayVariant,
  Size,
  SpacingSize,

  // Islamic-specific
  PrayerName,
  PrayerLocation,
  IslamicGreeting,
  IslamicMonth,
  DayOfWeek,

  // Achievement and progress
  AchievementLevel,
  Grade,
  StreakMilestone,
  TimePeriod,
} from './enums';
