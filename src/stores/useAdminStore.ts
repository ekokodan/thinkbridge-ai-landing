import { create } from 'zustand';

export interface AdminState {
  clients: Client[];
  students: Student[];
  tutors: Tutor[];
  classes: Class[];
  classSessions: ClassSession[];
  content: ContentItem[];
  payments: Payment[];
  actions: {
    addClient: (client: Client) => void;
    updateClient: (id: string, updates: Partial<Client>) => void;
    deleteClient: (id: string) => void;
    addStudent: (student: Student) => void;
    updateStudent: (id: string, updates: Partial<Student>) => void;
    deleteStudent: (id: string) => void;
    addTutor: (tutor: Tutor) => void;
    updateTutor: (id: string, updates: Partial<Tutor>) => void;
    deleteTutor: (id: string) => void;
    addClass: (newClass: Class) => void;
    updateClass: (id: string, updates: Partial<Class>) => void;
    deleteClass: (id: string) => void;
    addClassSession: (session: ClassSession) => void;
    updateClassSession: (id: string, updates: Partial<ClassSession>) => void;
    deleteClassSession: (id: string) => void;
    addContent: (item: ContentItem) => void;
    updateContent: (id: string, updates: Partial<ContentItem>) => void;
    deleteContent: (id: string) => void;
    addPayment: (payment: Payment) => void;
    updatePayment: (id: string, updates: Partial<Payment>) => void;
    deletePayment: (id: string) => void;
  };
}

export interface Tutor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subjects: string[];
  students: string[];
  hourlyRate: number;
  availability: string[];
  createdAt: string;
  updatedAt: string;
  status?: 'active' | 'inactive';
  yearsOfExperience?: number;
  qualifications?: string[];
  role?: string;
  bio?: string;
  permissions?: string[];
}

export interface Class {
  id: string;
  name?: string;
  description?: string;
  schedule?: string;
  capacity?: number;
  enrolled?: number;
  studentId?: string;
  subject?: string;
  duration?: number;
  frequency?: string;
  googleMeetLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClassSession {
  id: string;
  classId: string;
  date?: string;
  scheduledDate?: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  attendees?: string[];
  attendanceConfirmed?: boolean;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'document' | 'quiz' | 'assignment' | 'reading' | 'exercise';
  subject: string;
  grade: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  topic?: string;
  difficulty?: string;
  content?: string;
  tags?: string[];
  isPublished?: boolean;
}

export interface WorkAssignment {
  id: string;
  title: string;
  description: string;
  subject?: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded' | 'assigned' | 'in-progress' | 'completed' | 'overdue';
  grade?: number;
  assignedDate?: string;
}

// Update existing interfaces to include missing properties
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  students: string[];
  createdAt: string;
  updatedAt: string;
  status?: 'active' | 'inactive';
  totalLessonsRemaining?: number;
  notes?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface Student {
  id: string;
  name: string;
  email?: string;
  grade: string;
  subjects: string[];
  lessonBalance: number;
  clientId?: string;
  assignedWork?: WorkAssignment[];
  totalLessonsCompleted?: number;
  status?: 'active' | 'inactive';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Payment {
  id: string;
  amount: number;
  method?: string;
  status?: 'pending' | 'completed' | 'failed';
  date?: string;
  studentId?: string;
  currency?: string;
  clientId?: string;
  paymentDate?: string;
  paymentMethod?: 'paypal' | 'bank-transfer' | 'wise' | 'cash';
  lessonsPurchased?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const useAdminStore = create<AdminState>((set) => ({
  clients: [],
  students: [],
  tutors: [],
  classes: [],
  classSessions: [],
  content: [],
  payments: [],
  actions: {
    addClient: (client) => set((state) => ({ clients: [...state.clients, client] })),
    updateClient: (id, updates) =>
      set((state) => ({
        clients: state.clients.map((client) => (client.id === id ? { ...client, ...updates } : client)),
      })),
    deleteClient: (id) => set((state) => ({ clients: state.clients.filter((client) => client.id !== id) })),
    addStudent: (student) => set((state) => ({ students: [...state.students, student] })),
    updateStudent: (id, updates) =>
      set((state) => ({
        students: state.students.map((student) => (student.id === id ? { ...student, ...updates } : student)),
      })),
    deleteStudent: (id) => set((state) => ({ students: state.students.filter((student) => student.id !== id) })),
    addTutor: (tutor) => set((state) => ({ tutors: [...state.tutors, tutor] })),
    updateTutor: (id, updates) =>
      set((state) => ({
        tutors: state.tutors.map((tutor) => (tutor.id === id ? { ...tutor, ...updates } : tutor)),
      })),
    deleteTutor: (id) => set((state) => ({ tutors: state.tutors.filter((tutor) => tutor.id !== id) })),
    addClass: (newClass) => set((state) => ({ classes: [...state.classes, newClass] })),
    updateClass: (id, updates) =>
      set((state) => ({
        classes: state.classes.map((existingClass) => (existingClass.id === id ? { ...existingClass, ...updates } : existingClass)),
      })),
    deleteClass: (id) => set((state) => ({ classes: state.classes.filter((existingClass) => existingClass.id !== id) })),
    addClassSession: (session) => set((state) => ({ classSessions: [...state.classSessions, session] })),
    updateClassSession: (id, updates) =>
      set((state) => ({
        classSessions: state.classSessions.map((session) => (session.id === id ? { ...session, ...updates } : session)),
      })),
    deleteClassSession: (id) => set((state) => ({ classSessions: state.classSessions.filter((session) => session.id !== id) })),
    addContent: (item) => set((state) => ({ content: [...state.content, item] })),
    updateContent: (id, updates) =>
      set((state) => ({
        content: state.content.map((item) => (item.id === id ? { ...item, ...updates } : item)),
      })),
    deleteContent: (id) => set((state) => ({ content: state.content.filter((item) => item.id !== id) })),
    addPayment: (payment) => set((state) => ({ payments: [...state.payments, payment] })),
    updatePayment: (id, updates) =>
      set((state) => ({
        payments: state.payments.map((payment) => (payment.id === id ? { ...payment, ...updates } : payment)),
      })),
    deletePayment: (id) => set((state) => ({ payments: state.payments.filter((payment) => payment.id !== id) })),
  }
}));
