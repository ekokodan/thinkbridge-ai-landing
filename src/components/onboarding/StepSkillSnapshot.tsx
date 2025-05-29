
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepFourSchema } from '@/lib/validationSchemas';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';

const skillLevels = [
  { value: 1, label: 'Beginner', description: 'Just starting out' },
  { value: 2, label: 'Basic', description: 'Know the fundamentals' },
  { value: 3, label: 'Intermediate', description: 'Comfortable with concepts' },
  { value: 4, label: 'Advanced', description: 'Strong understanding' },
  { value: 5, label: 'Expert', description: 'Mastery level' }
];

const StepSkillSnapshot: React.FC<{ onNext: () => void; onBack: () => void }> = ({ 
  onNext, 
  onBack 
}) => {
  const { data, actions } = useOnboardingStore();
  
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(stepFourSchema),
    defaultValues: {
      skillLevels: data.skillLevels
    }
  });

  const onSubmit = (formData: any) => {
    actions.updateData(formData);
    actions.markStepComplete(4);
    onNext();
  };

  const getSkillLabel = (value: number) => {
    const skill = skillLevels.find(s => s.value === value);
    return skill ? `${skill.label} - ${skill.description}` : '';
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-slate-600">
          Rate your current skill level in each subject to help us personalize your learning experience.
        </p>
      </div>

      <div className="space-y-4">
        {data.subjects.map((subject) => (
          <Card key={subject}>
            <CardContent className="p-6">
              <Label className="text-base font-medium mb-4 block">{subject}</Label>
              
              <Controller
                name={`skillLevels.${subject}`}
                control={control}
                defaultValue={3}
                render={({ field }) => (
                  <div className="space-y-4">
                    <Slider
                      value={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                      max={5}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    
                    <div className="flex justify-between text-xs text-slate-500">
                      {skillLevels.map((level) => (
                        <span key={level.value} className="text-center">
                          {level.label}
                        </span>
                      ))}
                    </div>
                    
                    <p className="text-sm text-indigo-600 font-medium text-center">
                      {getSkillLabel(field.value)}
                    </p>
                  </div>
                )}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      
      {errors.skillLevels && (
        <p className="text-red-500 text-sm">{errors.skillLevels.message}</p>
      )}
      
      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default StepSkillSnapshot;
