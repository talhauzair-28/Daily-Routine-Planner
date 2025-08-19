import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DisciplineChallenge } from '@/types';

interface DisciplineState {
  todayChallenges: DisciplineChallenge[];
  dailyScores: {
    timing: number;
    spiritual: number;
    family: number;
    personal: number;
    total: number;
  };
  weeklyProgress: {
    [challengeId: string]: {
      successRate: number;
      streak: number;
      failures: string[];
    };
  };
}

const initialState: DisciplineState = {
  todayChallenges: [],
  dailyScores: {
    timing: 0,
    spiritual: 0,
    family: 0,
    personal: 0,
    total: 0,
  },
  weeklyProgress: {},
};

const disciplineSlice = createSlice({
  name: 'discipline',
  initialState,
  reducers: {
    initializeTodayChallenges: (state, action: PayloadAction<{ workType: 'office' | 'wfh' | 'weekend' }>) => {
      const { workType } = action.payload;
      
      // Base challenges for all days
      const baseChallenges: DisciplineChallenge[] = [
        // Morning timing challenges
        { id: 'wake-up', name: 'Wake Up 4:30 AM', category: 'timing', targetTime: '04:30', onTime: false, streak: 0, success: false },
        { id: 'fajr-start', name: 'Start Fajr 4:30 AM', category: 'timing', targetTime: '04:30', onTime: false, streak: 0, success: false },
        { id: 'quran-start', name: 'Begin Quran 5:00 AM', category: 'timing', targetTime: '05:00', onTime: false, streak: 0, success: false },
        { id: 'exercise-start', name: 'Start Exercise 6:00 AM', category: 'timing', targetTime: '06:00', onTime: false, streak: 0, success: false },
        
        // Spiritual challenges
        { id: 'all-prayers-time', name: 'All Prayers On Time', category: 'spiritual', target: 5, achieved: 0, onTime: false, streak: 0, success: false },
        { id: 'morning-zikr', name: 'Complete Morning Zikr', category: 'spiritual', target: '40 mins', achieved: '0 mins', onTime: false, streak: 0, success: false },
        { id: 'evening-zikr', name: 'Complete Evening Zikr', category: 'spiritual', target: '40 mins', achieved: '0 mins', onTime: false, streak: 0, success: false },
        { id: 'quran-session', name: 'Full Quran Session', category: 'spiritual', target: '60 mins', achieved: '0 mins', onTime: false, streak: 0, success: false },
        
        // Family challenges
        { id: 'phone-free-family', name: 'Phone-Free Family Time', category: 'family', target: '100%', achieved: '0%', onTime: false, streak: 0, success: false },
        { id: 'active-listening', name: 'Active Listening', category: 'family', target: 'Yes', achieved: 'No', onTime: false, streak: 0, success: false },
        { id: 'family-response', name: 'Family First Response', category: 'family', target: 'Yes', achieved: 'No', onTime: false, streak: 0, success: false },
        { id: 'household-help', name: 'Household Help', category: 'family', target: 'Yes', achieved: 'No', onTime: false, streak: 0, success: false },
        
        // Personal challenges
        { id: 'exercise-complete', name: 'Exercise Completion', category: 'personal', target: '30 mins', achieved: '0 mins', onTime: false, streak: 0, success: false },
        { id: 'no-late-snacking', name: 'No Snacking After Dinner', category: 'personal', target: 'Yes', achieved: 'No', onTime: false, streak: 0, success: false },
        { id: 'hydration', name: 'Hydration Goal', category: 'personal', target: 8, achieved: 0, onTime: false, streak: 0, success: false },
        { id: 'screen-limit', name: 'Screen Time Limit', category: 'personal', target: 'Yes', achieved: 'No', onTime: false, streak: 0, success: false },
      ];
      
      // Add work-specific challenges
      if (workType === 'office') {
        baseChallenges.push(
          { id: 'leave-home', name: 'Leave Home 8:00 AM', category: 'timing', targetTime: '08:00', onTime: false, streak: 0, success: false },
          { id: 'arrive-office', name: 'Arrive Office 8:45 AM', category: 'timing', targetTime: '08:45', onTime: false, streak: 0, success: false },
          { id: 'start-work', name: 'Start Work 9:00 AM', category: 'timing', targetTime: '09:00', onTime: false, streak: 0, success: false },
          { id: 'leave-office', name: 'Leave Office 6:00 PM', category: 'timing', targetTime: '18:00', onTime: false, streak: 0, success: false },
        );
      }
      
      // Evening timing challenges
      const eveningZikrTime = workType === 'office' ? '21:30' : '22:00';
      const sleepTime = workType === 'office' ? '22:30' : '22:40';
      
      baseChallenges.push(
        { id: 'evening-zikr-start', name: 'Start Evening Zikr', category: 'timing', targetTime: eveningZikrTime, onTime: false, streak: 0, success: false },
        { id: 'sleep-time', name: 'In Bed (Lights Off)', category: 'timing', targetTime: sleepTime, onTime: false, streak: 0, success: false },
      );
      
      state.todayChallenges = baseChallenges;
    },

    updateChallenge: (state, action: PayloadAction<{ challengeId: string; updates: Partial<DisciplineChallenge> }>) => {
      const challenge = state.todayChallenges.find(c => c.id === action.payload.challengeId);
      if (challenge) {
        Object.assign(challenge, action.payload.updates);
      }
    },

    markChallengeComplete: (state, action: PayloadAction<{ challengeId: string; actualTime?: string; achieved?: string | number }>) => {
      const challenge = state.todayChallenges.find(c => c.id === action.payload.challengeId);
      if (challenge) {
        challenge.success = true;
        challenge.onTime = true;
        if (action.payload.actualTime) {
          challenge.actualTime = action.payload.actualTime;
        }
        if (action.payload.achieved !== undefined) {
          challenge.achieved = action.payload.achieved;
        }
        challenge.streak += 1;
      }
    },

    markChallengeFailed: (state, action: PayloadAction<{ challengeId: string; actualTime?: string; achieved?: string | number; reason?: string }>) => {
      const challenge = state.todayChallenges.find(c => c.id === action.payload.challengeId);
      if (challenge) {
        challenge.success = false;
        challenge.onTime = false;
        if (action.payload.actualTime) {
          challenge.actualTime = action.payload.actualTime;
        }
        if (action.payload.achieved !== undefined) {
          challenge.achieved = action.payload.achieved;
        }
        challenge.streak = 0; // Reset streak on failure
      }
    },

    calculateDailyScores: (state) => {
      const timingChallenges = state.todayChallenges.filter(c => c.category === 'timing');
      const spiritualChallenges = state.todayChallenges.filter(c => c.category === 'spiritual');
      const familyChallenges = state.todayChallenges.filter(c => c.category === 'family');
      const personalChallenges = state.todayChallenges.filter(c => c.category === 'personal');

      state.dailyScores.timing = timingChallenges.filter(c => c.success).length;
      state.dailyScores.spiritual = spiritualChallenges.filter(c => c.success).length;
      state.dailyScores.family = familyChallenges.filter(c => c.success).length;
      state.dailyScores.personal = personalChallenges.filter(c => c.success).length;
      state.dailyScores.total = state.todayChallenges.filter(c => c.success).length;
    },

    updateStreaks: (state, action: PayloadAction<{ [challengeId: string]: number }>) => {
      const streaks = action.payload;
      state.todayChallenges.forEach(challenge => {
        if (streaks[challenge.id] !== undefined) {
          challenge.streak = streaks[challenge.id];
        }
      });
    },

    resetDailyChallenges: (state) => {
      state.todayChallenges = [];
      state.dailyScores = {
        timing: 0,
        spiritual: 0,
        family: 0,
        personal: 0,
        total: 0,
      };
    },
  },
});

export const {
  initializeTodayChallenges,
  updateChallenge,
  markChallengeComplete,
  markChallengeFailed,
  calculateDailyScores,
  updateStreaks,
  resetDailyChallenges,
} = disciplineSlice.actions;

export default disciplineSlice.reducer;
