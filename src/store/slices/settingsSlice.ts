import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSettings } from '@/types';

const initialState: UserSettings = {
  notifications: {
    enabled: true,
    prayerReminders: true,
    zikrReminders: true,
    sleepReminders: true,
    streakAlerts: true,
  },
  preferences: {
    theme: 'system',
    language: 'en',
    startOfWeek: 'monday',
    timeFormat: '12h',
  },
  goals: {
    dailyDisciplineTarget: 25,
    streakTargets: {
      'Wake Up 4:30 AM': 30,
      'All Prayers On Time': 21,
      'Complete Zikr Sessions': 40,
      'Phone-Free Family Time': 14,
      'Exercise Daily': 30,
      'Sleep On Time': 21,
    },
    qualityTargets: {
      prayers: 4,
      quran: 4,
      zikr: 4,
      learning: 3,
      family: 4,
      exercise: 3,
      sleep: 4,
      overall: 4,
    },
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateNotificationSettings: (state, action: PayloadAction<Partial<UserSettings['notifications']>>) => {
      Object.assign(state.notifications, action.payload);
    },

    updatePreferences: (state, action: PayloadAction<Partial<UserSettings['preferences']>>) => {
      Object.assign(state.preferences, action.payload);
    },

    updateGoals: (state, action: PayloadAction<Partial<UserSettings['goals']>>) => {
      Object.assign(state.goals, action.payload);
    },

    updateStreakTarget: (state, action: PayloadAction<{ habitName: string; target: number }>) => {
      state.goals.streakTargets[action.payload.habitName] = action.payload.target;
    },

    updateQualityTarget: (state, action: PayloadAction<{ activity: string; target: number }>) => {
      state.goals.qualityTargets[action.payload.activity] = action.payload.target;
    },

    resetToDefaults: (state) => {
      Object.assign(state, initialState);
    },

    toggleNotifications: (state) => {
      state.notifications.enabled = !state.notifications.enabled;
    },

    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.preferences.theme = action.payload;
    },

    setLanguage: (state, action: PayloadAction<'en' | 'ur'>) => {
      state.preferences.language = action.payload;
    },
  },
});

export const {
  updateNotificationSettings,
  updatePreferences,
  updateGoals,
  updateStreakTarget,
  updateQualityTarget,
  resetToDefaults,
  toggleNotifications,
  setTheme,
  setLanguage,
} = settingsSlice.actions;

export default settingsSlice.reducer;
