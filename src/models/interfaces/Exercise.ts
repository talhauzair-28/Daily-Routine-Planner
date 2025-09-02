/**
 * Exercise interface for daily physical activity tracking
 */
export interface Exercise {
  id: string;
  date: string;
  warmup: { duration: number; completed: boolean };
  mainActivity: {
    duration: number;
    activity: string;
    intensity: 'Low' | 'Medium' | 'High';
    completed: boolean;
  };
  cooldown: { duration: number; completed: boolean };
  quality: 1 | 2 | 3 | 4 | 5;
}

