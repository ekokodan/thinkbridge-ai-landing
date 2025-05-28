
import { render, screen } from '@testing-library/react';
import ProgressSquares from '../ProgressSquares';
import { useProgressStore, MasteryLevel } from '@/stores/useProgressStore';

// Mock the zustand store
jest.mock('@/stores/useProgressStore');

const mockUseProgressStore = useProgressStore as jest.MockedFunction<typeof useProgressStore>;

describe('ProgressSquares', () => {
  const mockItems = [
    { id: 'item1', title: 'Lesson 1', type: 'lesson' as const },
    { id: 'item2', title: 'Quiz 1', type: 'quiz' as const },
    { id: 'item3', title: 'Unit Test', type: 'unit-test' as const }
  ];

  it('renders the correct number of squares', () => {
    // Mock the progress store return value
    mockUseProgressStore.mockReturnValue({
      progress: {
        item1: { masteryLevel: 'mastered' as MasteryLevel, completed: true }
      },
      quizzes: {
        item2: { masteryLevel: 'familiar' as MasteryLevel, completed: true, score: 70 }
      },
      addProgress: jest.fn(),
      updateProgress: jest.fn(),
      addQuizResult: jest.fn(),
      getXP: jest.fn().mockReturnValue(0),
      getBadges: jest.fn().mockReturnValue([]),
      clearProgress: jest.fn()
    });

    render(<ProgressSquares items={mockItems} />);
    
    // Find all squares (they have role="button")
    const squares = screen.getAllByRole('button');
    expect(squares).toHaveLength(3);
  });
});
