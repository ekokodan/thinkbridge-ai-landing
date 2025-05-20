
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ProgressStats } from '@/api/progress';

interface ProgressLegendProps {
  stats?: ProgressStats;
}

const ProgressLegend: React.FC<ProgressLegendProps> = ({ stats }) => {
  const legendItems = [
    { label: 'Mastered', color: 'bg-purple-800', count: stats?.mastered },
    { label: 'Proficient', color: 'bg-indigo-600', count: stats?.proficient },
    { label: 'Familiar', color: 'bg-amber-400', count: stats?.familiar },
    { label: 'Attempted', color: 'bg-orange-400', count: stats?.attempted },
    { label: 'Not started', color: 'bg-gray-300', count: stats?.notStarted },
    { label: 'Quiz', color: 'bg-blue-500', symbol: '⚡', count: stats?.quizzes },
    { label: 'Unit Test', color: 'bg-green-600', symbol: '★', count: stats?.unitTests }
  ];

  return (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
        {legendItems.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 cursor-help">
                <div 
                  className={`${item.color} w-7 h-7 rounded-sm flex items-center justify-center text-white font-bold`}
                >
                  {item.symbol}
                </div>
                <span className="text-sm">{item.label}</span>
                {typeof item.count === 'number' && (
                  <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.label}: {item.count || 0} items</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default ProgressLegend;
