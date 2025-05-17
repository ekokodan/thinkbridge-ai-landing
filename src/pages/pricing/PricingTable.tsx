
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { fetchPricingPlans, type PricingPlan } from '@/api/pricing';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const PricingTable = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  
  const { data: plans, isLoading, error } = useQuery({
    queryKey: ['pricing-plans'],
    queryFn: fetchPricingPlans,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !plans) {
    return (
      <div className="text-center py-16">
        <p className="text-destructive">Unable to load pricing plans. Please try again later.</p>
      </div>
    );
  }

  const getYearlyPrice = (monthlyPrice: number) => {
    // 15% discount for yearly billing
    return Math.round(monthlyPrice * 12 * 0.85);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Billing toggle */}
        <div className="flex items-center justify-center mb-12">
          <span className={`mr-3 text-base ${billingCycle === 'monthly' ? 'font-semibold' : 'text-muted-foreground'}`}>
            Monthly
          </span>
          <div className="flex items-center">
            <Switch 
              id="billing-toggle" 
              checked={billingCycle === 'yearly'}
              onCheckedChange={(checked) => setBillingCycle(checked ? 'yearly' : 'monthly')}
            />
            <Label htmlFor="billing-toggle" className="ml-2">
              <span className={`${billingCycle === 'yearly' ? 'font-semibold' : 'text-muted-foreground'}`}>
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <Badge variant="secondary" className="ml-2 font-normal">Save 15%</Badge>
              )}
            </Label>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="flex"
            >
              <Card className={`flex flex-col w-full ${plan.isPopular ? 'border-thinkbridge-500 shadow-lg' : 'shadow-md'}`}>
                {plan.isPopular && (
                  <div className="bg-thinkbridge-500 text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className={`${plan.isPopular ? 'pt-6' : 'pt-8'} pb-6 text-center`}>
                  <h3 className="text-2xl font-bold mb-3">{plan.title}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">
                      ${billingCycle === 'monthly' ? plan.price : getYearlyPrice(plan.price) / 12}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <p className="text-sm text-muted-foreground">
                      ${getYearlyPrice(plan.price)} billed annually
                    </p>
                  )}
                  {plan.tutorHours && (
                    <p className="text-sm mt-2 text-thinkbridge-700 font-medium">
                      Includes {plan.tutorHours} hours of live tutoring per month
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex">
                        <Check className="h-5 w-5 text-thinkbridge-500 mr-2 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-6 pb-8">
                  <Button asChild variant={plan.isPopular ? "default" : "outline"} className="w-full">
                    <Link to="/waitlist">{plan.ctaText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
