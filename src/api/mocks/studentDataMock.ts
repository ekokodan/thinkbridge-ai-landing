
export interface LessonCredit {
  type: 'ai-session' | 'tutor-session' | 'group-session';
  remaining: number;
  total: number;
  expiryDate: string;
}

export interface Homework {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface UpcomingSession {
  id: string;
  subject: string;
  type: 'video' | 'in-person';
  date: string;
  time: string;
  tutorName: string;
}

export interface ProgressData {
  skillRadarData: Array<{
    subject: string;
    value: number;
  }>;
  progressOverTime: Array<{
    date: string;
    score: number;
  }>;
}

// Mock data functions
export const mockGetCredits = async (): Promise<LessonCredit[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    {
      type: 'ai-session',
      remaining: 8,
      total: 10,
      expiryDate: '2024-02-15'
    },
    {
      type: 'tutor-session',
      remaining: 3,
      total: 5,
      expiryDate: '2024-02-20'
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
      dueDate: 'Tomorrow',
      completed: false,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Essay: Shakespeare Analysis',
      subject: 'English',
      dueDate: 'Friday',
      completed: false,
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Chemistry Lab Report',
      subject: 'Chemistry',
      dueDate: 'Completed',
      completed: true,
      priority: 'low'
    }
  ];
};

export const mockGetUpcomingSessions = async (): Promise<UpcomingSession[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return [
    {
      id: '1',
      subject: 'Mathematics',
      type: 'video',
      date: 'Today',
      time: '3:00 PM',
      tutorName: 'Dr. Sarah Wilson'
    },
    {
      id: '2',
      subject: 'Physics',
      type: 'in-person',
      date: 'Tomorrow',
      time: '2:00 PM',
      tutorName: 'Prof. James Chen'
    }
  ];
};

export const mockGetProgressData = async (): Promise<ProgressData> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  return {
    skillRadarData: [
      { subject: 'Mathematics', value: 85 },
      { subject: 'English', value: 72 },
      { subject: 'Physics', value: 78 },
      { subject: 'Chemistry', value: 81 },
      { subject: 'Biology', value: 69 }
    ],
    progressOverTime: [
      { date: 'Jan', score: 65 },
      { date: 'Feb', score: 70 },
      { date: 'Mar', score: 75 },
      { date: 'Apr', score: 78 },
      { date: 'May', score: 82 }
    ]
  };
};
