/**
 * Discipline challenge interface for daily discipline tracking
 */
export interface DisciplineChallenge {
  id: string;
  name: string;
  category: 'timing' | 'spiritual' | 'family' | 'personal';
  targetTime?: string;
  actualTime?: string;
  target?: string | number;
  achieved?: string | number;
  onTime: boolean;
  streak: number;
  success: boolean;
}

