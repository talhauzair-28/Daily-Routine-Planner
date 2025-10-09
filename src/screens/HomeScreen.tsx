import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BaseScreen, ScreenHeaderCard } from '@/components/templates';
import {
  ActiveStreaksContainer,
  CategoryBreakdownContainer,
  DisciplineScoreContainer,
  QuickActionsContainer,
} from '@/containers/HomeScreenContainers';

import { Colors } from '@/constants/Colors';
import { RootState } from '@/store';
import { initializeTodayChallenges } from '@/store/slices/disciplineSlice';
import { initializeTodayRecord } from '@/store/slices/habitSlice';

const HomeScreen: React.FC = () => {
  // ==========================================
  // Variable Declaration/States
  // ==========================================
  const maxScore = 32; // Based on your discipline scoring system

  // ==========================================
  // Hooks/Custom Hooks
  // ==========================================
  const dispatch = useDispatch();
  // Only subscribe to the minimal state needed for header and initialization
  const todayRecord = useSelector((state: RootState) => state.habits.todayRecord);

  // ==========================================
  // Use Effects
  // ==========================================
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (!todayRecord || todayRecord.date !== today) {
      dispatch(initializeTodayRecord(today));

      // Determine work type for today
      const dayOfWeek = new Date().getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6; // Sunday or Saturday
      const isWFH = dayOfWeek === 3 || dayOfWeek === 5; // Wednesday or Friday
      const workType = isWeekend ? 'weekend' : isWFH ? 'wfh' : 'office';

      dispatch(initializeTodayChallenges({ workType }));
    }
  }, [dispatch, todayRecord]);

  // ==========================================
  // Helper Methods
  // ==========================================
  const getTodayWorkType = () => {
    const dayOfWeek = new Date().getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isWFH = dayOfWeek === 3 || dayOfWeek === 5;

    if (isWeekend)
      return { type: 'Weekend', icon: 'home-heart', color: Colors.family };
    if (isWFH)
      return {
        type: 'Work from Home',
        icon: 'home-account',
        color: Colors.secondary,
      };
    return {
      type: 'Office Day',
      icon: 'office-building',
      color: Colors.primary,
    };
  };

  // ==========================================
  // Event Handlers
  // ==========================================
  const handleNavigateToToday = () => {
    // TODO: Navigate to Today Screen
    // navigation.navigate(ROUTES.TODAY);
    console.log('Navigate to Today Screen');
  };

  const handleNavigateToDiscipline = () => {
    // TODO: Navigate to Discipline Challenges
    // navigation.navigate(ROUTES.DISCIPLINE_CHALLENGES);
    console.log('Navigate to Discipline Challenges');
  };

  const handleNavigateToAnalytics = () => {
    // TODO: Navigate to Analytics
    // navigation.navigate(ROUTES.ANALYTICS);
    console.log('Navigate to Analytics');
  };

  const handleNavigateToHabits = () => {
    // TODO: Navigate to Habits
    // navigation.navigate(ROUTES.HABITS);
    console.log('Navigate to Habits');
  };

  // ==========================================
  // Render Methods
  // ==========================================
  // (No separate render methods in this component)

  // Computed values for render
  const workType = getTodayWorkType();

  // ==========================================
  // Return
  // ==========================================
  return (
    <BaseScreen showsVerticalScrollIndicator={false}>
      {/* Header Card */}
      <ScreenHeaderCard
        greeting="Assalamu Alaikum! 🌅"
        date={new Date().toISOString()}
        contextInfo={{
          text: workType.type,
          icon: workType.icon,
          color: workType.color,
        }}
      />

      {/* Discipline Score Section - Isolated Redux subscription */}
      <DisciplineScoreContainer maxScore={maxScore} />

      {/* Category Breakdown Section - Isolated Redux subscription */}
      <CategoryBreakdownContainer />

      {/* Active Streaks Section - Isolated Redux subscription */}
      <ActiveStreaksContainer maxStreaks={3} />

      {/* Quick Actions Section - No Redux subscriptions */}
      <QuickActionsContainer
        onNavigateToToday={handleNavigateToToday}
        onNavigateToDiscipline={handleNavigateToDiscipline}
        onNavigateToAnalytics={handleNavigateToAnalytics}
        onNavigateToHabits={handleNavigateToHabits}
      />
    </BaseScreen>
  );
};

export default HomeScreen;