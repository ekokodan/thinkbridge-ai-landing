
import { useQuery } from '@tanstack/react-query';
import { fetchStudents, fetchLessons, fetchDashboardStats } from '@/api/tutors';

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents,
  });
};

export const useLessons = () => {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: fetchLessons,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  });
};
