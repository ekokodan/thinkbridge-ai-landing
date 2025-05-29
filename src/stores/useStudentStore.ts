
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { differenceInDays } from 'date-fns';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  grade: string;
  timezone: string;
  subjects: string[];
  learningGoals: string;
  weeklyStudyHours: number;
  skillLevels: Record<string, number>;
  plan: 'ai-only' | 'tutor-lite' | 'tutor-plus';
  lastProfileUpdate: string;
  createdAt: string;
}

export interface LessonCredit {
  type: 'ai-session' | 'tutor-session' | 'group-session';
  remaining: number;
  total: number;
  expiryDate: string;
}

export interface Homework {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UpcomingSession {
  id: string;
  title: string;
  type: 'ai' | 'tutor' | 'group';
  datetime: string;
  duration: number;
  tutor?: string;
}

interface StudentState {
  profile: StudentProfile | null;
  credits: LessonCredit[];
  homework: Homework[];
  upcomingSessions: UpcomingSession[];
  favouriteContent: string[];
  isAuthenticated: boolean;
  
  actions: {
    setProfile: (profile: StudentProfile) => void;
    updateProfile: (updates: Partial<StudentProfile>) => void;
    canEditProfile: () => boolean;
    getNextEditDate: () => Date | null;
    setCredits: (credits: LessonCredit[]) => void;
    setHomework: (homework: Homework[]) => void;
    toggleHomeworkComplete: (id: string) => void;
    setUpcomingSessions: (sessions: UpcomingSession[]) => void;
    addToFavourites: (contentId: string) => void;
    removeFromFavourites: (contentId: string) => void;
    setAuthenticated: (auth: boolean) => void;
    logout: () => void;
  };
}

export const useStudentStore = create<StudentState>()(
  persist(
    (set, get) => ({
      profile: null,
      credits: [],
      homework: [],
      upcomingSessions: [],
      favouriteContent: [],
      isAuthenticated: false,
      
      actions: {
        setProfile: (profile) => {
          set({ profile, isAuthenticated: true });
        },
        
        updateProfile: (updates) => {
          const { profile } = get();
          if (!profile) return;
          
          set({
            profile: {
              ...profile,
              ...updates,
              lastProfileUpdate: new Date().toISOString()
            }
          });
        },
        
        canEditProfile: () => {
          const { profile } = get();
          if (!profile?.lastProfileUpdate) return true;
          
          const daysSinceLastUpdate = differenceInDays(
            new Date(),
            new Date(profile.lastProfileUpdate)
          );
          
          return daysSinceLastUpdate >= 30;
        },
        
        getNextEditDate: () => {
          const { profile } = get();
          if (!profile?.lastProfileUpdate) return null;
          
          const lastUpdate = new Date(profile.lastProfileUpdate);
          const nextEditDate = new Date(lastUpdate);
          nextEditDate.setDate(nextEditDate.getDate() + 30);
          
          return nextEditDate;
        },
        
        setCredits: (credits) => set({ credits }),
        
        setHomework: (homework) => set({ homework }),
        
        toggleHomeworkComplete: (id) => {
          set((state) => ({
            homework: state.homework.map(hw =>
              hw.id === id ? { ...hw, completed: !hw.completed } : hw
            )
          }));
        },
        
        setUpcomingSessions: (upcomingSessions) => set({ upcomingSessions }),
        
        addToFavourites: (contentId) => {
          set((state) => ({
            favouriteContent: [...new Set([...state.favouriteContent, contentId])]
          }));
        },
        
        removeFromFavourites: (contentId) => {
          set((state) => ({
            favouriteContent: state.favouriteContent.filter(id => id !== contentId)
          }));
        },
        
        setAuthenticated: (auth) => set({ isAuthenticated: auth }),
        
        logout: () => {
          set({
            profile: null,
            credits: [],
            homework: [],
            upcomingSessions: [],
            favouriteContent: [],
            isAuthenticated: false
          });
        }
      }
    }),
    {
      name: 'student-storage'
    }
  )
);
