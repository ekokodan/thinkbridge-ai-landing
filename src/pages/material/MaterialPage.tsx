
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MaterialComponent from '@/components/material/MaterialComponent';
import { MaterialCard, UserProgress } from '@/types/materialCard';

// Enhanced mock data with multiple cards
const mockCards: Record<string, MaterialCard> = {
  '1': {
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
        content: { 
          markdown: `
            <h2>What is a Linear Equation?</h2>
            <p>A linear equation is an algebraic equation in which each term is either a constant or the product of a constant and a single variable.</p>
            <p>Linear equations appear frequently in all mathematics and their applications in physics and engineering, partly because non-linear systems are often well approximated by linear equations.</p>
            <h3>Standard Form</h3>
            <p>The standard form of a linear equation in one variable is:</p>
          `
        }
      },
      {
        id: '2',
        type: 'code',
        content: {
          code: 'ax + b = 0\n\nWhere:\n• a and b are constants\n• a ≠ 0\n• x is the variable',
          language: 'mathematics'
        }
      },
      {
        id: '3',
        type: 'image',
        content: { 
          src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop',
          alt: 'Linear equation graph showing y = mx + b',
          caption: 'Example of a linear equation y = 2x + 1 plotted on a coordinate plane'
        }
      },
      {
        id: '4',
        type: 'markdown',
        content: {
          markdown: `
            <h3>Slope-Intercept Form</h3>
            <p>When graphing linear equations, we often use the slope-intercept form:</p>
          `
        }
      },
      {
        id: '5',
        type: 'code',
        content: {
          code: 'y = mx + b\n\nWhere:\n• m is the slope of the line\n• b is the y-intercept\n• x and y are variables',
          language: 'mathematics'
        }
      }
    ],
    examples: [
      {
        id: 'ex1',
        problem: 'Solve for x: 2x + 5 = 13',
        steps: [
          'Start with the equation: 2x + 5 = 13',
          'Subtract 5 from both sides: 2x + 5 - 5 = 13 - 5',
          'Simplify: 2x = 8',
          'Divide both sides by 2: 2x ÷ 2 = 8 ÷ 2',
          'Final answer: x = 4'
        ],
        answer: 'x = 4'
      },
      {
        id: 'ex2',
        problem: 'Find the slope and y-intercept of: y = -3x + 7',
        steps: [
          'Identify the slope-intercept form: y = mx + b',
          'Compare with given equation: y = -3x + 7',
          'The coefficient of x is the slope: m = -3',
          'The constant term is the y-intercept: b = 7'
        ],
        answer: 'Slope = -3, y-intercept = 7'
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
  },
  '2': {
    id: '2',
    title: 'Solving Systems of Linear Equations',
    moduleId: 'algebra-basics',
    moduleTitle: 'Algebra Basics',
    stepNumber: 4,
    totalSteps: 12,
    body: [
      {
        id: '1',
        type: 'markdown',
        content: {
          markdown: `
            <h2>Systems of Linear Equations</h2>
            <p>A system of linear equations is a collection of two or more linear equations involving the same set of variables.</p>
            <p>There are three main methods for solving systems:</p>
            <ul>
              <li>Substitution Method</li>
              <li>Elimination Method</li>
              <li>Graphical Method</li>
            </ul>
          `
        }
      },
      {
        id: '2',
        type: 'video',
        content: {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          thumbnail: 'https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&h=450&fit=crop',
          title: 'Systems of Linear Equations Tutorial'
        }
      }
    ],
    examples: [
      {
        id: 'ex1',
        problem: 'Solve the system: x + y = 5 and 2x - y = 1',
        steps: [
          'Use elimination method',
          'Add the equations: (x + y) + (2x - y) = 5 + 1',
          'Simplify: 3x = 6',
          'Solve for x: x = 2',
          'Substitute back: 2 + y = 5, so y = 3'
        ],
        answer: 'x = 2, y = 3'
      }
    ],
    practice: {
      id: 'q2',
      type: 'expression',
      question: 'What is the value of y when x = 1 in the system: x + 2y = 7?',
      correctAnswer: '3',
      hint: 'Substitute x = 1 into the equation and solve for y'
    },
    prerequisites: ['1'],
    estimatedTime: 12
  },
  '3': {
    id: '3',
    title: 'Interactive Graphing Tool',
    moduleId: 'algebra-basics',
    moduleTitle: 'Algebra Basics',
    stepNumber: 5,
    totalSteps: 12,
    body: [
      {
        id: '1',
        type: 'markdown',
        content: {
          markdown: `
            <h2>Graphing Linear Equations</h2>
            <p>Understanding how to graph linear equations helps visualize mathematical relationships.</p>
          `
        }
      },
      {
        id: '2',
        type: 'interactive',
        content: {
          iframeSrc: 'https://www.desmos.com/calculator',
          height: 400
        }
      }
    ],
    examples: [],
    practice: {
      id: 'q3',
      type: 'multiple-choice',
      question: 'Which point lies on the line y = 2x + 1?',
      options: ['(0, 1)', '(1, 2)', '(2, 4)', '(3, 7)'],
      correctAnswer: '(3, 7)',
      hint: 'Substitute each x-value into the equation and check if you get the corresponding y-value'
    },
    prerequisites: ['1', '2'],
    estimatedTime: 15
  }
};

const mockProgress: Record<string, UserProgress> = {
  '1': {
    accuracyPct: 75,
    attempts: 2,
    masteryStatus: 'active',
    hintsUsed: 0
  },
  '2': {
    accuracyPct: 90,
    attempts: 1,
    masteryStatus: 'mastered',
    hintsUsed: 1
  },
  '3': {
    accuracyPct: 0,
    attempts: 0,
    masteryStatus: 'locked',
    hintsUsed: 0
  }
};

const MaterialPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Get the card data or default to first card
  const cardId = id || '1';
  const card = mockCards[cardId] || mockCards['1'];
  const userProgress = mockProgress[cardId] || mockProgress['1'];

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
    const currentId = parseInt(cardId);
    
    if (direction === 'next' && currentId < 3) {
      navigate(`/material/${currentId + 1}`);
    } else if (direction === 'prev' && currentId > 1) {
      navigate(`/material/${currentId - 1}`);
    } else if (direction === 'recommended') {
      // Navigate to a recommended card based on performance
      navigate('/material/1');
    }
  };

  return (
    <MaterialComponent
      card={card}
      userProgress={userProgress}
      onAnswerSubmitted={handleAnswerSubmitted}
      onCardComplete={handleCardComplete}
      onNavigate={handleNavigate}
    />
  );
};

export default MaterialPage;
