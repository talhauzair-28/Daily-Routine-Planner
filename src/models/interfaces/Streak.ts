/**
 * Streak interface for habit streak tracking
 */
export interface Streak {
  id: string;
  habitName: string;
  currentStreak: number;
  longestStreak: number;
  lastBreakDate?: string;
  target: number;
  isActive: boolean;
}

