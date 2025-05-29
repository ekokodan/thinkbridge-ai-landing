
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PlanType = 'ai-only' | 'tutor-lite' | 'tutor-plus';

export interface OnboardingData {
  step: number;
  currentStep: number;
  plan?: PlanType;
  name?: string;
  email?: string;
  age?: number;
  grade?: string;
  timezone?: string;
  subjects?: string[];
  learningGoals?: string;
  weeklyStudyHours?: number;
  skillLevels?: Record<string, number>;
}

interface OnboardingState {
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetData: () => void;
  setStep: (step: number) => void;
  markStepComplete: (step: number) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      data: {
        step: 1,
        currentStep: 1
      },
      
      updateData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData }
        })),
      
      nextStep: () =>
        set((state) => ({
          data: { 
            ...state.data, 
            step: Math.min(5, state.data.step + 1),
            currentStep: Math.min(5, state.data.step + 1)
          }
        })),
      
      prevStep: () =>
        set((state) => ({
          data: { 
            ...state.data, 
            step: Math.max(1, state.data.step - 1),
            currentStep: Math.max(1, state.data.step - 1)
          }
        })),
      
      setStep: (step) =>
        set((state) => ({
          data: { 
            ...state.data, 
            step: Math.max(1, Math.min(5, step)),
            currentStep: Math.max(1, Math.min(5, step))
          }
        })),
      
      resetData: () =>
        set(() => ({
          data: { step: 1, currentStep: 1 }
        })),
      
      markStepComplete: (step) => {
        console.log(`Step ${step} completed`);
      }
    }),
    {
      name: 'onboarding-storage'
    }
  )
);
