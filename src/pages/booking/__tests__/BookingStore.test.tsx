
import { renderHook, act } from '@testing-library/react';
import { useBookingStore } from '@/stores/useBookingStore';

// Reset the store before each test
beforeEach(() => {
  const { result } = renderHook(() => useBookingStore());
  act(() => {
    result.current.resetBooking();
  });
});

describe('Booking Store', () => {
  it('should persist selected plan between steps', () => {
    const { result } = renderHook(() => useBookingStore());
    
    // Initially plan should be null
    expect(result.current.selectedPlanId).toBeNull();
    
    // Select a plan
    act(() => {
      result.current.selectPlan('tutor-lite');
    });
    
    // Plan should be updated
    expect(result.current.selectedPlanId).toBe('tutor-lite');
    
    // Reset the store
    act(() => {
      result.current.resetBooking();
    });
    
    // Plan should be null again
    expect(result.current.selectedPlanId).toBeNull();
  });
});
