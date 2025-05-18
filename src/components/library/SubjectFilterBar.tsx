
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  SlidersHorizontal,
  Grid,
  List
} from 'lucide-react';
import { useTutorStore } from '@/stores/useTutorStore';
import { useSubjects } from '@/hooks/useLibraryData';

interface SubjectFilterBarProps {
  selectedSubject: string | undefined;
  searchQuery: string;
  onSubjectChange: (subject: string | undefined) => void;
  onSearchChange: (search: string) => void;
  onOpenFilters: () => void;
}

const SubjectFilterBar: React.FC<SubjectFilterBarProps> = ({
  selectedSubject,
  searchQuery,
  onSubjectChange,
  onSearchChange,
  onOpenFilters
}) => {
  const { viewMode, actions } = useTutorStore();
  const { data: subjects, isLoading } = useSubjects();
  
  return (
    <div className="bg-white border-b sticky top-0 z-10 p-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search content library..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={onOpenFilters}
            aria-label="Open filters"
          >
            <SlidersHorizontal size={18} />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className={viewMode === 'grid' ? 'bg-slate-100' : ''}
            onClick={() => actions.toggleViewMode()}
            aria-label="Grid view"
            title="Grid view"
          >
            <Grid size={18} />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            className={viewMode === 'list' ? 'bg-slate-100' : ''}
            onClick={() => actions.toggleViewMode()}
            aria-label="List view"
            title="List view"
          >
            <List size={18} />
          </Button>
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-2 gap-2 -mx-1 px-1">
        <Button
          variant={selectedSubject === undefined ? "default" : "outline"}
          size="sm"
          className="whitespace-nowrap"
          onClick={() => onSubjectChange(undefined)}
        >
          All Subjects
        </Button>
        
        {isLoading ? (
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 w-24 bg-slate-100 animate-pulse rounded-md"></div>
            ))}
          </div>
        ) : (
          subjects?.map((subject) => (
            <motion.div
              key={subject}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant={selectedSubject === subject ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
                onClick={() => onSubjectChange(subject)}
              >
                {subject}
              </Button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubjectFilterBar;
