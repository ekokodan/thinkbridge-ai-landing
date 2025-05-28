
import { Client, Student, Payment, Class, ClassSession, Notification } from '@/stores/useAdminStore';

// Mock data generators
export const generateMockClients = (): Client[] => [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2', 
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    phone: '+1 (555) 987-6543',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@email.com', 
    phone: '+1 (555) 456-7890',
    createdAt: '2024-02-01T09:15:00Z',
    updatedAt: '2024-02-01T09:15:00Z',
  }
];

export const generateMockStudents = (): Student[] => [
  {
    id: '1',
    clientId: '1',
    name: 'Emma Johnson',
    email: 'emma.johnson@email.com',
    notes: 'Excellent in math, needs help with algebra',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    clientId: '1', 
    name: 'Lucas Johnson',
    notes: 'Beginner level, very motivated',
    createdAt: '2024-01-15T10:35:00Z',
    updatedAt: '2024-01-15T10:35:00Z',
  },
  {
    id: '3',
    clientId: '2',
    name: 'Alex Chen',
    email: 'alex.chen@email.com',
    notes: 'Advanced student, preparing for AP exams',
    createdAt: '2024-01-20T15:00:00Z',
    updatedAt: '2024-01-20T15:00:00Z',
  },
  {
    id: '4',
    clientId: '3',
    name: 'Sofia Rodriguez',
    notes: 'Needs confidence building in science',
    createdAt: '2024-02-01T09:45:00Z',
    updatedAt: '2024-02-01T09:45:00Z',
  }
];

export const generateMockPayments = (): Payment[] => [
  {
    id: '1',
    clientId: '1',
    amount: 320,
    paymentDate: '2024-01-15T00:00:00Z',
    paymentMethod: 'paypal',
    lessonsPurchased: 8,
    notes: 'Monthly package for Emma',
    createdAt: '2024-01-15T11:00:00Z',
    updatedAt: '2024-01-15T11:00:00Z',
  },
  {
    id: '2',
    clientId: '2',
    amount: 240,
    paymentDate: '2024-01-22T00:00:00Z',
    paymentMethod: 'bank-transfer',
    lessonsPurchased: 6,
    notes: 'Bi-weekly sessions for Alex',
    createdAt: '2024-01-22T16:00:00Z',
    updatedAt: '2024-01-22T16:00:00Z',
  },
  {
    id: '3',
    clientId: '3',
    amount: 160,
    paymentDate: '2024-02-01T00:00:00Z',
    paymentMethod: 'wise',
    lessonsPurchased: 4,
    notes: 'Trial package for Sofia',
    createdAt: '2024-02-01T10:00:00Z',
    updatedAt: '2024-02-01T10:00:00Z',
  }
];

export const generateMockClasses = (): Class[] => [
  {
    id: '1',
    studentId: '1',
    subject: 'Algebra',
    duration: 60,
    frequency: 'weekly',
    googleMeetLink: 'https://meet.google.com/abc-def-ghi',
    createdAt: '2024-01-15T12:00:00Z',
    updatedAt: '2024-01-15T12:00:00Z',
  },
  {
    id: '2',
    studentId: '2',
    subject: 'Basic Math',
    duration: 45,
    frequency: 'weekly',
    googleMeetLink: 'https://meet.google.com/jkl-mno-pqr',
    createdAt: '2024-01-15T12:30:00Z',
    updatedAt: '2024-01-15T12:30:00Z',
  },
  {
    id: '3',
    studentId: '3',
    subject: 'AP Calculus',
    duration: 90,
    frequency: 'biweekly',
    googleMeetLink: 'https://meet.google.com/stu-vwx-yz1',
    createdAt: '2024-01-20T16:00:00Z',
    updatedAt: '2024-01-20T16:00:00Z',
  },
  {
    id: '4',
    studentId: '4',
    subject: 'Chemistry',
    duration: 60,
    frequency: 'weekly',
    googleMeetLink: 'https://meet.google.com/234-567-890',
    createdAt: '2024-02-01T11:00:00Z',
    updatedAt: '2024-02-01T11:00:00Z',
  }
];

export const generateMockClassSessions = (): ClassSession[] => [
  {
    id: '1',
    classId: '1',
    scheduledDate: '2024-05-29T00:00:00Z',
    startTime: '15:00',
    endTime: '16:00',
    status: 'scheduled',
    attendanceConfirmed: false,
    createdAt: '2024-05-27T10:00:00Z',
    updatedAt: '2024-05-27T10:00:00Z',
  },
  {
    id: '2',
    classId: '2',
    scheduledDate: '2024-05-29T00:00:00Z',
    startTime: '16:30',
    endTime: '17:15',
    status: 'scheduled',
    attendanceConfirmed: false,
    createdAt: '2024-05-27T10:15:00Z',
    updatedAt: '2024-05-27T10:15:00Z',
  },
  {
    id: '3',
    classId: '3',
    scheduledDate: '2024-05-30T00:00:00Z',
    startTime: '14:00',
    endTime: '15:30',
    status: 'scheduled',
    attendanceConfirmed: false,
    createdAt: '2024-05-27T11:00:00Z',
    updatedAt: '2024-05-27T11:00:00Z',
  },
  {
    id: '4',
    classId: '1',
    scheduledDate: '2024-05-22T00:00:00Z',
    startTime: '15:00',
    endTime: '16:00',
    status: 'completed',
    attendanceConfirmed: true,
    notes: 'Great progress on quadratic equations',
    createdAt: '2024-05-20T10:00:00Z',
    updatedAt: '2024-05-22T16:05:00Z',
  },
  {
    id: '5',
    classId: '4',
    scheduledDate: '2024-05-31T00:00:00Z',
    startTime: '13:00',
    endTime: '14:00',
    status: 'scheduled',
    attendanceConfirmed: false,
    createdAt: '2024-05-27T12:00:00Z',
    updatedAt: '2024-05-27T12:00:00Z',
  }
];

// API Functions
export const fetchDashboardStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const clients = generateMockClients();
  const students = generateMockStudents();
  const payments = generateMockPayments();
  const sessions = generateMockClassSessions();
  
  const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const upcomingSessions = sessions.filter(session => 
    session.status === 'scheduled' && new Date(session.scheduledDate) >= new Date()
  ).length;
  const completedSessions = sessions.filter(session => session.status === 'completed').length;
  
  return {
    totalClients: clients.length,
    totalStudents: students.length,
    totalRevenue,
    upcomingSessions,
    completedSessions,
    recentPayments: payments.slice(-3),
    upcomingSessionsData: sessions.filter(session => 
      session.status === 'scheduled' && new Date(session.scheduledDate) >= new Date()
    ).slice(0, 5)
  };
};

export const fetchClients = async (): Promise<Client[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockClients();
};

export const fetchStudents = async (): Promise<Student[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockStudents();
};

export const fetchPayments = async (): Promise<Payment[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockPayments();
};

export const fetchClasses = async (): Promise<Class[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockClasses();
};

export const fetchClassSessions = async (): Promise<ClassSession[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockClassSessions();
};

export const fetchClientById = async (id: string): Promise<Client | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const clients = generateMockClients();
  return clients.find(client => client.id === id) || null;
};

export const fetchStudentsByClientId = async (clientId: string): Promise<Student[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const students = generateMockStudents();
  return students.filter(student => student.clientId === clientId);
};

export const fetchPaymentsByClientId = async (clientId: string): Promise<Payment[]> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  const payments = generateMockPayments();
  return payments.filter(payment => payment.clientId === clientId);
};
