
import { StudentProfile } from '@/stores/useStudentStore';

export const mockCreateProfile = async (onboardingData: any): Promise<StudentProfile> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const profile: StudentProfile = {
    id: crypto.randomUUID(),
    name: 'Student Name', // Would come from auth
    email: 'student@example.com', // Would come from auth
    age: onboardingData.age,
    grade: onboardingData.grade,
    timezone: onboardingData.timezone,
    subjects: onboardingData.subjects,
    learningGoals: onboardingData.learningGoals,
    weeklyStudyHours: onboardingData.weeklyStudyHours,
    skillLevels: onboardingData.skillLevels,
    plan: onboardingData.plan,
    lastProfileUpdate: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
  
  return profile;
};

export const mockUpdateProfile = async (updates: Partial<StudentProfile>): Promise<StudentProfile> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In real app, this would merge with existing profile from API
  return {
    ...updates,
    lastProfileUpdate: new Date().toISOString()
  } as StudentProfile;
};
