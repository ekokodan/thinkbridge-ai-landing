
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/stores/useBookingStore';

const Confirmation = () => {
  const { resetBooking } = useBookingStore();

  // Reset booking state when leaving the confirmation page
  useEffect(() => {
    return () => {
      resetBooking();
    };
  }, [resetBooking]);

  return (
    <div className="text-center py-8">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="mx-auto h-24 w-24 flex items-center justify-center rounded-full bg-green-100 mb-6"
      >
        <Check className="h-12 w-12 text-green-600" />
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold mb-4"
      >
        Booking Confirmed!
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto"
      >
        Your tutoring session has been successfully booked. You will receive a confirmation email with all the details.
      </motion.p>
      
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Button asChild size="lg">
          <Link to="/">Back to Home</Link>
        </Button>
        
        <Button variant="outline" asChild size="lg">
          <Link to="/book">Book Another Session</Link>
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12 p-6 bg-slate-50 rounded-lg max-w-md mx-auto"
      >
        <h3 className="font-medium mb-2">What happens next?</h3>
        <ul className="text-sm text-muted-foreground text-left space-y-2">
          <li>• You'll receive a confirmation email with session details</li>
          <li>• Your tutor will reach out before the session</li>
          <li>• You'll get a link to join the online session 10 minutes before start time</li>
          <li>• After the session, you can rate your experience and provide feedback</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Confirmation;
