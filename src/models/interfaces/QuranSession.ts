/**
 * Quran session interface for daily Quran recitation tracking
 */
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

