import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TutorPermissions {
  canManageClients: boolean;
  canManageStudents: boolean;
  canManagePayments: boolean;
  canManageContent: boolean;
  canManageTutors: boolean;
  canSendNotifications: boolean;
  canViewAnalytics: boolean;
}

export interface Tutor {
  id: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  role: 'admin' | 'tutor' | 'content-manager';
  status: 'active' | 'inactive';
  hourlyRate: number;
  bio: string;
  permissions: TutorPermissions;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  students: Student[];
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  subjects: string[];
  lessonsRemaining: number;
  parentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  clientId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  lessonsPurchased: number;
  notes?: string;
  createdAt: string;
}

interface AdminState {
  clients: Client[];
  students: Student[];
  tutors: Tutor[];
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
  
  actions: {
    // Client Management
    addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateClient: (id: string, updates: Partial<Client>) => void;
    deleteClient: (id: string) => void;
    
    // Student Management
    addStudent: (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateStudent: (id: string, updates: Partial<Student>) => void;
    deleteStudent: (id: string) => void;
    
    // Payment Management
    addPayment: (payment: Omit<Payment, 'id' | 'createdAt'>) => void;
    updatePayment: (id: string, updates: Partial<Payment>) => void;
    deletePayment: (id: string) => void;
    
    // Tutor Management
    addTutor: (tutor: Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTutor: (id: string, updates: Partial<Tutor>) => void;
    deleteTutor: (id: string) => void;
    
    // Utility
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearAll: () => void;
  };
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      clients: [],
      students: [],
      tutors: [],
      payments: [],
      isLoading: false,
      error: null,
      
      actions: {
        addClient: (clientData) => {
          const client: Client = {
            ...clientData,
            id: crypto.randomUUID(),
            students: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({
            clients: [...state.clients, client]
          }));
        },
        
        updateClient: (id, updates) => {
          set((state) => ({
            clients: state.clients.map(client =>
              client.id === id
                ? { ...client, ...updates, updatedAt: new Date().toISOString() }
                : client
            )
          }));
        },
        
        deleteClient: (id) => {
          set((state) => ({
            clients: state.clients.filter(client => client.id !== id)
          }));
        },
        
        addStudent: (studentData) => {
          const student: Student = {
            ...studentData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({
            students: [...state.students, student]
          }));
        },
        
        updateStudent: (id, updates) => {
          set((state) => ({
            students: state.students.map(student =>
              student.id === id
                ? { ...student, ...updates, updatedAt: new Date().toISOString() }
                : student
            )
          }));
        },
        
        deleteStudent: (id) => {
          set((state) => ({
            students: state.students.filter(student => student.id !== id)
          }));
        },
        
        addPayment: (paymentData) => {
          const payment: Payment = {
            ...paymentData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          };
          set((state) => ({
            payments: [...state.payments, payment]
          }));
        },
        
        updatePayment: (id, updates) => {
          set((state) => ({
            payments: state.payments.map(payment =>
              payment.id === id
                ? { ...payment, ...updates }
                : payment
            )
          }));
        },
        
        deletePayment: (id) => {
          set((state) => ({
            payments: state.payments.filter(payment => payment.id !== id)
          }));
        },
        
        addTutor: (tutorData) => {
          const tutor: Tutor = {
            ...tutorData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({
            tutors: [...state.tutors, tutor]
          }));
        },
        
        updateTutor: (id, updates) => {
          set((state) => ({
            tutors: state.tutors.map(tutor =>
              tutor.id === id
                ? { ...tutor, ...updates, updatedAt: new Date().toISOString() }
                : tutor
            )
          }));
        },
        
        deleteTutor: (id) => {
          set((state) => ({
            tutors: state.tutors.filter(tutor => tutor.id !== id)
          }));
        },
        
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        clearAll: () => set({
          clients: [],
          students: [],
          tutors: [],
          payments: [],
        }),
      }
    }),
    {
      name: 'admin-storage',
    }
  )
);
