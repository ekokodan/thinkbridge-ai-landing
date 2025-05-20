
import { useQuery } from '@tanstack/react-query';
import { fetchUnit, Unit, Lesson, Practice } from '@/api/courses';
import { fetchProgressStats, ProgressStats } from '@/api/progress';

export function useUnit(unitId: string | undefined, courseId: string | undefined) {
  const unitQuery = useQuery({
    queryKey: ['unit', unitId],
    queryFn: () => unitId ? fetchUnit(unitId) : Promise.resolve(undefined),
    enabled: !!unitId
  });

  const progressStatsQuery = useQuery({
    queryKey: ['progress-stats', courseId],
    queryFn: () => courseId ? fetchProgressStats(courseId) : Promise.resolve(undefined),
    enabled: !!courseId
  });

  return {
    unit: unitQuery.data,
    lessons: unitQuery.data?.lessons || [],
    practices: unitQuery.data?.practices || [],
    progressStats: progressStatsQuery.data,
    isLoading: unitQuery.isLoading,
    isError: unitQuery.isError
  };
}
