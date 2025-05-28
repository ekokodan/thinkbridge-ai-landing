
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  fetchNotificationTemplates,
  fetchNotificationLogs,
  sendNotification,
  createTemplate,
  updateTemplate
} from '@/api/notifications';

export const useNotificationTemplates = () => {
  return useQuery({
    queryKey: ['notification-templates'],
    queryFn: fetchNotificationTemplates,
  });
};

export const useNotificationLogs = () => {
  return useQuery({
    queryKey: ['notification-logs'],
    queryFn: fetchNotificationLogs,
  });
};

export const useSendNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ templateId, recipientId, variables }: {
      templateId: string;
      recipientId: string;
      variables: Record<string, string>;
    }) => sendNotification(templateId, recipientId, variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-logs'] });
    },
  });
};

export const useCreateTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createTemplate,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
    },
  });
};

export const useUpdateTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) => 
      updateTemplate(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification-templates'] });
    },
  });
};
