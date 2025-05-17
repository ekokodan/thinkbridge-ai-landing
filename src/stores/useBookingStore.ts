
import { create } from 'zustand';

export interface BookingState {
  // Selected options
  selectedSubjectId: string | null;
  selectedPlanId: string | null;
  selectedTutorId: string | null;
  selectedSlotId: string | null;
  selectedDate: string | null;
  
  // Student info
  studentName: string;
  email: string;
  notes: string;
  couponCode: string;

  // Actions
  selectSubject: (subjectId: string) => void;
  selectPlan: (planId: string) => void;
  selectTutor: (tutorId: string) => void;
  selectSlot: (slotId: string, date: string) => void;
  updateStudentInfo: (info: Partial<{
    studentName: string;
    email: string;
    notes: string;
    couponCode: string;
  }>) => void;
  resetBooking: () => void;
}

// Initial state
const initialState = {
  selectedSubjectId: null,
  selectedPlanId: null,
  selectedTutorId: null,
  selectedSlotId: null,
  selectedDate: null,
  studentName: '',
  email: '',
  notes: '',
  couponCode: ''
};

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  
  selectSubject: (subjectId) => set({ selectedSubjectId: subjectId }),
  
  selectPlan: (planId) => set({ selectedPlanId: planId }),
  
  selectTutor: (tutorId) => set({ selectedTutorId: tutorId }),
  
  selectSlot: (slotId, date) => set({ 
    selectedSlotId: slotId,
    selectedDate: date 
  }),
  
  updateStudentInfo: (info) => set((state) => ({
    ...state,
    ...info
  })),
  
  resetBooking: () => set(initialState)
}));
