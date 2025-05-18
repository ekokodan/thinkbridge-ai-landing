
export interface ContentItem {
  id: string;
  title: string;
  subject: string;
  topics: string[];
  type: 'Video' | 'Document' | 'Practice' | 'Interactive';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  language: 'English' | 'Spanish' | 'French' | 'Mandarin' | 'German';
  duration: number; // in minutes
  thumbnail?: string;
  description: string;
  content: string; // could be URL or markdown text
  dateCreated: string;
  views: number;
  rating: number;
  bookmarked?: boolean;
  completed?: boolean;
}

export interface ContentFilters {
  subject?: string;
  topics?: string[];
  type?: string[];
  difficulty?: string[];
  language?: string[];
  search?: string;
}

export const fetchContentItems = async (filters?: ContentFilters): Promise<ContentItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Start with all items
  let items = [
    {
      id: "c1",
      title: "Introduction to Calculus",
      subject: "Math",
      topics: ["Calculus", "Limits", "Derivatives"],
      type: "Video",
      difficulty: "Intermediate",
      language: "English",
      duration: 45,
      thumbnail: "https://placehold.co/600x400/indigo/white?text=Calculus",
      description: "A comprehensive introduction to calculus concepts including limits, derivatives, and basic integration.",
      content: "https://example.com/videos/intro-calculus",
      dateCreated: "2025-01-15",
      views: 3245,
      rating: 4.7
    },
    {
      id: "c2",
      title: "Cell Biology Fundamentals",
      subject: "Biology",
      topics: ["Cell Structure", "Organelles", "Cell Function"],
      type: "Document",
      difficulty: "Beginner",
      language: "English",
      duration: 30,
      thumbnail: "https://placehold.co/600x400/green/white?text=Biology",
      description: "Learn about cell structure, organelles, and basic cell functions.",
      content: "# Cell Biology Fundamentals\n\nCells are the basic building blocks of all living organisms...",
      dateCreated: "2024-12-10",
      views: 2156,
      rating: 4.5
    },
    {
      id: "c3",
      title: "Physics: Forces and Motion",
      subject: "Physics",
      topics: ["Newton's Laws", "Forces", "Motion"],
      type: "Interactive",
      difficulty: "Intermediate",
      language: "English",
      duration: 60,
      thumbnail: "https://placehold.co/600x400/blue/white?text=Physics",
      description: "Interactive simulation exploring Newton's laws of motion with real-time feedback.",
      content: "https://example.com/interactive/forces-motion",
      dateCreated: "2025-02-20",
      views: 1876,
      rating: 4.8
    },
    {
      id: "c4",
      title: "Spanish Verb Conjugation",
      subject: "Spanish",
      topics: ["Verbs", "Conjugation", "Tenses"],
      type: "Practice",
      difficulty: "Beginner",
      language: "Spanish",
      duration: 25,
      thumbnail: "https://placehold.co/600x400/red/white?text=Spanish",
      description: "Practice exercises for conjugating Spanish verbs in present, past, and future tenses.",
      content: "https://example.com/practice/spanish-verbs",
      dateCreated: "2025-03-05",
      views: 945,
      rating: 4.3
    },
    {
      id: "c5",
      title: "Advanced Python Programming",
      subject: "Computer Science",
      topics: ["Python", "OOP", "Data Structures"],
      type: "Document",
      difficulty: "Advanced",
      language: "English",
      duration: 90,
      thumbnail: "https://placehold.co/600x400/yellow/black?text=Python",
      description: "Advanced techniques in Python including object-oriented design patterns and efficient algorithms.",
      content: "# Advanced Python Programming\n\n## Object-Oriented Design Patterns\n\nIn this section, we'll explore...",
      dateCreated: "2025-01-30",
      views: 2783,
      rating: 4.9
    },
    {
      id: "c6",
      title: "Chemical Reactions and Equations",
      subject: "Chemistry",
      topics: ["Chemical Equations", "Balancing", "Reaction Types"],
      type: "Video",
      difficulty: "Intermediate",
      language: "English",
      duration: 55,
      thumbnail: "https://placehold.co/600x400/purple/white?text=Chemistry",
      description: "Learn how to balance chemical equations and identify different reaction types.",
      content: "https://example.com/videos/chemical-reactions",
      dateCreated: "2025-02-12",
      views: 1654,
      rating: 4.6
    },
    {
      id: "c7",
      title: "World War II: Major Events",
      subject: "History",
      topics: ["World War II", "20th Century", "Global Conflict"],
      type: "Document",
      difficulty: "Intermediate",
      language: "English",
      duration: 70,
      thumbnail: "https://placehold.co/600x400/brown/white?text=History",
      description: "A comprehensive overview of the major events and turning points of World War II.",
      content: "# World War II: Major Events\n\n## The Beginning\n\nWorld War II began on September 1, 1939...",
      dateCreated: "2024-11-22",
      views: 3128,
      rating: 4.7
    },
    {
      id: "c8",
      title: "Essay Writing Techniques",
      subject: "English",
      topics: ["Writing", "Essays", "Composition"],
      type: "Interactive",
      difficulty: "Beginner",
      language: "English",
      duration: 40,
      thumbnail: "https://placehold.co/600x400/teal/white?text=English",
      description: "Interactive guide to effective essay writing with examples and feedback.",
      content: "https://example.com/interactive/essay-writing",
      dateCreated: "2025-03-10",
      views: 1345,
      rating: 4.4
    }
  ] as ContentItem[];
  
  // Apply filters if provided
  if (filters) {
    if (filters.subject) {
      items = items.filter(item => item.subject === filters.subject);
    }
    
    if (filters.topics && filters.topics.length > 0) {
      items = items.filter(item => 
        filters.topics?.some(topic => item.topics.includes(topic))
      );
    }
    
    if (filters.type && filters.type.length > 0) {
      items = items.filter(item => 
        filters.type?.includes(item.type as string)
      );
    }
    
    if (filters.difficulty && filters.difficulty.length > 0) {
      items = items.filter(item => 
        filters.difficulty?.includes(item.difficulty as string)
      );
    }
    
    if (filters.language && filters.language.length > 0) {
      items = items.filter(item => 
        filters.language?.includes(item.language as string)
      );
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      items = items.filter(item => 
        item.title.toLowerCase().includes(searchLower) || 
        item.description.toLowerCase().includes(searchLower) ||
        item.topics.some(topic => topic.toLowerCase().includes(searchLower))
      );
    }
  }
  
  return items;
};

