
export interface ContentItem {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'practice' | 'video' | 'reading';
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  duration: number; // in minutes
  thumbnail: string;
  tags: string[];
  isFavourite?: boolean;
}

export const mockGetContentItems = async (filters?: {
  subjects?: string[];
  difficulty?: string;
  search?: string;
  page?: number;
}): Promise<{ items: ContentItem[]; hasNextPage: boolean }> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const allItems: ContentItem[] = [
    {
      id: '1',
      title: 'Introduction to Quadratic Equations',
      type: 'lesson',
      subject: 'Mathematics',
      difficulty: 'intermediate',
      description: 'Learn the fundamentals of quadratic equations and how to solve them using various methods.',
      duration: 45,
      thumbnail: '/placeholder.svg',
      tags: ['algebra', 'equations', 'fundamentals']
    },
    {
      id: '2',
      title: 'Chemical Bonding Quiz',
      type: 'quiz',
      subject: 'Chemistry',
      difficulty: 'intermediate',
      description: 'Test your understanding of ionic and covalent bonding concepts.',
      duration: 20,
      thumbnail: '/placeholder.svg',
      tags: ['bonding', 'chemistry', 'quiz']
    },
    {
      id: '3',
      title: 'Shakespeare\'s Hamlet Analysis',
      type: 'reading',
      subject: 'English',
      difficulty: 'advanced',
      description: 'Deep dive into the themes and characters of Shakespeare\'s Hamlet.',
      duration: 60,
      thumbnail: '/placeholder.svg',
      tags: ['shakespeare', 'literature', 'analysis']
    },
    {
      id: '4',
      title: 'World War II Documentary',
      type: 'video',
      subject: 'History',
      difficulty: 'beginner',
      description: 'Comprehensive overview of World War II events and their impact.',
      duration: 90,
      thumbnail: '/placeholder.svg',
      tags: ['wwii', 'history', 'documentary']
    },
    {
      id: '5',
      title: 'Physics Practice Problems',
      type: 'practice',
      subject: 'Physics',
      difficulty: 'intermediate',
      description: 'Practice problems covering motion, forces, and energy concepts.',
      duration: 30,
      thumbnail: '/placeholder.svg',
      tags: ['physics', 'practice', 'mechanics']
    }
  ];
  
  let filteredItems = allItems;
  
  if (filters?.subjects?.length) {
    filteredItems = filteredItems.filter(item => 
      filters.subjects!.includes(item.subject)
    );
  }
  
  if (filters?.difficulty) {
    filteredItems = filteredItems.filter(item => 
      item.difficulty === filters.difficulty
    );
  }
  
  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filteredItems = filteredItems.filter(item =>
      item.title.toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search) ||
      item.tags.some(tag => tag.toLowerCase().includes(search))
    );
  }
  
  const page = filters?.page || 0;
  const pageSize = 6;
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;
  
  return {
    items: filteredItems.slice(startIndex, endIndex),
    hasNextPage: endIndex < filteredItems.length
  };
};

export const mockToggleFavourite = async (contentId: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  // In real app, this would update the favourite status on the server
};
