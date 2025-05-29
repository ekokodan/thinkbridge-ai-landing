
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import OnboardingShell from '@/components/onboarding/OnboardingShell';
import StepPlan from '@/components/onboarding/StepPlan';
import StepPersonalInfo from '@/components/onboarding/StepPersonalInfo';
import StepInterests from '@/components/onboarding/StepInterests';
import StepSkillSnapshot from '@/components/onboarding/StepSkillSnapshot';
import StepReview from '@/components/onboarding/StepReview';

const steps = [
  {
    title: 'Choose Your Learning Plan',
    description: 'Select the plan that best fits your learning needs and goals.'
  },
  {
    title: 'Tell Us About Yourself',
    description: 'Help us understand your academic background and preferences.'
  },
  {
    title: 'Your Learning Interests',
    description: 'What subjects interest you and what are your learning goals?'
  },
  {
    title: 'Quick Skill Assessment',
    description: 'Rate your current skill level to personalize your experience.'
  },
  {
    title: 'Review & Confirm',
    description: 'Review your information and create your ThinkBridge account.'
  }
];

const OnboardingPage: React.FC = () => {
  const { data, actions } = useOnboardingStore();
  const navigate = useNavigate();

  const handleNext = () => {
    const nextStep = data.currentStep + 1;
    if (nextStep <= 5) {
      actions.setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    const prevStep = data.currentStep - 1;
    if (prevStep >= 1) {
      actions.setCurrentStep(prevStep);
    }
  };

  const renderStep = () => {
    switch (data.currentStep) {
      case 1:
        return <StepPlan onNext={handleNext} />;
      case 2:
        return <StepPersonalInfo onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <StepInterests onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <StepSkillSnapshot onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <StepReview onBack={handleBack} />;
      default:
        return <StepPlan onNext={handleNext} />;
    }
  };

  const currentStepInfo = steps[data.currentStep - 1];

  return (
    <OnboardingShell
      title={currentStepInfo.title}
      description={currentStepInfo.description}
    >
      {renderStep()}
    </OnboardingShell>
  );
};

export default OnboardingPage;
