
import { render } from '@testing-library/react';
import ProgressSquares from '../ProgressSquares';

describe('ProgressSquares', () => {
  it('renders without crashing', () => {
    const mockItems = [
      { id: '1', title: 'Test Item 1', type: 'lesson' as const, status: 'mastered', score: 95 },
      { id: '2', title: 'Test Item 2', type: 'quiz' as const, status: 'proficient', score: 80 },
      { id: '3', title: 'Test Item 3', type: 'unit-test' as const, status: 'familiar', score: 65 },
    ];
    render(<ProgressSquares items={mockItems} />);
  });

  it('renders with empty items', () => {
    render(<ProgressSquares items={[]} />);
  });
});
