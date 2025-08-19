import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QualityState {
  dailyAverages: {
    prayers: number;
    quran: number;
    zikr: number;
    learning: number;
    family: number;
    exercise: number;
    sleep: number;
    overall: number;
  };
  weeklyTrends: {
    [week: string]: {
      prayers: number;
      quran: number;
      zikr: number;
      learning: number;
      family: number;
      exercise: number;
      sleep: number;
      overall: number;
    };
  };
  qualityGoals: {
    prayers: number;
    quran: number;
    zikr: number;
    learning: number;
    family: number;
    exercise: number;
    sleep: number;
    overall: number;
  };
}

const initialState: QualityState = {
  dailyAverages: {
    prayers: 0,
    quran: 0,
    zikr: 0,
    learning: 0,
    family: 0,
    exercise: 0,
    sleep: 0,
    overall: 0,
  },
  weeklyTrends: {},
  qualityGoals: {
    prayers: 4,
    quran: 4,
    zikr: 4,
    learning: 3,
    family: 4,
    exercise: 3,
    sleep: 4,
    overall: 4,
  },
};

const qualitySlice = createSlice({
  name: 'quality',
  initialState,
  reducers: {
    updateDailyAverages: (state, action: PayloadAction<Partial<QualityState['dailyAverages']>>) => {
      Object.assign(state.dailyAverages, action.payload);
    },

    updateQualityGoals: (state, action: PayloadAction<Partial<QualityState['qualityGoals']>>) => {
      Object.assign(state.qualityGoals, action.payload);
    },

    addWeeklyTrend: (state, action: PayloadAction<{ week: string; averages: QualityState['dailyAverages'] }>) => {
      state.weeklyTrends[action.payload.week] = action.payload.averages;
    },

    calculateQualityFromDailyRecord: (state, action: PayloadAction<any>) => {
      const record = action.payload;
      
      // Calculate prayer quality average
      const prayerQualities = record.prayers.map((p: any) => p.quality);
      const prayerAvg = prayerQualities.length > 0 ? 
        prayerQualities.reduce((sum: number, q: number) => sum + q, 0) / prayerQualities.length : 0;
      
      // Calculate Zikr quality average
      const zikrQualities = record.zikrSessions.map((z: any) => z.quality);
      const zikrAvg = zikrQualities.length > 0 ?
        zikrQualities.reduce((sum: number, q: number) => sum + q, 0) / zikrQualities.length : 0;
      
      // Calculate Quran quality average
      const quranAvg = (record.quranSession.arabicRecitation.quality + record.quranSession.translation.quality) / 2;
      
      // Calculate family time quality average
      const familyQualities = record.familyTime.map((ft: any) => ft.quality);
      const familyAvg = familyQualities.length > 0 ?
        familyQualities.reduce((sum: number, q: number) => sum + q, 0) / familyQualities.length : 0;
      
      // Update daily averages
      state.dailyAverages = {
        prayers: prayerAvg,
        quran: quranAvg,
        zikr: zikrAvg,
        learning: record.learningSession?.quality || 0,
        family: familyAvg,
        exercise: record.exercise.quality,
        sleep: record.sleep.quality,
        overall: record.overallQuality,
      };
    },
  },
});

export const {
  updateDailyAverages,
  updateQualityGoals,
  addWeeklyTrend,
  calculateQualityFromDailyRecord,
} = qualitySlice.actions;

export default qualitySlice.reducer;
