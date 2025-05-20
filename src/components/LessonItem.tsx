
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useProgressStore } from '@/stores/useProgressStore';
import { Lesson } from '@/api/courses';

interface LessonItemProps {
  lesson: Lesson;
  courseId: string;
}

const LessonItem: React.FC<LessonItemProps> = ({ lesson, courseId }) => {
  const progress = useProgressStore(state => state.progress);
  const isCompleted = progress[lesson.id]?.completed;
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={`/courses/${courseId}/lessons/${lesson.id}`}>
        <Card className={`overflow-hidden ${isCompleted ? 'border-green-300' : ''}`}>
          <CardContent className="p-4 flex items-start gap-4">
            <div className="bg-indigo-100 rounded-full p-3 flex-shrink-0">
              <Play size={20} className="text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-lg">{lesson.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{lesson.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-gray-500">{lesson.duration} min</span>
                {isCompleted && (
                  <span className="flex items-center gap-1 text-xs text-green-600">
                    <CheckCircle size={14} />
                    Completed
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default LessonItem;
