/**
 * Prayer interface for daily prayer tracking
 */
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

