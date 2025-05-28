
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Plus, 
  Send, 
  Settings, 
  Users, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useNotificationTemplates, useNotificationLogs } from '@/hooks/useNotificationData';
import { useClients } from '@/hooks/useAdminData';
import TemplateManager from '@/components/admin/TemplateManager';
import NotificationSender from '@/components/admin/NotificationSender';
import DeliveryTracking from '@/components/admin/DeliveryTracking';
import ReminderAutomation from '@/components/admin/ReminderAutomation';

const NotificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: templates, isLoading: templatesLoading } = useNotificationTemplates();
  const { data: logs, isLoading: logsLoading } = useNotificationLogs();
  const { data: clients } = useClients();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'sent': return 'text-blue-600 bg-blue-50';
      case 'failed': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'sent': return <Clock className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const stats = {
    totalTemplates: templates?.length || 0,
    activeTemplates: templates?.filter(t => t.isActive).length || 0,
    totalSent: logs?.length || 0,
    deliveryRate: logs?.length ? 
      Math.round((logs.filter(l => l.status === 'delivered').length / logs.length) * 100) : 0,
  };

  if (templatesLoading || logsLoading) {
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
              Manage email and SMS notifications, templates, and delivery tracking.
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Button>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Templates',
            value: stats.totalTemplates,
            icon: Mail,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
          },
          {
            title: 'Active Templates',
            value: stats.activeTemplates,
            icon: CheckCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
          },
          {
            title: 'Notifications Sent',
            value: stats.totalSent,
            icon: Send,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
          },
          {
            title: 'Delivery Rate',
            value: `${stats.deliveryRate}%`,
            icon: Bell,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`${stat.bgColor} p-2 rounded-md`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="send">Send Messages</TabsTrigger>
          <TabsTrigger value="tracking">Delivery Tracking</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Recent Notifications
                </CardTitle>
                <CardDescription>Latest sent messages</CardDescription>
              </CardHeader>
              <CardContent>
                {logs && logs.length > 0 ? (
                  <div className="space-y-4">
                    {logs.slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{log.recipientName}</p>
                          <p className="text-sm text-gray-500 truncate">{log.subject}</p>
                          <p className="text-xs text-gray-400">{log.createdAt}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className={getStatusColor(log.status)}>
                            {getStatusIcon(log.status)}
                            <span className="ml-1">{log.status}</span>
                          </Badge>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      View All Logs
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No notifications sent yet</p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="mr-2 h-5 w-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common notification tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  <Button className="h-16 flex flex-col" onClick={() => setActiveTab('send')}>
                    <Mail className="mb-2" />
                    Send Payment Confirmation
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col" onClick={() => setActiveTab('send')}>
                    <MessageSquare className="mb-2" />
                    Send Lesson Reminder
                  </Button>
                  <Button variant="outline" className="h-16 flex flex-col" onClick={() => setActiveTab('automation')}>
                    <Users className="mb-2" />
                    Setup Automation Rule
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
          <TemplateManager templates={templates || []} />
        </TabsContent>

        <TabsContent value="send">
          <NotificationSender 
            templates={templates || []} 
            clients={clients || []}
          />
        </TabsContent>

        <TabsContent value="tracking">
          <DeliveryTracking logs={logs || []} />
        </TabsContent>

        <TabsContent value="automation">
          <ReminderAutomation 
            templates={templates || []}
            clients={clients || []}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationCenter;
