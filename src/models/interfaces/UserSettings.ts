/**
 * User settings interface for application preferences
 */
export interface UserSettings {
  notifications: {
    enabled: boolean;
    prayerReminders: boolean;
    zikrReminders: boolean;
    sleepReminders: boolean;
    streakAlerts: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: 'en' | 'ur';
    startOfWeek: 'monday' | 'sunday';
    timeFormat: '12h' | '24h';
  };
  goals: {
    dailyDisciplineTarget: number;
    streakTargets: { [habitName: string]: number };
    qualityTargets: { [activity: string]: number };
  };
}

