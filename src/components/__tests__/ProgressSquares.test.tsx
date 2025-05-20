
import { render, screen } from '@testing-library/react';
import ProgressSquares from '../ProgressSquares';
import { useProgressStore, MasteryLevel } from '@/stores/useProgressStore';

// Mock the zustand store
jest.mock('@/stores/useProgressStore', () => {
  const originalModule = jest.requireActual('@/stores/useProgressStore');
  return {
    __esModule: true,
    ...originalModule,
    useProgressStore: jest.fn()
  };
});

describe('ProgressSquares', () => {
  const mockItems = [
    { id: 'item1', title: 'Lesson 1', type: 'lesson' as const },
    { id: 'item2', title: 'Quiz 1', type: 'quiz' as const },
    { id: 'item3', title: 'Unit Test', type: 'unit-test' as const }
  ];

  it('renders the correct number of squares', () => {
    // Mock the progress store
    (useProgressStore as jest.Mock).mockReturnValue({
      progress: {
        item1: { masteryLevel: 'mastered' as MasteryLevel, completed: true }
      },
      quizzes: {
        item2: { masteryLevel: 'familiar' as MasteryLevel, completed: true, score: 70 }
      }
    });

    render(<ProgressSquares items={mockItems} />);
    
    // Find all squares (they have role="button")
    const squares = screen.getAllByRole('button');
    expect(squares).toHaveLength(3);
  });
});
