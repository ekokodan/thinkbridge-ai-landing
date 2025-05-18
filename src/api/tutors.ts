
export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subjects: string[];
  plan: string;
  nextLesson?: string;
  progress: number;
  notes?: string;
  tasks?: { id: string; title: string; completed: boolean }[];
}

export interface Lesson {
  id: string;
  title: string;
  studentId: string;
  studentName: string;
  date: string;
  startTime: string;
  endTime: string;
  subject: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export interface DashboardStats {
  hoursTaught: number;
  averageScoreUplift: number;
  activeStudents: number;
  activeCourses: number;
  weeklyLessons: { day: string; count: number }[];
  monthlyProgress: { month: string; value: number }[];
  studentSubjectDistribution: { subject: string; count: number }[];
}

export const fetchStudents = async (): Promise<Student[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: "s1",
      name: "Alex Johnson",
      email: "alex.j@example.com",
      avatar: "https://i.pravatar.cc/150?u=alex",
      subjects: ["Math", "Physics"],
      plan: "Tutor Plus",
      nextLesson: "2025-05-20T14:00:00",
      progress: 78,
      notes: "Preparing for AP Calculus exam in June.",
      tasks: [
        { id: "t1", title: "Review differentiation rules", completed: true },
        { id: "t2", title: "Complete practice test #3", completed: false }
      ]
    },
    {
      id: "s2",
      name: "Sophia Williams",
      email: "sophia.w@example.com",
      avatar: "https://i.pravatar.cc/150?u=sophia",
      subjects: ["Chemistry", "Biology"],
      plan: "Tutor Lite",
      nextLesson: "2025-05-19T16:30:00",
      progress: 65,
      notes: "Struggling with organic chemistry concepts.",
      tasks: [
        { id: "t3", title: "Memorize periodic table groups", completed: true },
        { id: "t4", title: "Complete lab worksheet", completed: false }
      ]
    },
    {
      id: "s3",
      name: "Michael Brown",
      email: "michael.b@example.com",
      avatar: "https://i.pravatar.cc/150?u=michael",
      subjects: ["English", "History"],
      plan: "Tutor Plus",
      nextLesson: "2025-05-21T10:00:00",
      progress: 92,
      notes: "Excellent progress on essay structure.",
      tasks: [
        { id: "t5", title: "Research paper outline", completed: true },
        { id: "t6", title: "Practice AP history questions", completed: true }
      ]
    },
    {
      id: "s4",
      name: "Emma Davis",
      email: "emma.d@example.com",
      avatar: "https://i.pravatar.cc/150?u=emma",
      subjects: ["Spanish", "French"],
      plan: "AI Basic",
      progress: 45,
      notes: "Needs more conversation practice.",
      tasks: [
        { id: "t7", title: "Complete verb conjugation exercises", completed: false },
        { id: "t8", title: "Practice dialogue with AI tutor", completed: true }
      ]
    },
    {
      id: "s5",
      name: "William Taylor",
      email: "william.t@example.com",
      avatar: "https://i.pravatar.cc/150?u=william",
      subjects: ["Computer Science", "Math"],
      plan: "Tutor Lite",
      nextLesson: "2025-05-22T15:00:00",
      progress: 88,
      notes: "Excellent progress with Python programming.",
      tasks: [
        { id: "t9", title: "Complete coding challenge #5", completed: true },
        { id: "t10", title: "Review algorithms section", completed: false }
      ]
    },
    {
      id: "s6",
      name: "Olivia Miller",
      email: "olivia.m@example.com",
      avatar: "https://i.pravatar.cc/150?u=olivia",
      subjects: ["Physics", "Chemistry"],
      plan: "Tutor Plus",
      nextLesson: "2025-05-23T13:30:00",
      progress: 72,
      notes: "Working on advanced problems for science competition.",
      tasks: [
        { id: "t11", title: "Physics problem set #3", completed: false },
        { id: "t12", title: "Review quantum mechanics notes", completed: false }
      ]
    }
  ];
};

export const fetchLessons = async (): Promise<Lesson[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: "l1",
      title: "Calculus - Integration Techniques",
      studentId: "s1",
      studentName: "Alex Johnson",
      date: "2025-05-20",
      startTime: "14:00",
      endTime: "15:00",
      subject: "Math",
      status: "upcoming",
      notes: "Focus on u-substitution and integration by parts."
    },
    {
      id: "l2",
      title: "Organic Chemistry Review",
      studentId: "s2",
      studentName: "Sophia Williams",
      date: "2025-05-19",
      startTime: "16:30",
      endTime: "17:30",
      subject: "Chemistry",
      status: "upcoming",
      notes: "Review naming conventions and reaction mechanisms."
    },
    {
      id: "l3",
      title: "Essay Writing Workshop",
      studentId: "s3",
      studentName: "Michael Brown",
      date: "2025-05-21",
      startTime: "10:00",
      endTime: "11:00",
      subject: "English",
      status: "upcoming",
      notes: "Focus on thesis development and supporting arguments."
    },
    {
      id: "l4",
      title: "AP World History Prep",
      studentId: "s3",
      studentName: "Michael Brown",
      date: "2025-05-18",
      startTime: "11:00",
      endTime: "12:00",
      subject: "History",
      status: "completed",
      notes: "Reviewed key events of Industrial Revolution."
    },
    {
      id: "l5",
      title: "Python Programming",
      studentId: "s5",
      studentName: "William Taylor",
      date: "2025-05-22",
      startTime: "15:00",
      endTime: "16:00",
      subject: "Computer Science",
      status: "upcoming",
      notes: "Introduction to data structures and algorithms."
    },
    {
      id: "l6",
      title: "Advanced Physics Problems",
      studentId: "s6",
      studentName: "Olivia Miller",
      date: "2025-05-17",
      startTime: "13:00",
      endTime: "14:00",
      subject: "Physics",
      status: "completed",
      notes: "Covered thermodynamics problems and solutions."
    },
    {
      id: "l7",
      title: "Physics Olympiad Prep",
      studentId: "s6",
      studentName: "Olivia Miller",
      date: "2025-05-23",
      startTime: "13:30",
      endTime: "14:30",
      subject: "Physics",
      status: "upcoming",
      notes: "Practice with competition-level mechanics problems."
    }
  ];
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return {
    hoursTaught: 142,
    averageScoreUplift: 23.4,
    activeStudents: 6,
    activeCourses: 4,
    weeklyLessons: [
      { day: "Mon", count: 3 },
      { day: "Tue", count: 5 },
      { day: "Wed", count: 2 },
      { day: "Thu", count: 4 },
      { day: "Fri", count: 3 },
      { day: "Sat", count: 1 },
      { day: "Sun", count: 0 }
    ],
    monthlyProgress: [
      { month: "Jan", value: 65 },
      { month: "Feb", value: 68 },
      { month: "Mar", value: 73 },
      { month: "Apr", value: 78 },
      { month: "May", value: 82 }
    ],
    studentSubjectDistribution: [
      { subject: "Math", count: 2 },
      { subject: "Physics", count: 2 },
      { subject: "Chemistry", count: 2 },
      { subject: "Biology", count: 1 },
      { subject: "English", count: 1 },
      { subject: "History", count: 1 },
      { subject: "Computer Science", count: 1 },
      { subject: "Spanish", count: 1 },
      { subject: "French", count: 1 }
    ]
  };
};
