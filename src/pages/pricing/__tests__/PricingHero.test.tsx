
import { render } from '@testing-library/react';
import PricingHero from '../PricingHero';

describe('PricingHero', () => {
  it('renders without crashing', () => {
    render(<PricingHero />);
  });
});
