
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchContentItems, fetchSubjects, fetchTopics, ContentFilters } from '@/api/library';

export const useContentItems = (initialFilters?: ContentFilters) => {
  const [filters, setFilters] = useState<ContentFilters>(initialFilters || {});
  
  const contentQuery = useQuery({
    queryKey: ['content-items', filters],
    queryFn: () => fetchContentItems(filters),
  });
  
  return {
    ...contentQuery,
    filters,
    setFilters,
    updateFilter: (filterUpdate: Partial<ContentFilters>) => {
      setFilters(prev => ({
        ...prev,
        ...filterUpdate
      }));
    },
    clearFilters: () => setFilters({})
  };
};

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects,
  });
};

export const useTopics = (subject?: string) => {
  return useQuery({
    queryKey: ['topics', subject],
    queryFn: () => fetchTopics(subject),
  });
};
