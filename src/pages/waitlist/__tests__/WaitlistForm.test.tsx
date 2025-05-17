
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WaitlistForm from '../WaitlistForm';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock API
jest.mock('@/api/waitlist', () => ({
  submitWaitlistForm: jest.fn(() => 
    Promise.resolve({ success: true, message: 'Success' })
  ),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('WaitlistForm', () => {
  it('validates email is required', async () => {
    renderWithProviders(<WaitlistForm />);
    
    const submitButton = screen.getByRole('button', { name: /join waitlist/i });
    await userEvent.click(submitButton);
    
    expect(await screen.findByText('Please enter a valid email address')).toBeInTheDocument();
  });
});
