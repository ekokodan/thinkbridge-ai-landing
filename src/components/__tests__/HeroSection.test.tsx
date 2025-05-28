
import { render } from '@testing-library/react';
import HeroSection from '../HeroSection';

describe('HeroSection', () => {
  it('renders without crashing', () => {
    render(<HeroSection />);
  });
});
