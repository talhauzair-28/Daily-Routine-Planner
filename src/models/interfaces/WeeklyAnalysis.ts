/**
 * Weekly analysis interface for weekly progress tracking
 */
import type { DailyRecord } from './DailyRecord';
import type { Streak } from './Streak';

export interface WeeklyAnalysis {
  weekStart: string;
  weekEnd: string;
  dailyRecords: DailyRecord[];
  averageScores: {
    prayers: number;
    quran: number;
    zikr: number;
    learning: number;
    family: number;
    exercise: number;
    sleep: number;
    overall: number;
  };
  streakAnalysis: Streak[];
  patterns: {
    bestDay: string;
    worstDay: string;
    commonFailures: string[];
    successFactors: string[];
  };
}
