
import React, { useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useContentItems } from '@/hooks/useLibraryData';
import SubjectFilterBar from '@/components/library/SubjectFilterBar';
import ContentGrid from '@/components/library/ContentGrid';
import FiltersDrawer from '@/components/library/FiltersDrawer';
import ContentDetail from '@/components/library/ContentDetail';

const LibraryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { 
    data: contentItems,
    isLoading,
    filters,
    updateFilter,
    setFilters
  } = useContentItems({
    subject: selectedSubject,
    search: searchQuery
  });
  
  // If we're viewing a specific content item
  if (id) {
    const contentItem = contentItems?.find(item => item.id === id);
    
    if (!contentItem && !isLoading) {
      return <div className="p-8">Content item not found.</div>;
    }
    
    return contentItem ? <ContentDetail item={contentItem} /> : <div className="p-8">Loading...</div>;
  }
  
  const handleSubjectChange = (subject: string | undefined) => {
    setSelectedSubject(subject);
    updateFilter({ subject });
  };
  
  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    updateFilter({ search });
  };
  
  const handleOpenFilters = () => {
    setIsFilterDrawerOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <SubjectFilterBar
        selectedSubject={selectedSubject}
        searchQuery={searchQuery}
        onSubjectChange={handleSubjectChange}
        onSearchChange={handleSearchChange}
        onOpenFilters={handleOpenFilters}
      />
      
      <ContentGrid items={contentItems || []} isLoading={isLoading} />
      
      <FiltersDrawer 
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onUpdateFilters={setFilters}
        selectedSubject={selectedSubject}
      />
      
      <Outlet />
    </div>
  );
};

export default LibraryPage;
