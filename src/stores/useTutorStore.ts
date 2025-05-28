
import { create } from 'zustand';

interface TutorState {
  viewMode: 'grid' | 'list';
  selectedStudent: string | null;
  selectedContentItem: string | null;
  sidebarOpen: boolean;
  actions: {
    toggleViewMode: () => void;
    setSelectedStudent: (studentId: string | null) => void;
    setSelectedContentItem: (contentId: string | null) => void;
    toggleSidebar: () => void;
  };
}

export const useTutorStore = create<TutorState>((set) => ({
  viewMode: 'grid',
  selectedStudent: null,
  selectedContentItem: null,
  sidebarOpen: true,
  actions: {
    toggleViewMode: () => set((state) => ({ 
      viewMode: state.viewMode === 'grid' ? 'list' : 'grid' 
    })),
    setSelectedStudent: (studentId) => set({ selectedStudent: studentId }),
    setSelectedContentItem: (contentId) => set({ selectedContentItem: contentId }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }))
  }
}));
