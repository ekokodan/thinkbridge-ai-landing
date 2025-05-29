
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OnboardingData {
  step: number;
  plan?: 'ai-only' | 'tutor-lite' | 'tutor-plus';
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
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      data: {
        step: 1
      },
      updateData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData }
        })),
      nextStep: () =>
        set((state) => ({
          data: { ...state.data, step: state.data.step + 1 }
        })),
      prevStep: () =>
        set((state) => ({
          data: { ...state.data, step: Math.max(1, state.data.step - 1) }
        })),
      resetData: () =>
        set(() => ({
          data: { step: 1 }
        }))
    }),
    {
      name: 'onboarding-storage'
    }
  )
);
