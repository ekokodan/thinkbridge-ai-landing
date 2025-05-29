
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stepTwoSchema } from '@/lib/validationSchemas';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

const grades = [
  '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade',
  '11th Grade', '12th Grade', 'University Year 1', 'University Year 2',
  'University Year 3', 'University Year 4', 'Graduate'
];

const timezones = [
  'UTC-12:00 - Baker Island',
  'UTC-11:00 - Samoa',
  'UTC-10:00 - Hawaii',
  'UTC-09:00 - Alaska',
  'UTC-08:00 - Pacific Time',
  'UTC-07:00 - Mountain Time',
  'UTC-06:00 - Central Time',
  'UTC-05:00 - Eastern Time',
  'UTC-04:00 - Atlantic Time',
  'UTC-03:00 - Argentina',
  'UTC-02:00 - South Georgia',
  'UTC-01:00 - Azores',
  'UTC+00:00 - London',
  'UTC+01:00 - Central Europe',
  'UTC+02:00 - Eastern Europe',
  'UTC+03:00 - Moscow',
  'UTC+04:00 - Gulf',
  'UTC+05:00 - Pakistan',
  'UTC+05:30 - India',
  'UTC+06:00 - Bangladesh',
  'UTC+07:00 - Thailand',
  'UTC+08:00 - China',
  'UTC+09:00 - Japan',
  'UTC+10:00 - Australia East',
  'UTC+11:00 - Solomon Islands',
  'UTC+12:00 - New Zealand'
];

const StepPersonalInfo: React.FC<{ onNext: () => void; onBack: () => void }> = ({ 
  onNext, 
  onBack 
}) => {
  const { data, updateData, markStepComplete } = useOnboardingStore();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      age: data.age,
      grade: data.grade,
      timezone: data.timezone
    }
  });

  const onSubmit = (formData: any) => {
    updateData(formData);
    markStepComplete(2);
    onNext();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">
          Tell Us About Yourself
        </h2>
        <p className="text-slate-600">
          Help us personalize your learning experience with some basic information.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-4">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="5"
                max="100"
                {...register('age', { valueAsNumber: true })}
                className="mt-1"
              />
              {errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <Label htmlFor="grade">Grade Level</Label>
              <Select onValueChange={(value) => setValue('grade', value)} defaultValue={data.grade}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.grade && (
                <p className="text-red-500 text-sm mt-1">{errors.grade.message}</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-4">
            <Label htmlFor="timezone">Timezone</Label>
            <Select onValueChange={(value) => setValue('timezone', value)} defaultValue={data.timezone}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select your timezone" />
              </SelectTrigger>
              <SelectContent>
                {timezones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.timezone && (
              <p className="text-red-500 text-sm mt-1">{errors.timezone.message}</p>
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

export default StepPersonalInfo;
