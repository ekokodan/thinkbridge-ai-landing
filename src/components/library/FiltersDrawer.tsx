
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { useTopics } from '@/hooks/useLibraryData';
import { ContentFilters } from '@/api/library';

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ContentFilters;
  onUpdateFilters: (filters: ContentFilters) => void;
  selectedSubject: string | undefined;
}

const FiltersDrawer: React.FC<FiltersDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onUpdateFilters,
  selectedSubject
}) => {
  const { data: topics, isLoading: topicsLoading } = useTopics(selectedSubject);
  
  const handleTopicToggle = (topic: string) => {
    const currentTopics = filters.topics || [];
    let newTopics: string[];
    
    if (currentTopics.includes(topic)) {
      newTopics = currentTopics.filter(t => t !== topic);
    } else {
      newTopics = [...currentTopics, topic];
    }
    
    onUpdateFilters({ ...filters, topics: newTopics.length ? newTopics : undefined });
  };
  
  const handleTypeToggle = (type: string) => {
    const currentTypes = filters.type || [];
    let newTypes: string[];
    
    if (currentTypes.includes(type)) {
      newTypes = currentTypes.filter(t => t !== type);
    } else {
      newTypes = [...currentTypes, type];
    }
    
    onUpdateFilters({ ...filters, type: newTypes.length ? newTypes : undefined });
  };
  
  const handleDifficultyToggle = (difficulty: string) => {
    const currentDifficulties = filters.difficulty || [];
    let newDifficulties: string[];
    
    if (currentDifficulties.includes(difficulty)) {
      newDifficulties = currentDifficulties.filter(d => d !== difficulty);
    } else {
      newDifficulties = [...currentDifficulties, difficulty];
    }
    
    onUpdateFilters({ ...filters, difficulty: newDifficulties.length ? newDifficulties : undefined });
  };
  
  const handleLanguageToggle = (language: string) => {
    const currentLanguages = filters.language || [];
    let newLanguages: string[];
    
    if (currentLanguages.includes(language)) {
      newLanguages = currentLanguages.filter(l => l !== language);
    } else {
      newLanguages = [...currentLanguages, language];
    }
    
    onUpdateFilters({ ...filters, language: newLanguages.length ? newLanguages : undefined });
  };
  
  const handleClearFilters = () => {
    onUpdateFilters({
      subject: selectedSubject,
      search: filters.search
    });
  };
  
  return (
    <motion.div
      className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg z-20 overflow-y-auto"
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close filters">
            <X size={20} />
          </Button>
        </div>
        
        <div className="space-y-6">
          {/* Content Type Filter */}
          <div>
            <h3 className="font-semibold mb-2">Content Type</h3>
            <div className="space-y-2">
              {['Video', 'Document', 'Practice', 'Interactive'].map(type => (
                <div key={type} className="flex items-center">
                  <Checkbox 
                    id={`type-${type}`}
                    checked={filters.type?.includes(type) || false}
                    onCheckedChange={() => handleTypeToggle(type)}
                  />
                  <label
                    htmlFor={`type-${type}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Difficulty Level Filter */}
          <div>
            <h3 className="font-semibold mb-2">Difficulty</h3>
            <div className="space-y-2">
              {['Beginner', 'Intermediate', 'Advanced'].map(difficulty => (
                <div key={difficulty} className="flex items-center">
                  <Checkbox 
                    id={`difficulty-${difficulty}`}
                    checked={filters.difficulty?.includes(difficulty) || false}
                    onCheckedChange={() => handleDifficultyToggle(difficulty)}
                  />
                  <label
                    htmlFor={`difficulty-${difficulty}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {difficulty}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Language Filter */}
          <div>
            <h3 className="font-semibold mb-2">Language</h3>
            <div className="space-y-2">
              {['English', 'Spanish', 'French', 'Mandarin', 'German'].map(language => (
                <div key={language} className="flex items-center">
                  <Checkbox 
                    id={`language-${language}`}
                    checked={filters.language?.includes(language) || false}
                    onCheckedChange={() => handleLanguageToggle(language)}
                  />
                  <label
                    htmlFor={`language-${language}`}
                    className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {language}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Topic Tags Filter */}
          <div>
            <h3 className="font-semibold mb-2">Topics</h3>
            {topicsLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-6 bg-slate-100 animate-pulse rounded"></div>
                ))}
              </div>
            ) : topics && topics.length > 0 ? (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {topics.map(topic => (
                  <div key={topic} className="flex items-center">
                    <Checkbox 
                      id={`topic-${topic}`}
                      checked={filters.topics?.includes(topic) || false}
                      onCheckedChange={() => handleTopicToggle(topic)}
                    />
                    <label
                      htmlFor={`topic-${topic}`}
                      className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {topic}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No topics available</p>
            )}
          </div>
        </div>
        
        <div className="mt-8 space-y-3 border-t pt-6">
          <Button className="w-full" onClick={onClose}>
            Apply Filters
          </Button>
          <Button variant="outline" className="w-full" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FiltersDrawer;
