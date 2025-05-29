
import React, { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useStudentStore } from '@/stores/useStudentStore';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import OnboardingShell from '@/components/onboarding/OnboardingShell';
import StepPlan from '@/components/onboarding/StepPlan';
import StepPersonalInfo from '@/components/onboarding/StepPersonalInfo';
import StepInterests from '@/components/onboarding/StepInterests';
import StepSkillSnapshot from '@/components/onboarding/StepSkillSnapshot';
import StepReview from '@/components/onboarding/StepReview';

const OnboardingPage: React.FC = () => {
  const { isAuthenticated } = useStudentStore();
  const { data, nextStep, prevStep, resetData } = useOnboardingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = data.step;

  const handleNext = useCallback(() => {
    setIsSubmitting(true);
    setTimeout(() => {
      nextStep();
      setIsSubmitting(false);
    }, 300);
  }, [nextStep]);

  const handlePrev = useCallback(() => {
    setIsSubmitting(true);
    setTimeout(() => {
      prevStep();
      setIsSubmitting(false);
    }, 300);
  }, [prevStep]);

  if (isAuthenticated) {
    return <Navigate to="/student" replace />;
  }

  return (
    <OnboardingShell>
      {currentStep === 1 && <StepPlan onNext={handleNext} />}
      {currentStep === 2 && <StepPersonalInfo onNext={handleNext} onBack={handlePrev} />}
      {currentStep === 3 && <StepInterests onNext={handleNext} onBack={handlePrev} />}
      {currentStep === 4 && <StepSkillSnapshot onNext={handleNext} onPrev={handlePrev} />}
      {currentStep === 5 && <StepReview onBack={handlePrev} />}
    </OnboardingShell>
  );
};

export default OnboardingPage;
