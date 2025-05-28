
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'both';
  category: 'payment-confirmation' | 'lesson-reminder' | 'class-reminder' | 'renewal-reminder' | 'custom';
  subject?: string; // for email
  content: string;
  variables: string[]; // available variables like {clientName}, {amount}, etc.
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationLog {
  id: string;
  templateId: string;
  recipientId: string;
  recipientName: string;
  recipientEmail?: string;
  recipientPhone?: string;
  type: 'email' | 'sms';
  status: 'pending' | 'sent' | 'delivered' | 'failed' | 'bounced';
  subject?: string;
  content: string;
  sentAt?: string;
  deliveredAt?: string;
  failureReason?: string;
  createdAt: string;
}

export interface NotificationRule {
  id: string;
  name: string;
  trigger: 'low-lessons' | 'payment-due' | 'class-upcoming' | 'session-completed';
  templateId: string;
  conditions: {
    lessonsRemaining?: number;
    daysBefore?: number;
    paymentOverdue?: number;
  };
  isActive: boolean;
  lastTriggered?: string;
  createdAt: string;
}

interface NotificationState {
  templates: NotificationTemplate[];
  logs: NotificationLog[];
  rules: NotificationRule[];
  selectedTemplate: string | null;
  selectedLog: string | null;
  isLoading: boolean;
  error: string | null;
  
  actions: {
    // Template Management
    addTemplate: (template: Omit<NotificationTemplate, 'id' | 'createdAt' | 'updatedAt'>) => void;
    updateTemplate: (id: string, updates: Partial<NotificationTemplate>) => void;
    deleteTemplate: (id: string) => void;
    setSelectedTemplate: (id: string | null) => void;
    
    // Notification Sending
    sendNotification: (templateId: string, recipientId: string, variables?: Record<string, string>) => Promise<void>;
    sendBulkNotifications: (templateId: string, recipientIds: string[], variables?: Record<string, string>) => Promise<void>;
    
    // Log Management
    addLog: (log: Omit<NotificationLog, 'id' | 'createdAt'>) => void;
    updateLogStatus: (id: string, status: NotificationLog['status'], deliveredAt?: string, failureReason?: string) => void;
    setSelectedLog: (id: string | null) => void;
    
    // Rule Management
    addRule: (rule: Omit<NotificationRule, 'id' | 'createdAt'>) => void;
    updateRule: (id: string, updates: Partial<NotificationRule>) => void;
    deleteRule: (id: string) => void;
    triggerRule: (ruleId: string) => Promise<void>;
    
    // Utility
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    clearAll: () => void;
  };
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      templates: [],
      logs: [],
      rules: [],
      selectedTemplate: null,
      selectedLog: null,
      isLoading: false,
      error: null,
      
      actions: {
        addTemplate: (templateData) => {
          const template: NotificationTemplate = {
            ...templateData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          set((state) => ({
            templates: [...state.templates, template]
          }));
        },
        
        updateTemplate: (id, updates) => {
          set((state) => ({
            templates: state.templates.map(template =>
              template.id === id
                ? { ...template, ...updates, updatedAt: new Date().toISOString() }
                : template
            )
          }));
        },
        
        deleteTemplate: (id) => {
          set((state) => ({
            templates: state.templates.filter(template => template.id !== id),
            selectedTemplate: state.selectedTemplate === id ? null : state.selectedTemplate
          }));
        },
        
        setSelectedTemplate: (id) => set({ selectedTemplate: id }),
        
        sendNotification: async (templateId, recipientId, variables = {}) => {
          const state = get();
          const template = state.templates.find(t => t.id === templateId);
          if (!template) throw new Error('Template not found');
          
          // Create log entry
          const log: NotificationLog = {
            id: crypto.randomUUID(),
            templateId,
            recipientId,
            recipientName: variables.clientName || 'Unknown',
            recipientEmail: variables.email,
            recipientPhone: variables.phone,
            type: template.type === 'both' ? 'email' : template.type,
            status: 'pending',
            subject: template.subject,
            content: template.content,
            createdAt: new Date().toISOString(),
          };
          
          state.actions.addLog(log);
          
          // Simulate sending (in real app, would call API)
          setTimeout(() => {
            state.actions.updateLogStatus(log.id, 'sent', new Date().toISOString());
          }, 1000);
        },
        
        sendBulkNotifications: async (templateId, recipientIds, variables = {}) => {
          const state = get();
          for (const recipientId of recipientIds) {
            await state.actions.sendNotification(templateId, recipientId, variables);
          }
        },
        
        addLog: (logData) => {
          const log: NotificationLog = {
            ...logData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          };
          set((state) => ({
            logs: [...state.logs, log]
          }));
        },
        
        updateLogStatus: (id, status, deliveredAt, failureReason) => {
          set((state) => ({
            logs: state.logs.map(log =>
              log.id === id
                ? { ...log, status, deliveredAt, failureReason }
                : log
            )
          }));
        },
        
        setSelectedLog: (id) => set({ selectedLog: id }),
        
        addRule: (ruleData) => {
          const rule: NotificationRule = {
            ...ruleData,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          };
          set((state) => ({
            rules: [...state.rules, rule]
          }));
        },
        
        updateRule: (id, updates) => {
          set((state) => ({
            rules: state.rules.map(rule =>
              rule.id === id ? { ...rule, ...updates } : rule
            )
          }));
        },
        
        deleteRule: (id) => {
          set((state) => ({
            rules: state.rules.filter(rule => rule.id !== id)
          }));
        },
        
        triggerRule: async (ruleId) => {
          const state = get();
          const rule = state.rules.find(r => r.id === ruleId);
          if (!rule) return;
          
          // Update last triggered time
          state.actions.updateRule(ruleId, { lastTriggered: new Date().toISOString() });
        },
        
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),
        clearAll: () => set({
          templates: [],
          logs: [],
          rules: [],
          selectedTemplate: null,
          selectedLog: null,
        }),
      }
    }),
    {
      name: 'notification-storage',
    }
  )
);
