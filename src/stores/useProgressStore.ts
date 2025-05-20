
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type MasteryLevel = 'mastered' | 'proficient' | 'familiar' | 'attempted' | 'not-started';

export interface Progress {
  lessonId: string;
  masteryLevel: MasteryLevel;
  completed: boolean;
  lastAttemptDate?: string;
  score?: number;
}

export interface Quiz {
  quizId: string;
  completed: boolean;
  score: number;
  masteryLevel: MasteryLevel;
}

interface ProgressState {
  xp: number;
  badges: string[];
  progress: Record<string, Progress>;
  quizzes: Record<string, Quiz>;
  actions: {
    markLessonComplete: (lessonId: string) => void;
    updateQuizProgress: (quizId: string, score: number) => void;
    updateMasteryLevel: (itemId: string, level: MasteryLevel) => void;
    awardBadge: (badgeId: string) => void;
    addXp: (amount: number) => void;
    resetProgress: () => void;
  };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      xp: 0,
      badges: [],
      progress: {},
      quizzes: {},
      actions: {
        markLessonComplete: (lessonId) => 
          set((state) => {
            const updatedProgress = { 
              ...state.progress[lessonId] || { 
                lessonId, 
                masteryLevel: 'familiar' as MasteryLevel,
                completed: true
              },
              completed: true,
              lastAttemptDate: new Date().toISOString()
            };
            
            // Award XP for completing a lesson
            const xpGain = 10;
            
            return {
              progress: { ...state.progress, [lessonId]: updatedProgress },
              xp: state.xp + xpGain
            };
          }),
        
        updateQuizProgress: (quizId, score) => 
          set((state) => {
            let masteryLevel: MasteryLevel = 'attempted';
            if (score >= 90) masteryLevel = 'mastered';
            else if (score >= 75) masteryLevel = 'proficient';
            else if (score >= 60) masteryLevel = 'familiar';
            
            const updatedQuiz = {
              quizId,
              completed: true,
              score,
              masteryLevel
            };
            
            // XP calculation based on score and difficulty
            const difficulty = 1; // Default difficulty
            const xpGain = Math.floor(score * difficulty / 10);
            
            return {
              quizzes: { ...state.quizzes, [quizId]: updatedQuiz },
              xp: state.xp + xpGain
            };
          }),
        
        updateMasteryLevel: (itemId, level) => 
          set((state) => {
            if (state.progress[itemId]) {
              return {
                progress: { 
                  ...state.progress, 
                  [itemId]: { 
                    ...state.progress[itemId], 
                    masteryLevel: level 
                  } 
                }
              };
            }
            if (state.quizzes[itemId]) {
              return {
                quizzes: { 
                  ...state.quizzes, 
                  [itemId]: { 
                    ...state.quizzes[itemId], 
                    masteryLevel: level 
                  } 
                }
              };
            }
            return state;
          }),
        
        awardBadge: (badgeId) => 
          set((state) => ({
            badges: state.badges.includes(badgeId) 
              ? state.badges 
              : [...state.badges, badgeId]
          })),
        
        addXp: (amount) => 
          set((state) => ({ xp: state.xp + amount })),
        
        resetProgress: () => 
          set({ progress: {}, quizzes: {}, xp: 0, badges: [] })
      }
    }),
    {
      name: 'learning-progress-storage'
    }
  )
);
