
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PlanType = 'ai-only' | 'tutor-lite' | 'tutor-plus';

export interface OnboardingData {
  // Step 1: Plan Selection
  plan: PlanType | null;
  
  // Step 2: Personal Info
  age: number | null;
  grade: string;
  timezone: string;
  
  // Step 3: Learning Interests
  subjects: string[];
  learningGoals: string;
  weeklyStudyHours: number;
  
  // Step 4: Skill Snapshot
  skillLevels: Record<string, number>;
  
  // Progress tracking
  currentStep: number;
  completedSteps: Set<number>;
}

interface OnboardingState {
  data: OnboardingData;
  actions: {
    updateData: (stepData: Partial<OnboardingData>) => void;
    setCurrentStep: (step: number) => void;
    markStepComplete: (step: number) => void;
    canAdvanceToStep: (step: number) => boolean;
    resetOnboarding: () => void;
  };
}

const initialData: OnboardingData = {
  plan: null,
  age: null,
  grade: '',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  subjects: [],
  learningGoals: '',
  weeklyStudyHours: 5,
  skillLevels: {},
  currentStep: 1,
  completedSteps: new Set()
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      data: initialData,
      actions: {
        updateData: (stepData) => {
          set((state) => ({
            data: { ...state.data, ...stepData }
          }));
        },
        
        setCurrentStep: (step) => {
          set((state) => ({
            data: { ...state.data, currentStep: step }
          }));
        },
        
        markStepComplete: (step) => {
          set((state) => ({
            data: {
              ...state.data,
              completedSteps: new Set([...state.data.completedSteps, step])
            }
          }));
        },
        
        canAdvanceToStep: (step) => {
          const { data } = get();
          if (step <= 1) return true;
          
          // Validation logic for each step
          switch (step) {
            case 2:
              return !!data.plan;
            case 3:
              return !!data.plan && !!data.age && !!data.grade;
            case 4:
              return data.subjects.length > 0;
            case 5:
              return Object.keys(data.skillLevels).length >= data.subjects.length;
            default:
              return false;
          }
        },
        
        resetOnboarding: () => {
          set({ data: initialData });
        }
      }
    }),
    {
      name: 'onboarding-storage'
    }
  )
);
