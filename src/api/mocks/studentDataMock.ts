
import { LessonCredit, Homework, UpcomingSession } from '@/stores/useStudentStore';

export const mockGetCredits = async (): Promise<LessonCredit[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      type: 'ai-session',
      remaining: 12,
      total: 20,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      type: 'tutor-session',
      remaining: 3,
      total: 8,
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
};

export const mockGetHomework = async (): Promise<Homework[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: '1',
      title: 'Algebra Practice Set 3',
      subject: 'Mathematics',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false,
      description: 'Complete exercises 1-15 on quadratic equations',
      difficulty: 'medium'
    },
    {
      id: '2',
      title: 'Essay: Scientific Revolution',
      subject: 'History',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      completed: false,
      description: 'Write a 500-word essay on the impact of the Scientific Revolution',
      difficulty: 'hard'
    },
    {
      id: '3',
      title: 'Chemistry Lab Report',
      subject: 'Chemistry',
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      completed: true,
      description: 'Submit lab report for Experiment 4: Chemical Reactions',
      difficulty: 'medium'
    }
  ];
};

export const mockGetUpcomingSessions = async (): Promise<UpcomingSession[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return [
    {
      id: '1',
      title: 'Math Tutoring Session',
      type: 'tutor',
      datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 60,
      tutor: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      title: 'AI Study Session - Chemistry',
      type: 'ai',
      datetime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 30
    },
    {
      id: '3',
      title: 'Group Study - History',
      type: 'group',
      datetime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      duration: 45
    }
  ];
};

export const mockGetProgressData = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    skillRadarData: [
      { subject: 'Mathematics', value: 75 },
      { subject: 'Science', value: 68 },
      { subject: 'English', value: 82 },
      { subject: 'History', value: 71 },
      { subject: 'Geography', value: 65 }
    ],
    progressOverTime: [
      { date: '2024-01-01', score: 65 },
      { date: '2024-01-15', score: 68 },
      { date: '2024-02-01', score: 72 },
      { date: '2024-02-15', score: 75 },
      { date: '2024-03-01', score: 78 }
    ]
  };
};
