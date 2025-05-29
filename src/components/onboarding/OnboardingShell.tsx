
import React from 'react';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { Progress } from '@/components/ui/progress';

interface OnboardingShellProps {
  children: React.ReactNode;
}

const OnboardingShell: React.FC<OnboardingShellProps> = ({ children }) => {
  const { data } = useOnboardingStore();
  
  const steps = [
    'Choose Plan',
    'Personal Info', 
    'Interests',
    'Skills',
    'Review'
  ];
  
  const currentStepIndex = data.currentStep - 1;
  const progress = ((data.currentStep - 1) / (steps.length - 1)) * 100;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome to ThinkBridge
            </h1>
            <p className="text-slate-600">
              Step {data.currentStep} of {steps.length}: {steps[currentStepIndex]}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Step Labels */}
          <div className="flex justify-between text-xs text-slate-500">
            {steps.map((step, index) => (
              <span 
                key={index}
                className={`${index < data.currentStep ? 'text-indigo-600 font-medium' : ''}`}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default OnboardingShell;
