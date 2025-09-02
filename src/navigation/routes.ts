/**
 * Navigation Routes Configuration
 *
 * Defines all route names and their parameter types for type-safe navigation
 */

export const ROUTES = {
  // Main navigation
  MAIN: 'Main',
  HOME: 'Home',
  TODAY: 'Today',
  HABITS: 'Habits',
  ANALYTICS: 'Analytics',
  SETTINGS: 'Settings',

  // Detail screens
  PRAYER_DETAIL: 'PrayerDetail',
  ZIKR_DETAIL: 'ZikrDetail',
  QURAN_DETAIL: 'QuranDetail',
  FAMILY_TIME_DETAIL: 'FamilyTimeDetail',
  STREAK_DETAIL: 'StreakDetail',
  DISCIPLINE_CHALLENGES: 'DisciplineChallenges',
} as const;

export type RouteNames = typeof ROUTES[keyof typeof ROUTES];

// Route parameter types
export interface RouteParams {
  [ROUTES.PRAYER_DETAIL]: {
    prayerId: string;
  };
  [ROUTES.ZIKR_DETAIL]: {
    sessionId: string;
  };
  [ROUTES.QURAN_DETAIL]: undefined;
  [ROUTES.FAMILY_TIME_DETAIL]: undefined;
  [ROUTES.STREAK_DETAIL]: {
    streakId: string;
  };
  [ROUTES.DISCIPLINE_CHALLENGES]: undefined;
  [ROUTES.MAIN]: undefined;
  [ROUTES.HOME]: undefined;
  [ROUTES.TODAY]: undefined;
  [ROUTES.HABITS]: undefined;
  [ROUTES.ANALYTICS]: undefined;
  [ROUTES.SETTINGS]: undefined;
  [key: string]: undefined | { [key: string]: any };
}

// Type-safe navigation helper
export type NavigationParams<T extends RouteNames> = RouteParams[T];
