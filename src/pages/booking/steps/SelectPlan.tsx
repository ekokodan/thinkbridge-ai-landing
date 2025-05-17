
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchPlans } from '@/api/booking';
import { useBookingStore } from '@/stores/useBookingStore';

const SelectPlan = () => {
  const navigate = useNavigate();
  const { selectedPlanId, selectPlan, selectedSubjectId } = useBookingStore();
  
  const { data: plans, isLoading } = useQuery({
    queryKey: ['plans'],
    queryFn: fetchPlans
  });
  
  const handleBack = () => {
    navigate('/book/subject');
  };
  
  const handleContinue = () => {
    if (selectedPlanId) {
      navigate('/book/schedule');
    }
  };
  
  // Redirect if no subject is selected
  if (!selectedSubjectId) {
    navigate('/book/subject');
    return null;
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
      <p className="text-muted-foreground mb-8">
        Select a tutoring plan that fits your needs
      </p>
      
      <motion.div 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {plans?.map((plan) => (
          <Card 
            key={plan.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedPlanId === plan.id ? 'border-thinkbridge-600' : ''
            }`}
            onClick={() => selectPlan(plan.id)}
          >
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <div className="flex items-center">
                  <div className={`
                    h-5 w-5 rounded-full mr-3 border-2 
                    ${selectedPlanId === plan.id 
                      ? 'border-thinkbridge-600 bg-thinkbridge-600' 
                      : 'border-slate-300'
                    }
                  `}></div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                </div>
                <p className="text-muted-foreground ml-8 mt-1">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold">${plan.price}</div>
                {!plan.isOneOff && <div className="text-sm text-muted-foreground">per month</div>}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>
      
      <div className="mt-12 flex justify-between">
        <Button 
          variant="outline" 
          onClick={handleBack}
          size="lg"
        >
          Back
        </Button>
        
        <Button 
          onClick={handleContinue} 
          disabled={!selectedPlanId}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SelectPlan;
