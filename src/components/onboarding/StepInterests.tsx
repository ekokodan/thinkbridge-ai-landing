
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepThreeSchema } from '@/lib/validationSchemas';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

const availableSubjects = [
  'Mathematics', 'Science', 'English', 'History', 'Geography',
  'Physics', 'Chemistry', 'Biology', 'Computer Science',
  'Art', 'Music', 'Physical Education', 'Foreign Languages'
];

const StepInterests: React.FC<{ onNext: () => void; onBack: () => void }> = ({ 
  onNext, 
  onBack 
}) => {
  const { data, updateData, markStepComplete } = useOnboardingStore();
  
  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      subjects: data.subjects || [],
      learningGoals: data.learningGoals || '',
      weeklyStudyHours: data.weeklyStudyHours || 5
    }
  });

  const selectedSubjects = watch('subjects');
  const weeklyHours = watch('weeklyStudyHours');

  const toggleSubject = (subject: string) => {
    const current = selectedSubjects || [];
    const updated = current.includes(subject)
      ? current.filter(s => s !== subject)
      : [...current, subject];
    setValue('subjects', updated);
  };

  const onSubmit = (formData: any) => {
    updateData(formData);
    markStepComplete(3);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Your Learning Interests
        </h2>
        <p className="text-slate-600">
          Let us know what subjects you're interested in and your learning goals.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <Label className="text-base font-medium">Select Your Subjects</Label>
            <p className="text-sm text-slate-600 mb-4">Choose the subjects you want to focus on</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {availableSubjects.map((subject) => (
                <Badge
                  key={subject}
                  variant={selectedSubjects?.includes(subject) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-indigo-100 transition-colors"
                  onClick={() => toggleSubject(subject)}
                >
                  {subject}
                  {selectedSubjects?.includes(subject) && (
                    <X className="h-3 w-3 ml-1" />
                  )}
                </Badge>
              ))}
            </div>
            
            {selectedSubjects?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-slate-600">Selected:</span>
                {selectedSubjects.map((subject) => (
                  <Badge key={subject} variant="default">
                    {subject}
                  </Badge>
                ))}
              </div>
            )}
            
            {errors.subjects && (
              <p className="text-red-500 text-sm mt-2">{errors.subjects.message}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Label htmlFor="learningGoals" className="text-base font-medium">Learning Goals</Label>
            <p className="text-sm text-slate-600 mb-3">Tell us what you want to achieve</p>
            <Textarea
              id="learningGoals"
              placeholder="Describe your learning goals, challenges you want to overcome, or specific skills you want to develop..."
              {...register('learningGoals')}
              className="min-h-[100px]"
            />
            {errors.learningGoals && (
              <p className="text-red-500 text-sm mt-1">{errors.learningGoals.message}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <Label className="text-base font-medium">Weekly Study Hours</Label>
            <p className="text-sm text-slate-600 mb-4">How many hours per week can you dedicate to studying?</p>
            
            <Controller
              name="weeklyStudyHours"
              control={control}
              render={({ field }) => (
                <div className="space-y-4">
                  <Slider
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    max={40}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>1 hour</span>
                    <span className="font-medium text-indigo-600">
                      {weeklyHours} hours per week
                    </span>
                    <span>40 hours</span>
                  </div>
                </div>
              )}
            />
            
            {errors.weeklyStudyHours && (
              <p className="text-red-500 text-sm mt-1">{errors.weeklyStudyHours.message}</p>
            )}
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StepInterests;
