
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PricingHero from '../PricingHero';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('PricingHero Component', () => {
  it('renders the start free button correctly', () => {
    render(
      <BrowserRouter>
        <PricingHero />
      </BrowserRouter>
    );
    
    const button = screen.getByTestId('start-free-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Start Free Trial');
    expect(screen.getByRole('link', { name: /start free trial/i })).toHaveAttribute('href', '/waitlist');
  });
});
