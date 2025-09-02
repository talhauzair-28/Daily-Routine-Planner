import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Streak } from '@/types';

interface StreakState {
  activeStreaks: Streak[];
  streakHistory: {
    [habitName: string]: {
      dates: string[];
      breaks: { date: string; reason?: string }[];
    };
  };
  milestones: {
    achieved: { habitName: string; milestone: number; date: string }[];
    upcoming: { habitName: string; milestone: number; daysLeft: number }[];
  };
}

const initialState: StreakState = {
  activeStreaks: [
    {
      id: 'wake-up-430',
      habitName: 'Wake Up 4:30 AM',
      currentStreak: 0,
      longestStreak: 0,
      target: 30,
      isActive: true,
    },
    {
      id: 'all-prayers-time',
      habitName: 'All Prayers On Time',
      currentStreak: 0,
      longestStreak: 0,
      target: 21,
      isActive: true,
    },
    {
      id: 'complete-zikr',
      habitName: 'Complete Zikr Sessions',
      currentStreak: 0,
      longestStreak: 0,
      target: 40,
      isActive: true,
    },
    {
      id: 'phone-free-family',
      habitName: 'Phone-Free Family Time',
      currentStreak: 0,
      longestStreak: 0,
      target: 14,
      isActive: true,
    },
    {
      id: 'exercise-daily',
      habitName: 'Exercise Daily',
      currentStreak: 0,
      longestStreak: 0,
      target: 30,
      isActive: true,
    },
    {
      id: 'sleep-on-time',
      habitName: 'Sleep On Time',
      currentStreak: 0,
      longestStreak: 0,
      target: 21,
      isActive: true,
    },
  ],
  streakHistory: {},
  milestones: {
    achieved: [],
    upcoming: [],
  },
};

const streakSlice = createSlice({
  name: 'streaks',
  initialState,
  reducers: {
    updateStreak: (
      state,
      action: PayloadAction<{
        habitName: string;
        success: boolean;
        date: string;
        reason?: string;
      }>
    ) => {
      const { habitName, success, date, reason } = action.payload;
      const streak = state.activeStreaks.find(s => s.habitName === habitName);

      if (streak) {
        if (success) {
          streak.currentStreak += 1;
          if (streak.currentStreak > streak.longestStreak) {
            streak.longestStreak = streak.currentStreak;
          }

          // Add to history
          if (!state.streakHistory[habitName]) {
            state.streakHistory[habitName] = { dates: [], breaks: [] };
          }
          state.streakHistory[habitName].dates.push(date);
        } else {
          // Record the break
          if (streak.currentStreak > 0) {
            if (!state.streakHistory[habitName]) {
              state.streakHistory[habitName] = { dates: [], breaks: [] };
            }
            state.streakHistory[habitName].breaks.push({ date, reason });
            streak.lastBreakDate = date;
          }
          streak.currentStreak = 0;
        }
      }
    },

    addStreak: (state, action: PayloadAction<Omit<Streak, 'id'>>) => {
      const newStreak: Streak = {
        ...action.payload,
        id: `streak-${Date.now()}`,
      };
      state.activeStreaks.push(newStreak);
    },

    removeStreak: (state, action: PayloadAction<string>) => {
      state.activeStreaks = state.activeStreaks.filter(
        s => s.id !== action.payload
      );
    },

    updateStreakTarget: (
      state,
      action: PayloadAction<{ habitName: string; target: number }>
    ) => {
      const streak = state.activeStreaks.find(
        s => s.habitName === action.payload.habitName
      );
      if (streak) {
        streak.target = action.payload.target;
      }
    },

    checkMilestones: state => {
      // Check for achieved milestones
      const milestoneTargets = [7, 14, 21, 30, 40, 66, 100];

      state.activeStreaks.forEach(streak => {
        milestoneTargets.forEach(milestone => {
          if (streak.currentStreak === milestone) {
            const existingMilestone = state.milestones.achieved.find(
              m => m.habitName === streak.habitName && m.milestone === milestone
            );

            if (!existingMilestone) {
              state.milestones.achieved.push({
                habitName: streak.habitName,
                milestone,
                date: new Date().toISOString().split('T')[0],
              });
            }
          }
        });
      });

      // Calculate upcoming milestones
      state.milestones.upcoming = [];
      state.activeStreaks.forEach(streak => {
        const nextMilestone = milestoneTargets.find(
          m => m > streak.currentStreak
        );
        if (nextMilestone) {
          state.milestones.upcoming.push({
            habitName: streak.habitName,
            milestone: nextMilestone,
            daysLeft: nextMilestone - streak.currentStreak,
          });
        }
      });
    },

    resetStreak: (state, action: PayloadAction<string>) => {
      const streak = state.activeStreaks.find(
        s => s.habitName === action.payload
      );
      if (streak) {
        streak.currentStreak = 0;
        streak.lastBreakDate = new Date().toISOString().split('T')[0];
      }
    },

    calculateStreakStats: state => {
      // This could be used for analytics
      state.activeStreaks.forEach(streak => {
        const history = state.streakHistory[streak.habitName];
        if (history) {
          // Calculate success rate, average streak length, etc.
          // This is where you'd add more complex analytics
        }
      });
    },
  },
});

export const {
  updateStreak,
  addStreak,
  removeStreak,
  updateStreakTarget,
  checkMilestones,
  resetStreak,
  calculateStreakStats,
} = streakSlice.actions;

export default streakSlice.reducer;
