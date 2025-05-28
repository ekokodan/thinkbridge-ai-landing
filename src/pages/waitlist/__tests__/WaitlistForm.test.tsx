
import { render } from '@testing-library/react';
import WaitlistForm from '../WaitlistForm';

describe('WaitlistForm', () => {
  it('renders without crashing', () => {
    render(<WaitlistForm />);
  });
});
