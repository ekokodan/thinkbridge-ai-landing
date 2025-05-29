
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { stepFourSchema } from '@/lib/validationSchemas';
import { z } from 'zod';

type StepFourData = z.infer<typeof stepFourSchema>;

interface StepSkillSnapshotProps {
  onNext: () => void;
  onBack: () => void;
}

const StepSkillSnapshot: React.FC<StepSkillSnapshotProps> = ({ onNext, onBack }) => {
  const { data, updateData, markStepComplete } = useOnboardingStore();
  
  const form = useForm<StepFourData>({
    resolver: zodResolver(stepFourSchema),
    defaultValues: {
      skillLevels: data.skillLevels || {}
    }
  });

  const { watch, setValue, handleSubmit, formState: { errors } } = form;
  const skillLevels = watch('skillLevels');

  const subjects = data.subjects || [];

  const getSkillLabel = (level: number) => {
    const labels = ['', 'Beginner', 'Basic', 'Intermediate', 'Advanced', 'Expert'];
    return labels[level] || 'Unknown';
  };

  const handleSkillChange = (subject: string, value: number[]) => {
    const newSkillLevels = { ...skillLevels, [subject]: value[0] };
    setValue('skillLevels', newSkillLevels);
  };

  const onSubmit = (formData: StepFourData) => {
    updateData(formData);
    markStepComplete(4);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Skill Assessment
        </h2>
        <p className="text-slate-600">
          Rate your current skill level in each subject to help us personalize your learning path.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {subjects.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-slate-600">
                Please go back and select some subjects first.
              </p>
            </CardContent>
          </Card>
        ) : (
          subjects.map((subject) => {
            const currentLevel = skillLevels[subject] || 3;
            
            return (
              <Card key={subject}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {subject}
                    <span className="text-sm font-normal text-indigo-600">
                      {getSkillLabel(currentLevel)}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Slider
                      value={[currentLevel]}
                      onValueChange={(value) => handleSkillChange(subject, value)}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Beginner</span>
                      <span>Basic</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}

        {Object.keys(errors).length > 0 && (
          <div className="text-red-600 text-sm">
            Please rate your skill level for all subjects.
          </div>
        )}

        <div className="flex justify-between pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" disabled={subjects.length === 0}>
            Next: Review
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StepSkillSnapshot;
