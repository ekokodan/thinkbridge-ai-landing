
import { MasteryLevel } from '@/stores/useProgressStore';

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  totalUnits: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Unit {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  practices: Practice[];
  about: string;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  videoUrl: string;
  transcript: string;
  duration: number; // in minutes
  order: number;
}

export interface Practice {
  id: string;
  unitId: string;
  title: string;
  description: string;
  type: 'quiz' | 'unit-test';
  questions: Question[];
  order: number;
  difficulty: number; // 1-3
}

export interface Question {
  id: string;
  practiceId: string;
  text: string;
  type: 'multiple-choice' | 'short-answer';
  options?: string[];
  correctAnswer: string | string[];
  hint?: string;
  explanation?: string;
}

// Mock data
const courses: Course[] = [
  {
    id: 'algebra-1',
    title: 'Algebra Fundamentals',
    description: 'Learn the basics of algebra, equations, and functions',
    imageUrl: '/placeholder.svg',
    totalUnits: 4,
    difficulty: 'beginner'
  },
  {
    id: 'calculus-1',
    title: 'Introduction to Calculus',
    description: 'Explore limits, derivatives, and integrals',
    imageUrl: '/placeholder.svg',
    totalUnits: 5,
    difficulty: 'intermediate'
  },
  {
    id: 'statistics-1',
    title: 'Statistics Essentials',
    description: 'Master data analysis and statistical methods',
    imageUrl: '/placeholder.svg',
    totalUnits: 3,
    difficulty: 'intermediate'
  }
];

const units: Unit[] = [
  {
    id: 'algebra-unit-1',
    courseId: 'algebra-1',
    title: 'Unit 1 - Polynomial Arithmetic',
    description: 'Learn how to add, subtract, multiply, and divide polynomials',
    order: 1,
    lessons: [],
    practices: [],
    about: `
# Polynomial Arithmetic

In this unit, you'll learn how to:
- Add and subtract polynomials
- Multiply polynomials using various methods
- Divide polynomials using long division
- Factor polynomials to simplify expressions

These skills are essential for solving equations and understanding more advanced topics in algebra.
    `
  },
  {
    id: 'algebra-unit-2',
    courseId: 'algebra-1',
    title: 'Unit 2 - Solving Linear Equations',
    description: 'Learn how to solve various types of linear equations',
    order: 2,
    lessons: [],
    practices: [],
    about: `
# Solving Linear Equations

In this unit, you'll learn how to:
- Solve basic linear equations
- Work with variables on both sides
- Solve problems with fractions and decimals
- Apply these skills to word problems

Linear equations are the foundation of algebra and essential for many applications.
    `
  },
  {
    id: 'calculus-unit-1',
    courseId: 'calculus-1',
    title: 'Unit 1 - Limits',
    description: 'Understanding the concept of limits in calculus',
    order: 1,
    lessons: [],
    practices: [],
    about: `
# Limits

In this unit, you'll learn:
- The definition of a limit
- How to evaluate limits algebraically
- Limits involving infinity
- Continuity and differentiability

Limits are the fundamental building block of calculus.
    `
  }
];

// Generate lessons for each unit
const lessons: Lesson[] = [
  // Algebra Unit 1 Lessons
  {
    id: 'algebra-unit-1-lesson-1',
    unitId: 'algebra-unit-1',
    title: 'Adding and Subtracting Polynomials',
    description: 'Learn the basics of polynomial addition and subtraction',
    videoUrl: 'https://www.youtube.com/watch?v=XDgL10cUgl0',
    transcript: 'In this lesson, we will explore how to add and subtract polynomials...',
    duration: 12,
    order: 1
  },
  {
    id: 'algebra-unit-1-lesson-2',
    unitId: 'algebra-unit-1',
    title: 'Multiplying Polynomials',
    description: 'Master techniques for multiplying polynomials',
    videoUrl: 'https://www.youtube.com/watch?v=L0X8xrfQdzA',
    transcript: 'In this lesson, we will learn different methods for multiplying polynomials...',
    duration: 15,
    order: 2
  },
  {
    id: 'algebra-unit-1-lesson-3',
    unitId: 'algebra-unit-1',
    title: 'Dividing Polynomials',
    description: 'Long division and synthetic division methods',
    videoUrl: 'https://www.youtube.com/watch?v=HHhMOYdYlAk',
    transcript: 'In this lesson, we will cover polynomial long division and synthetic division...',
    duration: 18,
    order: 3
  },
  
  // Algebra Unit 2 Lessons
  {
    id: 'algebra-unit-2-lesson-1',
    unitId: 'algebra-unit-2',
    title: 'Basic Linear Equations',
    description: 'Solving simple linear equations',
    videoUrl: 'https://www.youtube.com/watch?v=bAerID24QJ0',
    transcript: 'In this lesson, we will start with basic linear equations...',
    duration: 10,
    order: 1
  },
  
  // Calculus Unit 1 Lessons
  {
    id: 'calculus-unit-1-lesson-1',
    unitId: 'calculus-unit-1',
    title: 'Introduction to Limits',
    description: 'Understanding the concept of a limit',
    videoUrl: 'https://www.youtube.com/watch?v=riXcZT2ICjA',
    transcript: 'In this lesson, we will introduce the concept of limits in calculus...',
    duration: 14,
    order: 1
  }
];

