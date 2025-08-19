import { DailyRecord, Exercise, FamilyTime, Prayer, QuranSession, ZikrSession } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HabitState {
  currentDate: string;
  todayRecord: DailyRecord | null;
  weeklyRecords: DailyRecord[];
  monthlyRecords: DailyRecord[];
}

const initialState: HabitState = {
  currentDate: new Date().toISOString().split('T')[0],
  todayRecord: null,
  weeklyRecords: [],
  monthlyRecords: [],
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    initializeTodayRecord: (state, action: PayloadAction<string>) => {
      const date = action.payload;
      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      const isWeekend = dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
      const isWFH = dayOfWeek === 'Wednesday' || dayOfWeek === 'Friday';
      
      state.currentDate = date;
      state.todayRecord = {
        id: `record-${date}`,
        date,
        dayOfWeek,
        workType: isWeekend ? 'weekend' : isWFH ? 'wfh' : 'office',
        prayers: [
          { id: 'fajr', name: 'Fajr', targetTime: '04:30', quality: 1, location: 'Home', withJamat: false, takbeerEOola: false, completed: false },
          { id: 'dhuhr', name: 'Dhuhr', targetTime: '13:30', quality: 1, location: 'Home', withJamat: false, takbeerEOola: false, completed: false },
          { id: 'asr', name: 'Asr', targetTime: '17:15', quality: 1, location: 'Home', withJamat: false, takbeerEOola: false, completed: false },
          { id: 'maghrib', name: 'Maghrib', targetTime: '18:45', quality: 1, location: 'Home', withJamat: false, takbeerEOola: false, completed: false },
          { id: 'isha', name: 'Isha', targetTime: '20:15', quality: 1, location: 'Home', withJamat: false, takbeerEOola: false, completed: false },
        ],
        zikrSessions: [
          {
            id: 'morning-zikr',
            type: 'morning',
            completed: false,
            quality: 1,
            subtasks: {
              istaghfar: { target: 300, completed: 0 },
              darood: { target: 300, completed: 0 },
              pehlaKalma: { target: 300, completed: 0 },
              teesraKalma: { target: 300, completed: 0 },
            },
          },
          {
            id: 'evening-zikr',
            type: 'evening',
            completed: false,
            quality: 1,
            subtasks: {
              istaghfar: { target: 300, completed: 0 },
              darood: { target: 300, completed: 0 },
              pehlaKalma: { target: 300, completed: 0 },
              teesraKalma: { target: 300, completed: 0 },
            },
          },
        ],
        quranSession: {
          id: 'quran-session',
          date,
          arabicRecitation: { duration: 0, completed: false, quality: 1 },
          translation: { duration: 0, completed: false, quality: 1 },
        },
        familyTime: [],
        exercise: {
          id: 'exercise',
          date,
          warmup: { duration: 0, completed: false },
          mainActivity: { duration: 0, activity: '', intensity: 'Medium', completed: false },
          cooldown: { duration: 0, completed: false },
          quality: 1,
        },
        disciplineChallenges: [],
        disciplineScores: { timing: 0, spiritual: 0, family: 0, personal: 0, total: 0 },
        sleep: { bedTime: '', wakeTime: '', duration: 0, quality: 1 },
        overallQuality: 1,
        wins: [],
        improvements: [],
        gratitude: [],
      };
    },

    updatePrayer: (state, action: PayloadAction<{ prayerId: string; updates: Partial<Prayer> }>) => {
      if (state.todayRecord) {
        const prayer = state.todayRecord.prayers.find(p => p.id === action.payload.prayerId);
        if (prayer) {
          Object.assign(prayer, action.payload.updates);
        }
      }
    },

    updateZikrSession: (state, action: PayloadAction<{ sessionId: string; updates: Partial<ZikrSession> }>) => {
      if (state.todayRecord) {
        const session = state.todayRecord.zikrSessions.find(s => s.id === action.payload.sessionId);
        if (session) {
          Object.assign(session, action.payload.updates);
        }
      }
    },

    updateQuranSession: (state, action: PayloadAction<Partial<QuranSession>>) => {
      if (state.todayRecord) {
        Object.assign(state.todayRecord.quranSession, action.payload);
      }
    },

    addFamilyTime: (state, action: PayloadAction<FamilyTime>) => {
      if (state.todayRecord) {
        state.todayRecord.familyTime.push(action.payload);
      }
    },

    updateFamilyTime: (state, action: PayloadAction<{ id: string; updates: Partial<FamilyTime> }>) => {
      if (state.todayRecord) {
        const familyTime = state.todayRecord.familyTime.find(ft => ft.id === action.payload.id);
        if (familyTime) {
          Object.assign(familyTime, action.payload.updates);
        }
      }
    },

    updateExercise: (state, action: PayloadAction<Partial<Exercise>>) => {
      if (state.todayRecord) {
        Object.assign(state.todayRecord.exercise, action.payload);
      }
    },

    updateSleep: (state, action: PayloadAction<Partial<DailyRecord['sleep']>>) => {
      if (state.todayRecord) {
        Object.assign(state.todayRecord.sleep, action.payload);
      }
    },

    updateDailySummary: (state, action: PayloadAction<{
      overallQuality?: number;
      wins?: string[];
      improvements?: string[];
      gratitude?: string[];
      notes?: string;
    }>) => {
      if (state.todayRecord) {
        Object.assign(state.todayRecord, action.payload);
      }
    },

    saveDailyRecord: (state) => {
      if (state.todayRecord) {
        const existingIndex = state.monthlyRecords.findIndex(r => r.date === state.todayRecord!.date);
        if (existingIndex >= 0) {
          state.monthlyRecords[existingIndex] = state.todayRecord;
        } else {
          state.monthlyRecords.push(state.todayRecord);
        }
        
        // Keep only last 7 days in weekly records
        state.weeklyRecords = state.monthlyRecords.slice(-7);
      }
    },

    loadDailyRecord: (state, action: PayloadAction<string>) => {
      const date = action.payload;
      const existingRecord = state.monthlyRecords.find(r => r.date === date);
      if (existingRecord) {
        state.todayRecord = existingRecord;
        state.currentDate = date;
      }
    },
  },
});

export const {
  initializeTodayRecord,
  updatePrayer,
  updateZikrSession,
  updateQuranSession,
  addFamilyTime,
  updateFamilyTime,
  updateExercise,
  updateSleep,
  updateDailySummary,
  saveDailyRecord,
  loadDailyRecord,
} = habitSlice.actions;

export default habitSlice.reducer;
