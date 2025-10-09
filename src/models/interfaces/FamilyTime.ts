/**
 * Family time interface for daily family activities tracking
 */
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

