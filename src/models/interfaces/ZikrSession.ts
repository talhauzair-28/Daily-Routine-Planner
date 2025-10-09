/**
 * Zikr session interface for daily remembrance tracking
 */
export interface ZikrSession {
  id: string;
  type: 'morning' | 'evening';
  startTime?: string;
  endTime?: string;
  completed: boolean;
  quality: 1 | 2 | 3 | 4 | 5;
  subtasks: {
    istaghfar: { target: number; completed: number };
    darood: { target: number; completed: number };
    pehlaKalma: { target: number; completed: number };
    teesraKalma: { target: number; completed: number };
  };
}

