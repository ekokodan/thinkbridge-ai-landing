
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  students: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  name: string;
  email?: string;
  age: number;
  grade: string;
  subjects: string[];
  lessonsRemaining: number;
  parentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tutor {
  id: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  hourlyRate: number;
  availability: string[];
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  currency: string;
  method: 'paypal' | 'bank-transfer' | 'wise' | 'cash';
  status: 'pending' | 'completed' | 'failed';
  date: string;
}

interface AdminState {
  clients: Client[];
  students: Student[];
  tutors: Tutor[];
  payments: Payment[];
  
  actions: {
    addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateClient: (id: string, updates: Partial<Client>) => void;
    deleteClient: (id: string) => void;
    addStudent: (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateStudent: (id: string, updates: Partial<Student>) => void;
    deleteStudent: (id: string) => void;
    addTutor: (tutor: Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTutor: (id: string, updates: Partial<Tutor>) => void;
    deleteTutor: (id: string) => void;
    addPayment: (payment: Omit<Payment, 'id'>) => void;
    updatePayment: (id: string, updates: Partial<Payment>) => void;
    deletePayment: (id: string) => void;
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
      
      actions: {
        addClient: (client) =>
          set((state) => ({
            clients: [
              ...state.clients,
              {
                ...client,
                id: `client_${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          })),
        
        updateClient: (id, updates) =>
          set((state) => ({
            clients: state.clients.map((client) =>
              client.id === id
                ? { ...client, ...updates, updatedAt: new Date().toISOString() }
                : client
            ),
          })),
        
        deleteClient: (id) =>
          set((state) => ({
            clients: state.clients.filter((client) => client.id !== id),
          })),
        
        addStudent: (student) =>
          set((state) => ({
            students: [
              ...state.students,
              {
                ...student,
                id: `student_${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          })),
        
        updateStudent: (id, updates) =>
          set((state) => ({
            students: state.students.map((student) =>
              student.id === id
                ? { ...student, ...updates, updatedAt: new Date().toISOString() }
                : student
            ),
          })),
        
        deleteStudent: (id) =>
          set((state) => ({
            students: state.students.filter((student) => student.id !== id),
          })),
        
        addTutor: (tutor) =>
          set((state) => ({
            tutors: [
              ...state.tutors,
              {
                ...tutor,
                id: `tutor_${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          })),
        
        updateTutor: (id, updates) =>
          set((state) => ({
            tutors: state.tutors.map((tutor) =>
              tutor.id === id
                ? { ...tutor, ...updates, updatedAt: new Date().toISOString() }
                : tutor
            ),
          })),
        
        deleteTutor: (id) =>
          set((state) => ({
            tutors: state.tutors.filter((tutor) => tutor.id !== id),
          })),
        
        addPayment: (payment) =>
          set((state) => ({
            payments: [
              ...state.payments,
              {
                ...payment,
                id: `payment_${Date.now()}`,
              },
            ],
          })),
        
        updatePayment: (id, updates) =>
          set((state) => ({
            payments: state.payments.map((payment) =>
              payment.id === id ? { ...payment, ...updates } : payment
            ),
          })),
        
        deletePayment: (id) =>
          set((state) => ({
            payments: state.payments.filter((payment) => payment.id !== id),
          })),
        
        clearAll: () =>
          set({
            clients: [],
            students: [],
            tutors: [],
            payments: [],
          }),
      },
    }),
    {
      name: 'admin-storage',
    }
  )
);
