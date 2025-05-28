
import { NotificationTemplate, NotificationLog, NotificationRule } from '@/stores/useNotificationStore';

// Mock notification templates
export const generateMockTemplates = (): NotificationTemplate[] => [
  {
    id: '1',
    name: 'Payment Confirmation',
    type: 'email',
    category: 'payment-confirmation',
    subject: 'Payment Confirmation - ThinkBridge Tutoring',
    content: `Dear {clientName},

Thank you for your payment of ${'{amount}'} received on {paymentDate}.

This payment covers {lessonsPurchased} lessons. Your student {studentName} now has {totalLessonsRemaining} lessons remaining.

Payment Details:
- Amount: ${'{amount}'}
- Payment Method: {paymentMethod}
- Date: {paymentDate}

If you have any questions, please don't hesitate to contact us.

Best regards,
ThinkBridge Tutoring Team`,
    variables: ['clientName', 'amount', 'paymentDate', 'lessonsPurchased', 'studentName', 'totalLessonsRemaining', 'paymentMethod'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Lesson Reminder',
    type: 'both',
    category: 'lesson-reminder',
    subject: 'Upcoming Lesson Reminder - {studentName}',
    content: `Hi {clientName},

This is a friendly reminder that {studentName} has a {subject} lesson scheduled for:

Date: {lessonDate}
Time: {lessonTime}
Duration: {duration} minutes

Google Meet Link: {meetLink}

Please ensure {studentName} is ready 5 minutes before the scheduled time.

See you soon!
ThinkBridge Tutoring`,
    variables: ['clientName', 'studentName', 'subject', 'lessonDate', 'lessonTime', 'duration', 'meetLink'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: '3',
    name: 'Low Lessons Alert',
    type: 'email',
    category: 'renewal-reminder',
    subject: 'Time to Renew - Only {lessonsRemaining} Lessons Left',
    content: `Dear {clientName},

We hope {studentName} is enjoying their tutoring sessions!

This is a friendly reminder that {studentName} has only {lessonsRemaining} lessons remaining in their current package.

To ensure continuity in their learning journey, we recommend purchasing additional lessons soon. You can:
- Reply to this email to discuss options
- Call us at our contact number
- Schedule a brief call to review progress and plan ahead

We appreciate your trust in ThinkBridge Tutoring and look forward to continuing {studentName}'s educational journey.

Best regards,
ThinkBridge Tutoring Team`,
    variables: ['clientName', 'studentName', 'lessonsRemaining'],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  }
];

// Mock notification logs
export const generateMockLogs = (): NotificationLog[] => [
  {
    id: '1',
    templateId: '1',
    recipientId: '1',
    recipientName: 'Sarah Johnson',
    recipientEmail: 'sarah.johnson@email.com',
    type: 'email',
    status: 'delivered',
    subject: 'Payment Confirmation - ThinkBridge Tutoring',
    content: 'Dear Sarah Johnson, Thank you for your payment...',
    sentAt: '2024-05-27T10:00:00Z',
    deliveredAt: '2024-05-27T10:01:30Z',
    createdAt: '2024-05-27T10:00:00Z',
  },
  {
    id: '2',
    templateId: '2',
    recipientId: '2',
    recipientName: 'Michael Chen',
    recipientEmail: 'michael.chen@email.com',
    recipientPhone: '+1 (555) 987-6543',
    type: 'email',
    status: 'sent',
    subject: 'Upcoming Lesson Reminder - Alex Chen',
    content: 'Hi Michael Chen, This is a friendly reminder...',
    sentAt: '2024-05-27T14:30:00Z',
    createdAt: '2024-05-27T14:30:00Z',
  },
  {
    id: '3',
    templateId: '3',
    recipientId: '3',
    recipientName: 'Emily Rodriguez',
    recipientEmail: 'emily.rodriguez@email.com',
    type: 'email',
    status: 'failed',
    subject: 'Time to Renew - Only 2 Lessons Left',
    content: 'Dear Emily Rodriguez, We hope Sofia is enjoying...',
    sentAt: '2024-05-27T09:15:00Z',
    failureReason: 'Invalid email address',
    createdAt: '2024-05-27T09:15:00Z',
  }
];

// API Functions
export const fetchNotificationTemplates = async (): Promise<NotificationTemplate[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockTemplates();
};

export const fetchNotificationLogs = async (): Promise<NotificationLog[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockLogs();
};

export const sendNotification = async (templateId: string, recipientId: string, variables: Record<string, string>) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Notification sent:', { templateId, recipientId, variables });
  return { success: true, messageId: crypto.randomUUID() };
};

export const createTemplate = async (template: Omit<NotificationTemplate, 'id' | 'createdAt' | 'updatedAt'>) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    ...template,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

export const updateTemplate = async (id: string, updates: Partial<NotificationTemplate>) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { ...updates, id, updatedAt: new Date().toISOString() };
};
