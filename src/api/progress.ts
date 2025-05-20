
import { MasteryLevel } from '@/stores/useProgressStore';

export interface ProgressStats {
  mastered: number;
  proficient: number;
  familiar: number;
  attempted: number;
  notStarted: number;
  quizzes: number;
  unitTests: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  condition: string; // Description of how to earn it
  xpThreshold: number;
}

// Mock badges
const badges: Badge[] = [
  {
    id: 'algebra-novice',
    name: 'Algebra Novice',
    description: 'Completed your first algebra lesson',
    imageUrl: '/placeholder.svg',
    condition: 'Complete 1 algebra lesson',
    xpThreshold: 10
  },
  {
    id: 'algebra-enthusiast',
    name: 'Algebra Enthusiast',
    description: 'Completed 5 algebra lessons',
    imageUrl: '/placeholder.svg',
    condition: 'Complete 5 algebra lessons',
    xpThreshold: 50
  },
  {
    id: 'quiz-master',
    name: 'Quiz Master',
    description: 'Achieved "Mastered" on 3 quizzes',
    imageUrl: '/placeholder.svg',
    condition: 'Achieve "Mastered" status on 3 quizzes',
    xpThreshold: 100
  }
];

// Mock progress stats
export async function fetchProgressStats(courseId: string): Promise<ProgressStats> {
  // In a real app, this would be calculated from the user's actual progress
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    mastered: Math.floor(Math.random() * 5),
    proficient: Math.floor(Math.random() * 8),
    familiar: Math.floor(Math.random() * 10),
    attempted: Math.floor(Math.random() * 6),
    notStarted: Math.floor(Math.random() * 15),
    quizzes: Math.floor(Math.random() * 10),
    unitTests: Math.floor(Math.random() * 3)
  };
}

export async function fetchAvailableBadges(): Promise<Badge[]> {
  await new Promise(resolve => setTimeout(resolve, 600));
  return badges;
}

export async function checkEligibleBadges(xp: number, progress: any): Promise<string[]> {
  // This would normally check the user's progress against badge requirements
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return badges
    .filter(badge => badge.xpThreshold <= xp)
    .map(badge => badge.id);
}
