
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProgressStore } from '@/stores/useProgressStore';
import { Practice } from '@/api/courses';
import QuizModal from './QuizModal';

interface PracticeItemProps {
  practice: Practice;
}

const PracticeItem: React.FC<PracticeItemProps> = ({ practice }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const quizzes = useProgressStore(state => state.quizzes);
  const isCompleted = quizzes[practice.id]?.completed;
  const score = quizzes[practice.id]?.score;
  
  const difficultyLabel = () => {
    switch (practice.difficulty) {
      case 1: return "Beginner";
      case 2: return "Intermediate";
      case 3: return "Advanced";
      default: return "Beginner";
    }
  };
  
  const getIcon = () => {
    return practice.type === 'quiz' 
      ? <span className="text-xl">⚡</span> 
      : <span className="text-xl">★</span>;
  };
  
  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Card className={`overflow-hidden ${isCompleted ? 'border-purple-300' : ''}`}>
          <CardContent className="p-4 flex items-start gap-4">
            <div className="bg-purple-100 rounded-full p-3 flex-shrink-0 flex items-center justify-center">
              {getIcon()}
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-lg">{practice.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{practice.description}</p>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {difficultyLabel()}
                  </span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {practice.questions.length} questions
                  </span>
                  
                  {isCompleted && (
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      Score: {score}%
                    </span>
                  )}
                </div>
                
                <Button 
                  onClick={() => setIsModalOpen(true)}
                  variant={isCompleted ? "outline" : "default"} 
                  size="sm"
                >
                  {isCompleted ? "Retry" : "Start"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {isModalOpen && (
        <QuizModal 
          practice={practice} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default PracticeItem;