// Generate practice quizzes for each unit
const practices: Practice[] = [
  // Algebra Unit 1 Practices
  {
    id: 'algebra-unit-1-practice-1',
    unitId: 'algebra-unit-1',
    title: 'Polynomial Addition and Subtraction Quiz',
    description: 'Test your knowledge of adding and subtracting polynomials',
    type: 'quiz',
    questions: [
      {
        id: 'q1',
        practiceId: 'algebra-unit-1-practice-1',
        text: 'Simplify the expression: (3x² + 5x - 2) + (4x² - 3x + 5)',
        type: 'multiple-choice',
        options: [
          '7x² + 2x + 3',
          '7x² + 8x + 3',
          '7x² + 2x - 7',
          '7x² - 2x + 3'
        ],
        correctAnswer: '7x² + 2x + 3',
        hint: 'Combine like terms by adding the coefficients of matching powers of x'
      },
      {
        id: 'q2',
        practiceId: 'algebra-unit-1-practice-1',
        text: 'Simplify the expression: (8x³ - 4x² + 7x) - (3x³ + 2x² - 5x + 9)',
        type: 'multiple-choice',
        options: [
          '5x³ - 6x² + 12x - 9',
          '5x³ - 2x² + 12x - 9',
          '5x³ - 6x² + 2x - 9',
          '11x³ - 6x² + 2x + 9'
        ],
        correctAnswer: '5x³ - 6x² + 12x - 9',
        hint: 'Remember to distribute the subtraction to each term in the second polynomial'
      }
    ],
    order: 1,
    difficulty: 1
  },
  {
    id: 'algebra-unit-1-practice-2',
    unitId: 'algebra-unit-1',
    title: 'Polynomial Multiplication',
    description: 'Practice multiplying polynomials',
    type: 'quiz',
    questions: [
      {
        id: 'q1',
        practiceId: 'algebra-unit-1-practice-2',
        text: 'Find the product: (x + 3)(x - 5)',
        type: 'multiple-choice',
        options: [
          'x² - 2x - 15',
          'x² - 5x + 3x - 15',
          'x² - 2x + 15',
          'x² + 2x - 15'
        ],
        correctAnswer: 'x² - 2x - 15',
        hint: 'Use FOIL method: First, Outer, Inner, Last'
      }
    ],
    order: 2,
    difficulty: 2
  },
  
  // Algebra Unit 1 Unit Test
  {
    id: 'algebra-unit-1-test',
    unitId: 'algebra-unit-1',
    title: 'Unit 1 Test: Polynomial Arithmetic',
    description: 'Comprehensive test covering all topics in this unit',
    type: 'unit-test',
    questions: [
      {
        id: 'q1',
        practiceId: 'algebra-unit-1-test',
        text: 'Simplify: (2x³ + 5x² - 3x + 1) + (4x³ - 2x² + 7x - 8)',
        type: 'multiple-choice',
        options: [
          '6x³ + 3x² + 4x - 7',
          '6x³ + 7x² + 4x - 7',
          '6x³ + 3x² - 4x - 7',
          '6x³ + 3x² + 4x - 9'
        ],
        correctAnswer: '6x³ + 3x² + 4x - 7',
        hint: 'Combine like terms'
      },
      {
        id: 'q2',
        practiceId: 'algebra-unit-1-test',
        text: 'Find the product: (2x + 5)(3x - 4)',
        type: 'short-answer',
        correctAnswer: '6x² - 8x + 15x - 20',
        hint: 'Use the distributive property'
      }
    ],
    order: 3,
    difficulty: 3
  }
];

// Connect lessons and practices to units
units.forEach(unit => {
  unit.lessons = lessons.filter(lesson => lesson.unitId === unit.id);
  unit.practices = practices.filter(practice => practice.unitId === unit.id);
});

// API functions with simulated network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchCourses(): Promise<Course[]> {
  await delay(800);
  return [...courses];
}

export async function fetchCourse(courseId: string): Promise<Course | undefined> {
  await delay(600);
  return courses.find(c => c.id === courseId);
}

export async function fetchUnitsForCourse(courseId: string): Promise<Unit[]> {
  await delay(700);
  return units.filter(unit => unit.courseId === courseId)
              .sort((a, b) => a.order - b.order);
}

export async function fetchUnit(unitId: string): Promise<Unit | undefined> {
  await delay(500);
  const unit = units.find(u => u.id === unitId);
  if (unit) {
    unit.lessons = lessons.filter(lesson => lesson.unitId === unitId)
                          .sort((a, b) => a.order - b.order);
    unit.practices = practices.filter(practice => practice.unitId === unitId)
                             .sort((a, b) => a.order - b.order);
  }
  return unit;
}

export async function fetchLesson(lessonId: string): Promise<Lesson | undefined> {
  await delay(400);
  return lessons.find(lesson => lesson.id === lessonId);
}

export async function fetchPractice(practiceId: string): Promise<Practice | undefined> {
  await delay(400);
  return practices.find(practice => practice.id === practiceId);
}
