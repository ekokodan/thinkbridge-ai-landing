
import { create } from 'zustand';

interface TutorState {
  viewMode: 'grid' | 'list';
  selectedStudent: string | null;
  selectedContentItem: string | null;
  actions: {
    toggleViewMode: () => void;
    setSelectedStudent: (studentId: string | null) => void;
    setSelectedContentItem: (contentId: string | null) => void;
  };
}

export const useTutorStore = create<TutorState>((set) => ({
  viewMode: 'grid',
  selectedStudent: null,
  selectedContentItem: null,
  actions: {
    toggleViewMode: () => set((state) => ({ 
      viewMode: state.viewMode === 'grid' ? 'list' : 'grid' 
    })),
    setSelectedStudent: (studentId) => set({ selectedStudent: studentId }),
    setSelectedContentItem: (contentId) => set({ selectedContentItem: contentId })
  }
}));
