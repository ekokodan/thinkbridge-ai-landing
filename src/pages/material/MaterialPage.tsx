
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MaterialComponent from '@/components/material/MaterialComponent';
import { MaterialCard, UserProgress } from '@/types/materialCard';

// Mock data - replace with actual API calls
const mockCard: MaterialCard = {
  id: '1',
  title: 'Introduction to Linear Equations',
  moduleId: 'algebra-basics',
  moduleTitle: 'Algebra Basics',
  stepNumber: 3,
  totalSteps: 12,
  body: [
    {
      id: '1',
      type: 'markdown',
      content: { markdown: '<h2>What is a Linear Equation?</h2><p>A linear equation is an algebraic equation in which each term is either a constant or the product of a constant and a single variable.</p>' }
    },
    {
      id: '2',
      type: 'image',
      content: { 
        src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb',
        alt: 'Linear equation graph',
        caption: 'Example of a linear equation plotted on a coordinate plane'
      }
    },
    {
      id: '3',
      type: 'code',
      content: {
        code: 'y = mx + b\n\nWhere:\n- m is the slope\n- b is the y-intercept\n- x and y are variables',
        language: 'mathematics'
      }
    }
  ],
  examples: [
    {
      id: 'ex1',
      problem: 'Solve for x: 2x + 5 = 13',
      steps: [
        'Subtract 5 from both sides: 2x = 8',
        'Divide both sides by 2: x = 4'
      ],
      answer: 'x = 4'
    }
  ],
  practice: {
    id: 'q1',
    type: 'numeric',
    question: 'Solve for x: 3x - 7 = 11',
    correctAnswer: 6,
    hint: 'First add 7 to both sides, then divide by 3'
  },
  prerequisites: [],
  estimatedTime: 8
};

const mockProgress: UserProgress = {
  accuracyPct: 75,
  attempts: 2,
  masteryStatus: 'active',
  hintsUsed: 0
};

const MaterialPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleAnswerSubmitted = (payload: { answer: string; isCorrect: boolean }) => {
    console.log('Answer submitted:', payload);
    // Update progress, save to backend
  };

  const handleCardComplete = (masteryStatus: string) => {
    console.log('Card completed with status:', masteryStatus);
    // Mark card as complete, update progress
  };

  const handleNavigate = (direction: 'prev' | 'next' | 'recommended') => {
    console.log('Navigate:', direction);
    // Handle navigation logic
    if (direction === 'next') {
      navigate('/material/2');
    } else if (direction === 'prev') {
      navigate('/material/1');
    }
  };

  return (
    <MaterialComponent
      card={mockCard}
      userProgress={mockProgress}
      onAnswerSubmitted={handleAnswerSubmitted}
      onCardComplete={handleCardComplete}
      onNavigate={handleNavigate}
    />
  );
};

export default MaterialPage;
