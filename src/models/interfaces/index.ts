/**
 * Interfaces Index
 *
 * Central export point for all application data interfaces.
 * Each interface is defined in its own file for better maintainability.
 *
 * @fileoverview Main export for application interfaces
 * @author Daily Routine Planner Team
 * @version 1.0.0
 */

// Core data interfaces
export type { Prayer } from './Prayer';
export type { ZikrSession } from './ZikrSession';
export type { QuranSession } from './QuranSession';
export type { LearningSession } from './LearningSession';
export type { FamilyTime } from './FamilyTime';
export type { Exercise } from './Exercise';
export type { DisciplineChallenge } from './DisciplineChallenge';
export type { DailyRecord } from './DailyRecord';
export type { Streak } from './Streak';

// Analysis interfaces
export type { WeeklyAnalysis } from './WeeklyAnalysis';
export type { MonthlyAnalysis } from './MonthlyAnalysis';

// User settings
export type { UserSettings } from './UserSettings';
