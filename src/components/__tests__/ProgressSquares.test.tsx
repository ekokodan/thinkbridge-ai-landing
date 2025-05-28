
import { render } from '@testing-library/react';
import ProgressSquares from '../ProgressSquares';

const mockProgressData = [
  { id: '1', status: 'mastered' as const, score: 100 },
  { id: '2', status: 'proficient' as const, score: 85 },
  { id: '3', status: 'familiar' as const, score: 70 },
];

describe('ProgressSquares', () => {
  it('renders progress squares', () => {
    render(<ProgressSquares progress={mockProgressData} />);
  });

  it('renders empty state when no progress data', () => {
    render(<ProgressSquares progress={[]} />);
  });
});
