
import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepOneSchema } from '@/lib/validationSchemas';
import { useOnboardingStore, PlanType } from '@/stores/useOnboardingStore';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

const plans = [
  {
    id: 'ai-only' as PlanType,
    name: 'AI-Only',
    price: '$29/month',
    features: [
      'Unlimited AI tutoring sessions',
      'Personalized learning paths',
      'Progress tracking',
      'Practice exercises'
    ],
    popular: false
  },
  {
    id: 'tutor-lite' as PlanType,
    name: 'Tutor-Lite',
    price: '$79/month',
    features: [
      'Everything in AI-Only',
      '4 human tutor sessions/month',
      'Priority support',
      'Advanced analytics'
    ],
    popular: true
  },
  {
    id: 'tutor-plus' as PlanType,
    name: 'Tutor-Plus',
    price: '$149/month',
    features: [
      'Everything in Tutor-Lite',
      'Unlimited tutor sessions',
      'Group study sessions',
      '1-on-1 learning consultant'
    ],
    popular: false
  }
];

const StepPlan: React.FC<{ onNext: () => void }> = ({ onNext }) => {
  const { data, actions } = useOnboardingStore();
  
  const { handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(stepOneSchema),
    defaultValues: { plan: data.plan }
  });
  
  const selectedPlan = watch('plan');

  const onSubmit = (formData: { plan: PlanType }) => {
    actions.updateData(formData);
    actions.markStepComplete(1);
    onNext();
  };

  const handlePlanSelect = (plan: PlanType) => {
    setValue('plan', plan);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-indigo-500 shadow-lg' 
                  : 'hover:ring-1 hover:ring-indigo-200'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              <CardContent className="p-6 relative">
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-indigo-600">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-2xl font-bold text-indigo-600">
                    {plan.price}
                  </p>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-600">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {selectedPlan === plan.id && (
                  <div className="absolute inset-0 bg-indigo-50/50 rounded-lg flex items-center justify-center">
                    <div className="bg-indigo-600 text-white p-2 rounded-full">
                      <Check className="h-6 w-6" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button 
          type="submit" 
          disabled={!selectedPlan}
          className="px-8"
        >
          Continue
        </Button>
      </div>
    </form>
  );
};

export default StepPlan;