export const fetchSubjects = async (): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return [
    "Math",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "English",
    "History",
    "Spanish",
    "French",
    "Geography",
    "Economics"
  ];
};

export const fetchTopics = async (subject?: string): Promise<string[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allTopics: Record<string, string[]> = {
    "Math": ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry", "Linear Algebra", "Probability"],
    "Physics": ["Mechanics", "Electricity", "Magnetism", "Optics", "Thermodynamics", "Quantum Physics", "Newton's Laws", "Forces", "Motion"],
    "Chemistry": ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Biochemistry", "Chemical Equations", "Balancing", "Reaction Types"],
    "Biology": ["Cell Biology", "Genetics", "Evolution", "Ecology", "Cell Structure", "Organelles", "Cell Function"],
    "Computer Science": ["Programming", "Algorithms", "Data Structures", "Web Development", "Python", "OOP"],
    "English": ["Literature", "Grammar", "Writing", "Essays", "Composition"],
    "History": ["Ancient History", "Medieval History", "Modern History", "World War I", "World War II", "20th Century", "Global Conflict"],
    "Spanish": ["Vocabulary", "Grammar", "Conversation", "Verbs", "Conjugation", "Tenses"],
    "French": ["Vocabulary", "Grammar", "Conversation", "Pronunciation"],
    "Geography": ["Physical Geography", "Human Geography", "Cartography", "GIS"],
    "Economics": ["Microeconomics", "Macroeconomics", "International Trade", "Finance"]
  };
  
  if (subject && allTopics[subject]) {
    return allTopics[subject];
  }
  
  // Return all topics if no subject is specified
  return Object.values(allTopics).flat();
};
