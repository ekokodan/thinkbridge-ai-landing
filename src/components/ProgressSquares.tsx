
import React from 'react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useProgressStore, MasteryLevel } from '@/stores/useProgressStore';

interface ProgressSquareProps {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'unit-test';
}

const ProgressSquares: React.FC<{ items: ProgressSquareProps[] }> = ({ items }) => {
  const progress = useProgressStore(state => state.progress);
  const quizzes = useProgressStore(state => state.quizzes);
  
  const getColorForMasteryLevel = (level: MasteryLevel) => {
    switch (level) {
      case 'mastered': return 'bg-purple-800';
      case 'proficient': return 'bg-indigo-600';
      case 'familiar': return 'bg-amber-400';
      case 'attempted': return 'bg-orange-400';
      case 'not-started': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };
  
  const getSymbolForType = (type: string) => {
    if (type === 'quiz') return '⚡';
    if (type === 'unit-test') return '★';
    return '';
  };
  
  const getMasteryLevel = (item: ProgressSquareProps): MasteryLevel => {
    if (item.type === 'lesson') {
      return progress[item.id]?.masteryLevel || 'not-started';
    } else {
      return quizzes[item.id]?.masteryLevel || 'not-started';
    }
  };
  
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const masteryLevel = getMasteryLevel(item);
          const colorClass = getColorForMasteryLevel(masteryLevel);
          const symbol = getSymbolForType(item.type);
          
          return (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <motion.div
                  className={`w-7 h-7 ${colorClass} rounded-sm flex items-center justify-center text-white font-bold`}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${item.title}: ${masteryLevel}`}
                >
                  {symbol}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.title}</p>
                <p className="text-xs capitalize">{masteryLevel.replace('-', ' ')}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default ProgressSquares;
