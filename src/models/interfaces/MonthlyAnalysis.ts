/**
 * Monthly analysis interface for monthly progress tracking
 */
import type { WeeklyAnalysis } from './WeeklyAnalysis';

export interface MonthlyAnalysis {
  month: string;
  year: number;
  weeklyAnalyses: WeeklyAnalysis[];
  habitStrength: {
    strong: string[]; // 80-100%
    developing: string[]; // 60-79%
    weak: string[]; // 40-59%
    critical: string[]; // <40%
  };
  trends: {
    improving: string[];
    declining: string[];
    stable: string[];
  };
  milestones: {
    achieved: string[];
    upcoming: string[];
  };
}
