
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Unit } from '@/api/courses';
import { useProgressStore } from '@/stores/useProgressStore';
import { cn } from '@/lib/utils';

interface CourseSidebarProps {
  units: Unit[];
  isLoading: boolean;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ units, isLoading }) => {
  const { courseId, unitId } = useParams();
  const progress = useProgressStore(state => state.progress);

  // Calculate progress percentage for a unit
  const getUnitProgress = (unit: Unit) => {
    const unitLessons = unit.lessons || [];
    const completedLessons = unitLessons.filter(lesson => 
      progress[lesson.id]?.completed
    ).length;
    
    return unitLessons.length > 0 
      ? Math.round((completedLessons / unitLessons.length) * 100) 
      : 0;
  };

  // Get color class based on progress percentage
  const getProgressColorClass = (percentage: number) => {
    if (percentage >= 90) return 'bg-purple-800'; // Mastered
    if (percentage >= 70) return 'bg-indigo-600'; // Proficient
    if (percentage >= 40) return 'bg-amber-400'; // Familiar
    if (percentage > 0) return 'bg-orange-400';  // Attempted
    return 'bg-gray-300'; // Not started
  };

  return (
    <div className="h-full bg-white border-r border-slate-200 w-64 md:w-72 flex-shrink-0 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold">Course Contents</h2>
      </div>
      
      <div className="overflow-y-auto flex-1 p-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-2 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <nav className="space-y-4">
            {units.map((unit) => {
              const progressPercentage = getUnitProgress(unit);
              const progressColor = getProgressColorClass(progressPercentage);
              
              return (
                <div key={unit.id} className="space-y-1">
                  <NavLink 
                    to={`/courses/${courseId}/units/${unit.id}`}
                    className={({ isActive }) => cn(
                      "block p-2 rounded-md hover:bg-slate-50 transition-colors",
                      isActive ? "bg-slate-100" : ""
                    )}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{unit.title}</span>
                      <div className="mt-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div 
                          className={cn("h-full rounded-full", progressColor)}
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercentage}%` }}
                          transition={{ duration: 0.5 }}
                        ></motion.div>
                      </div>
                      <span className="text-xs text-gray-500 mt-1">
                        {progressPercentage}% complete
                      </span>
                    </div>
                  </NavLink>
                </div>
              );
            })}
          </nav>
        )}
      </div>
    </div>
  );
};

export default CourseSidebar;
