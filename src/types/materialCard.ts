
export interface MaterialCard {
  id: string;
  title: string;
  moduleId: string;
  moduleTitle: string;
  stepNumber: number;
  totalSteps: number;
  body: CardBlock[];
  examples: Example[];
  practice?: PracticeQuestion;
  prerequisites: string[];
  estimatedTime: number;
}

export interface CardBlock {
  id: string;
  type: 'markdown' | 'image' | 'video' | 'interactive' | 'code';
  content: any;
}

export interface MarkdownBlock extends CardBlock {
  type: 'markdown';
  content: {
    markdown: string;
  };
}

export interface ImageBlock extends CardBlock {
  type: 'image';
  content: {
    src: string;
    alt: string;
    caption?: string;
  };
}

export interface VideoBlock extends CardBlock {
  type: 'video';
  content: {
    src: string;
    thumbnail: string;
    title: string;
  };
}

export interface InteractiveBlock extends CardBlock {
  type: 'interactive';
  content: {
    iframeSrc: string;
    height: number;
  };
}

export interface CodeBlock extends CardBlock {
  type: 'code';
  content: {
    code: string;
    language: string;
  };
}

export interface Example {
  id: string;
  problem: string;
  steps: string[];
  answer: string;
}

export interface PracticeQuestion {
  id: string;
  type: 'multiple-choice' | 'numeric' | 'expression';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  hint?: string;
}

export interface UserProgress {
  accuracyPct: number;
  attempts: number;
  masteryStatus: 'idle' | 'active' | 'mastered' | 'locked';
  hintsUsed: number;
}

export interface MaterialComponentProps {
  card: MaterialCard;
  userProgress: UserProgress;
  onAnswerSubmitted: (payload: { answer: string; isCorrect: boolean }) => void;
  onCardComplete: (masteryStatus: string) => void;
  onNavigate: (direction: 'prev' | 'next' | 'recommended') => void;
}
