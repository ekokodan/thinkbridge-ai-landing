
import React from 'react';
import { motion } from 'framer-motion';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface OnboardingShellProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const OnboardingShell: React.FC<OnboardingShellProps> = ({ 
  children, 
  title, 
  description 
}) => {
  const { data } = useOnboardingStore();
  const progressValue = ((data.currentStep - 1) / 4) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-600">
              Step {data.currentStep} of 5
            </span>
            <span className="text-sm text-slate-500">
              {Math.round(progressValue)}% Complete
            </span>
          </div>
          <Progress value={progressValue} className="h-2" />
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {title}
                </h1>
                <p className="text-slate-600 text-lg">
                  {description}
                </p>
              </div>
              
              {children}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingShell;
