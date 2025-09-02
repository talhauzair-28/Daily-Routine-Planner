/**
 * Learning session interface for daily learning tracking
 */
export interface LearningSession {
  id: string;
  date: string;
  timeSlot: 'lunch' | 'wfh-morning' | 'weekend';
  duration: number; // in minutes
  topic: string;
  material: string;
  quality: 1 | 2 | 3 | 4 | 5;
  keyInsights: string[];
  completed: boolean;
}

