import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Send, MessageSquare, Mail, Phone, Bell, Clock, CheckCircle, XCircle } from 'lucide-react';
import TemplateManager from '@/components/admin/TemplateManager';
import NotificationSender from '@/components/admin/NotificationSender';
import DeliveryTracking from '@/components/admin/DeliveryTracking';
import ReminderAutomation from '@/components/admin/ReminderAutomation';
import { useNotificationTemplates, useNotificationLogs } from '@/hooks/useNotificationData';
import { useAdminStore } from '@/stores/useAdminStore';

const NotificationCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: templates, isLoading: templatesLoading } = useNotificationTemplates();
  const { data: logs, isLoading: logsLoading } = useNotificationLogs();
  const { clients } = useAdminStore();

  const isLoading = templatesLoading || logsLoading;

  const filteredTemplates = templates?.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.subject?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notification Center</h1>
            <p className="text-gray-600">
              Manage templates, send notifications, and track delivery status
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Search Templates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="templates" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="send">Send Notifications</TabsTrigger>
          <TabsTrigger value="tracking">Delivery Tracking</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <TemplateManager templates={templates || []} />
        </TabsContent>

        <TabsContent value="send">
          <NotificationSender templates={templates || []} clients={clients} />
        </TabsContent>

        <TabsContent value="tracking">
          <DeliveryTracking logs={logs || []} />
        </TabsContent>

        <TabsContent value="automation">
          <ReminderAutomation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
