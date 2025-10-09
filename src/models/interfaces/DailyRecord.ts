/**
 * Daily record interface for comprehensive daily tracking
 */
import type { Prayer } from './Prayer';
import type { ZikrSession } from './ZikrSession';
import type { QuranSession } from './QuranSession';
import type { LearningSession } from './LearningSession';
import type { FamilyTime } from './FamilyTime';
import type { Exercise } from './Exercise';
import type { DisciplineChallenge } from './DisciplineChallenge';

export interface DailyRecord {
  id: string;
  date: string;
  dayOfWeek: string;
  workType: 'office' | 'wfh' | 'weekend';

  // Main activities
  prayers: Prayer[];
  zikrSessions: ZikrSession[];
  quranSession: QuranSession;
  learningSession?: LearningSession;
  familyTime: FamilyTime[];
  exercise: Exercise;

  // Discipline tracking
  disciplineChallenges: DisciplineChallenge[];
  disciplineScores: {
    timing: number;
    spiritual: number;
    family: number;
    personal: number;
    total: number;
  };

  // Sleep tracking
  sleep: {
    bedTime: string;
    wakeTime: string;
    duration: number; // in hours
    quality: 1 | 2 | 3 | 4 | 5;
  };

  // Daily summary
  overallQuality: 1 | 2 | 3 | 4 | 5;
  wins: string[];
  improvements: string[];
  gratitude: string[];
  notes?: string;
}
