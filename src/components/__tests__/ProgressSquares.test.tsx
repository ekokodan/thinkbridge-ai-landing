
import { render } from '@testing-library/react';
import ProgressSquares from '../ProgressSquares';

describe('ProgressSquares', () => {
  it('renders without crashing', () => {
    const mockItems = [
      { id: '1', status: 'mastered', score: 95 },
      { id: '2', status: 'proficient', score: 80 },
      { id: '3', status: 'familiar', score: 65 },
    ];
    render(<ProgressSquares items={mockItems} />);
  });

  it('renders with empty items', () => {
    render(<ProgressSquares items={[]} />);
  });
});
