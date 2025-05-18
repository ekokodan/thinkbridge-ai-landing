
import { create } from 'zustand';

interface TutorState {
  sidebarOpen: boolean;
  viewMode: 'grid' | 'list';
  selectedStudent: string | null;
  selectedContentItem: string | null;
  actions: {
    toggleSidebar: () => void;
    toggleViewMode: () => void;
    setSelectedStudent: (studentId: string | null) => void;
    setSelectedContentItem: (contentId: string | null) => void;
  };
}

export const useTutorStore = create<TutorState>((set) => ({
  sidebarOpen: true,
  viewMode: 'grid',
  selectedStudent: null,
  selectedContentItem: null,
  actions: {
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    toggleViewMode: () => set((state) => ({ 
      viewMode: state.viewMode === 'grid' ? 'list' : 'grid' 
    })),
    setSelectedStudent: (studentId) => set({ selectedStudent: studentId }),
    setSelectedContentItem: (contentId) => set({ selectedContentItem: contentId })
  }
}));
