
import { useQuery } from '@tanstack/react-query';
import { 
  fetchDashboardStats,
  fetchClients, 
  fetchStudents, 
  fetchPayments, 
  fetchClasses, 
  fetchClassSessions,
  fetchClientById,
  fetchStudentsByClientId,
  fetchPaymentsByClientId
} from '@/api/admin';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useClients = () => {
  return useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
  });
};

export const useStudents = () => {
  return useQuery({
    queryKey: ['admin-students'],
    queryFn: fetchStudents,
  });
};

export const usePayments = () => {
  return useQuery({
    queryKey: ['payments'],
    queryFn: fetchPayments,
  });
};

export const useClasses = () => {
  return useQuery({
    queryKey: ['classes'],
    queryFn: fetchClasses,
  });
};

export const useClassSessions = () => {
  return useQuery({
    queryKey: ['class-sessions'],
    queryFn: fetchClassSessions,
  });
};

export const useClient = (id: string | undefined) => {
  return useQuery({
    queryKey: ['client', id],
    queryFn: () => id ? fetchClientById(id) : Promise.resolve(null),
    enabled: !!id,
  });
};

export const useStudentsByClient = (clientId: string | undefined) => {
  return useQuery({
    queryKey: ['students', 'by-client', clientId],
    queryFn: () => clientId ? fetchStudentsByClientId(clientId) : Promise.resolve([]),
    enabled: !!clientId,
  });
};

export const usePaymentsByClient = (clientId: string | undefined) => {
  return useQuery({
    queryKey: ['payments', 'by-client', clientId],
    queryFn: () => clientId ? fetchPaymentsByClientId(clientId) : Promise.resolve([]),
    enabled: !!clientId,
  });
};
