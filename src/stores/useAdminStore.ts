
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  clientId: string;
  name: string;
  email?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  clientId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'paypal' | 'bank-transfer' | 'wise' | 'cash';
  lessonsPurchased: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Class {
  id: string;
  studentId: string;
  subject: string;
  duration: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  googleMeetLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClassSession {
  id: string;
  classId: string;
  scheduledDate: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  attendanceConfirmed: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  recipientId: string;
  type: 'email' | 'sms' | 'both';
  content: string;
  status: 'pending' | 'sent' | 'failed';
  createdAt: string;
  sentAt?: string;
}

interface AdminState {
  // Data
  clients: Client[];
  students: Student[];
  payments: Payment[];
  classes: Class[];
  classSessions: ClassSession[];
  notifications: Notification[];
  
  // UI State
  selectedClient: string | null;
  selectedStudent: string | null;
  selectedPayment: string | null;
  selectedClass: string | null;
  
  // Loading States
  isLoading: boolean;
  error: string | null;
  
  // Actions
  actions: {
    // Client Management
    addClient: (client: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateClient: (id: string, updates: Partial<Client>) => void;
    deleteClient: (id: string) => void;
    setSelectedClient: (id: string | null) => void;
    
    // Student Management
    addStudent: (student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateStudent: (id: string, updates: Partial<Student>) => void;
    deleteStudent: (id: string) => void;
    setSelectedStudent: (id: string | null) => void;
    
    // Payment Management
    addPayment: (payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updatePayment: (id: string, updates: Partial<Payment>) => void;
    deletePayment: (id: string) => void;
    setSelectedPayment: (id: string | null) => void;
    
    // Class Management
    addClass: (classData: Omit<Class, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateClass: (id: string, updates: Partial<Class>) => void;
    deleteClass: (id: string) => void;
    setSelectedClass: (id: string | null) => void;
    
    // Session Management
    addSession: (session: Omit<ClassSession, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateSession: (id: string, updates: Partial<ClassSession>) => void;
    markAttendance: (sessionId: string, attended: boolean) => void;
    
    // Notification Management
    sendNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
    
    // Utility
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearAll: () => void;
  };
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      // Initial State
      clients: [],
      students: [],
      payments: [],
      classes: [],
      classSessions: [],
      notifications: [],
      selectedClient: null,
      selectedStudent: null,
      selectedPayment: null,
      selectedClass: null,
      isLoading: false,
      error: null,
      
      actions: {
        // Client Management
        addClient: (clientData) => {
          const client: Client = {
            ...clientData,
            id: crypto.randomUUID(),
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
            clients: state.clients.filter(client => client.id !== id),
            students: state.students.filter(student => student.clientId !== id),
            selectedClient: state.selectedClient === id ? null : state.selectedClient
          }));
        },
        
        setSelectedClient: (id) => set({ selectedClient: id }),
        
        // Student Management
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
            students: state.students.filter(student => student.id !== id),
            classes: state.classes.filter(cls => cls.studentId !== id),
            selectedStudent: state.selectedStudent === id ? null : state.selectedStudent
          }));
        },
        
        setSelectedStudent: (id) => set({ selectedStudent: id }),
        
        // Payment Management
        addPayment: (paymentData) => {
          const payment: Payment = {
            ...paymentData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({
            payments: [...state.payments, payment]
          }));
        },
        
        updatePayment: (id, updates) => {
          set((state) => ({
            payments: state.payments.map(payment =>
              payment.id === id
                ? { ...payment, ...updates, updatedAt: new Date().toISOString() }
                : payment
            )
          }));
        },
        
        deletePayment: (id) => {
          set((state) => ({
            payments: state.payments.filter(payment => payment.id !== id),
            selectedPayment: state.selectedPayment === id ? null : state.selectedPayment
          }));
        },
        
        setSelectedPayment: (id) => set({ selectedPayment: id }),
        
        // Class Management
        addClass: (classData) => {
          const newClass: Class = {
            ...classData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({
            classes: [...state.classes, newClass]
          }));
        },
        
        updateClass: (id, updates) => {
          set((state) => ({
            classes: state.classes.map(cls =>
              cls.id === id
                ? { ...cls, ...updates, updatedAt: new Date().toISOString() }
                : cls
            )
          }));
        },
        
        deleteClass: (id) => {
          set((state) => ({
            classes: state.classes.filter(cls => cls.id !== id),
            classSessions: state.classSessions.filter(session => session.classId !== id),
            selectedClass: state.selectedClass === id ? null : state.selectedClass
          }));
        },
        
        setSelectedClass: (id) => set({ selectedClass: id }),
        
        // Session Management
        addSession: (sessionData) => {
          const session: ClassSession = {
            ...sessionData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({
            classSessions: [...state.classSessions, session]
          }));
        },
        
        updateSession: (id, updates) => {
          set((state) => ({
            classSessions: state.classSessions.map(session =>
              session.id === id
                ? { ...session, ...updates, updatedAt: new Date().toISOString() }
                : session
            )
          }));
        },
        
        markAttendance: (sessionId, attended) => {
          set((state) => ({
            classSessions: state.classSessions.map(session =>
              session.id === sessionId
                ? {
                    ...session,
                    attendanceConfirmed: true,
                    status: attended ? 'completed' : 'cancelled',
                    updatedAt: new Date().toISOString()
                  }
                : session
            )
          }));
        },
        
        // Notification Management
        sendNotification: (notificationData) => {
          const notification: Notification = {
            ...notificationData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            sentAt: new Date().toISOString(),
          };
          set((state) => ({
            notifications: [...state.notifications, notification]
          }));
        },
        
        // Utility
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        clearAll: () => set({
          clients: [],
          students: [],
          payments: [],
          classes: [],
          classSessions: [],
          notifications: [],
          selectedClient: null,
          selectedStudent: null,
          selectedPayment: null,
          selectedClass: null,
        }),
      }
    }),
    {
      name: 'admin-storage',
    }
  )
);
