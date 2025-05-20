
import { useQuery } from '@tanstack/react-query';
import { fetchCourse, fetchUnitsForCourse, Course, Unit } from '@/api/courses';

export function useCourse(courseId: string | undefined) {
  const courseQuery = useQuery({
    queryKey: ['course', courseId],
    queryFn: () => courseId ? fetchCourse(courseId) : Promise.resolve(undefined),
    enabled: !!courseId
  });

  const unitsQuery = useQuery({
    queryKey: ['units', courseId],
    queryFn: () => courseId ? fetchUnitsForCourse(courseId) : Promise.resolve([]),
    enabled: !!courseId
  });

  return {
    course: courseQuery.data,
    units: unitsQuery.data || [],
    isLoading: courseQuery.isLoading || unitsQuery.isLoading,
    isError: courseQuery.isError || unitsQuery.isError
  };
}
