
import { z } from 'zod';

export const stepOneSchema = z.object({
  plan: z.enum(['ai-only', 'tutor-lite', 'tutor-plus'], {
    required_error: 'Please select a plan'
  })
});

export const stepTwoSchema = z.object({
  age: z.number().min(5).max(100, 'Age must be between 5 and 100'),
  grade: z.string().min(1, 'Grade is required'),
  timezone: z.string().min(1, 'Timezone is required')
});

export const stepThreeSchema = z.object({
  subjects: z.array(z.string()).min(1, 'Please select at least one subject'),
  learningGoals: z.string().min(10, 'Please describe your learning goals (at least 10 characters)'),
  weeklyStudyHours: z.number().min(1).max(40, 'Study hours must be between 1 and 40')
});

export const stepFourSchema = z.object({
  skillLevels: z.record(z.string(), z.number().min(1).max(5))
});

export const profileSettingsSchema = z.object({
  subjects: z.array(z.string()).min(1, 'Please select at least one subject'),
  learningGoals: z.string().min(10, 'Please describe your learning goals (at least 10 characters)'),
  grade: z.string().min(1, 'Grade is required'),
  timezone: z.string().min(1, 'Timezone is required'),
  weeklyStudyHours: z.number().min(1).max(40, 'Study hours must be between 1 and 40')
});
