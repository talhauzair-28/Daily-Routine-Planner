// Main types for the habit tracking app

export interface Prayer {
  id: string;
  name: 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';
  targetTime: string;
  actualTime?: string;
  quality: 1 | 2 | 3 | 4 | 5;
  location: 'Home' | 'Office' | 'Masjid';
  withJamat: boolean;
  takbeerEOola: boolean;
  completed: boolean;
}

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

export interface QuranSession {
  id: string;
  date: string;
  arabicRecitation: {
    duration: number; // in minutes
    completed: boolean;
    quality: 1 | 2 | 3 | 4 | 5;
    pagesRead?: number;
    surahs?: string[];
  };
  translation: {
    duration: number; // in minutes
    completed: boolean;
    quality: 1 | 2 | 3 | 4 | 5;
    reflectionNotes?: string;
  };
}

export interface LearningSession {
  id: string;
  date: string;
  timeSlot: 'lunch' | 'wfh-morning' | 'weekend';
  duration: number; // in minutes
  topic: string;
  material: string;
  quality: 1 | 2 | 3 | 4 | 5;
  keyInsights: string[];
  completed: boolean;
}

export interface FamilyTime {
  id: string;
  date: string;
  timeSlot: 'morning' | 'lunch' | 'post-work' | 'dinner' | 'evening';
  duration: number; // in minutes
  activities: string[];
  quality: 1 | 2 | 3 | 4 | 5;
  familySatisfaction: 1 | 2 | 3 | 4 | 5;
  checklist: {
    activeListening: boolean;
    meaningfulConversation: boolean;
    sharedActivities: boolean;
    householdCollaboration: boolean;
    planningTogether: boolean;
    phoneFree: boolean;
  };
}

export interface Exercise {
  id: string;
  date: string;
  warmup: { duration: number; completed: boolean };
  mainActivity: { 
    duration: number; 
    activity: string; 
    intensity: 'Low' | 'Medium' | 'High';
    completed: boolean;
  };
  cooldown: { duration: number; completed: boolean };
  quality: 1 | 2 | 3 | 4 | 5;
}

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

export interface DailyRecord {
  id: string;
  date: string;
  dayOfWeek: string;
  workType: 'office' | 'wfh' | 'weekend';
  
  // Main activities
  prayers: Prayer[];
  zikrSessions: ZikrSession[];
  quranSession: QuranSession;
  learningSession?: LearningSession;
  familyTime: FamilyTime[];
  exercise: Exercise;
  
  // Discipline tracking
  disciplineChallenges: DisciplineChallenge[];
  disciplineScores: {
    timing: number;
    spiritual: number;
    family: number;
    personal: number;
    total: number;
  };
  
  // Sleep tracking
  sleep: {
    bedTime: string;
    wakeTime: string;
    duration: number; // in hours
    quality: 1 | 2 | 3 | 4 | 5;
  };
  
  // Daily summary
  overallQuality: 1 | 2 | 3 | 4 | 5;
  wins: string[];
  improvements: string[];
  gratitude: string[];
  notes?: string;
}

export interface Streak {
  id: string;
  habitName: string;
  currentStreak: number;
  longestStreak: number;
  lastBreakDate?: string;
  target: number;
  isActive: boolean;
}

export interface WeeklyAnalysis {
  weekStart: string;
  weekEnd: string;
  dailyRecords: DailyRecord[];
  averageScores: {
    prayers: number;
    quran: number;
    zikr: number;
    learning: number;
    family: number;
    exercise: number;
    sleep: number;
    overall: number;
  };
  streakAnalysis: Streak[];
  patterns: {
    bestDay: string;
    worstDay: string;
    commonFailures: string[];
    successFactors: string[];
  };
}

export interface MonthlyAnalysis {
  month: string;
  year: number;
  weeklyAnalyses: WeeklyAnalysis[];
  habitStrength: {
    strong: string[]; // 80-100%
    developing: string[]; // 60-79%
    weak: string[]; // 40-59%
    critical: string[]; // <40%
  };
  trends: {
    improving: string[];
    declining: string[];
    stable: string[];
  };
  milestones: {
    achieved: string[];
    upcoming: string[];
  };
}

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
