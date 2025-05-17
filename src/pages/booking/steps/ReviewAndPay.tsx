
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useQueries, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { fetchSubjects, fetchPlans, fetchTutors, submitBooking } from '@/api/booking';
import { useBookingStore } from '@/stores/useBookingStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  studentName: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  notes: z.string().optional(),
  couponCode: z.string().optional(),
});

const ReviewAndPay = () => {
  const navigate = useNavigate();
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  
  const {
    selectedSubjectId,
    selectedPlanId,
    selectedTutorId,
    selectedSlotId,
    selectedDate,
    studentName,
    email,
    notes,
    couponCode,
    updateStudentInfo,
    resetBooking,
  } = useBookingStore();
  
  // Redirect if required selections are missing
  if (!selectedSubjectId || !selectedPlanId || !selectedTutorId || !selectedSlotId || !selectedDate) {
    navigate('/book');
    return null;
  }
  
  // Form setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName,
      email,
      notes,
      couponCode,
    },
  });
  
  // Fetch all necessary data
  const [
    subjectsQuery,
    plansQuery,
    tutorsQuery,
  ] = useQueries({
    queries: [
      { queryKey: ['subjects'], queryFn: fetchSubjects },
      { queryKey: ['plans'], queryFn: fetchPlans },
      { 
        queryKey: ['tutors', selectedSubjectId], 
        queryFn: () => fetchTutors(selectedSubjectId || ''),
        enabled: !!selectedSubjectId,
      },
    ],
  });

  // Setup booking submission mutation
  const bookingMutation = useMutation({
    mutationFn: submitBooking,
    onSuccess: () => {
      navigate('/book/confirmation');
    },
    onError: (error) => {
      toast({
        title: 'Booking Failed',
        description: 'There was a problem processing your booking. Please try again.',
        variant: 'destructive',
      });
      setIsPaymentProcessing(false);
    },
  });
  
  const handleBack = () => {
    navigate('/book/schedule');
  };
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Update store with form values
    updateStudentInfo({
      studentName: values.studentName,
      email: values.email,
      notes: values.notes || '',
      couponCode: values.couponCode || '',
    });
    
    // Process payment (simulated)
    setIsPaymentProcessing(true);
    
    // Simulate Stripe processing
    setTimeout(() => {
      bookingMutation.mutate({
        subjectId: selectedSubjectId || '',
        planId: selectedPlanId || '',
        tutorId: selectedTutorId || '',
        slotId: selectedSlotId || '',
        studentName: values.studentName,
        email: values.email,
        notes: values.notes,
        couponCode: values.couponCode,
      });
    }, 1500);
  };
  
  // Loading state
  if (subjectsQuery.isLoading || plansQuery.isLoading || tutorsQuery.isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Find selected items
  const selectedSubject = subjectsQuery.data?.find(s => s.id === selectedSubjectId);
  const selectedPlan = plansQuery.data?.find(p => p.id === selectedPlanId);
  const selectedTutor = tutorsQuery.data?.find(t => t.id === selectedTutorId);
  
  // Format date and time
  const formattedDate = selectedDate ? format(new Date(selectedDate), 'MMMM d, yyyy') : '';
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Review Your Booking</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left column with booking summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground">Subject</div>
                <div className="font-medium">{selectedSubject?.name}</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Plan</div>
                <div className="font-medium">{selectedPlan?.name}</div>
                <div className="text-sm">{selectedPlan?.description}</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Tutor</div>
                <div className="font-medium">{selectedTutor?.name}</div>
              </div>
              
              <div>
                <div className="text-sm text-muted-foreground">Date & Time</div>
                <div className="font-medium">{formattedDate}</div>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start border-t pt-6">
              <div className="flex justify-between w-full text-lg font-bold">
                <div>Total</div>
                <div>${selectedPlan?.price}</div>
              </div>
              {!selectedPlan?.isOneOff && (
                <div className="text-sm text-muted-foreground w-full text-right">
                  billed monthly
                </div>
              )}
            </CardFooter>
          </Card>
        </div>
        
        {/* Right column with payment form */}
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Full name" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="your@email.com" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Any special requests or information" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="couponCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter coupon code" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Payment section - Stripe placeholder */}
              <div className="border rounded-lg p-4">
                <div className="text-sm font-medium mb-4">Payment Method</div>
                <div className="p-6 bg-slate-50 rounded border border-dashed text-center text-muted-foreground">
                  [Stripe Payment Form Integration Placeholder]
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={handleBack}
                  disabled={isPaymentProcessing}
                  size="lg"
                >
                  Back
                </Button>
                
                <Button 
                  type="submit"
                  disabled={isPaymentProcessing}
                  size="lg"
                >
                  {isPaymentProcessing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                      Processing...
                    </>
                  ) : (
                    'Complete Booking'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndPay;
