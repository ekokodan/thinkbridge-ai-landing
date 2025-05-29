
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  mockGetCredits, 
  mockGetHomework, 
  mockGetUpcomingSessions, 
  mockGetProgressData 
} from '@/api/mocks/studentDataMock';
import { mockGetContentItems, mockToggleFavourite } from '@/api/mocks/contentMock';
import { useStudentStore } from '@/stores/useStudentStore';

export const useCredits = () => {
  return useQuery({
    queryKey: ['credits'],
    queryFn: mockGetCredits,
  });
};

export const useHomework = () => {
  return useQuery({
    queryKey: ['homework'],
    queryFn: mockGetHomework,
  });
};

export const useUpcomingSessions = () => {
  return useQuery({
    queryKey: ['upcoming-sessions'],
    queryFn: mockGetUpcomingSessions,
  });
};

export const useProgressData = () => {
  return useQuery({
    queryKey: ['progress-data'],
    queryFn: mockGetProgressData,
  });
};

export const useContentLibrary = (filters?: {
  subjects?: string[];
  difficulty?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ['content-library', filters],
    queryFn: () => mockGetContentItems(filters),
    placeholderData: (previousData) => previousData
  });
};

export const useToggleFavourite = () => {
  const queryClient = useQueryClient();
  const { actions } = useStudentStore();
  
  return useMutation({
    mutationFn: mockToggleFavourite,
    onSuccess: (_, contentId) => {
      // Update local state
      const { favouriteContent } = useStudentStore.getState();
      if (favouriteContent.includes(contentId)) {
        actions.removeFromFavourites(contentId);
      } else {
        actions.addToFavourites(contentId);
      }
      
      // Invalidate and refetch content library
      queryClient.invalidateQueries({ queryKey: ['content-library'] });
    }
  });
};
