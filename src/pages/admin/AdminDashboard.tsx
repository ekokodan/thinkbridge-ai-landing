import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, Calendar, BookOpen, TrendingUp, AlertCircle, Bell } from 'lucide-react';
import { useDashboardStats } from '@/hooks/useAdminData';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { data: stats, isLoading } = useDashboardStats();
  const navigate = useNavigate();

  const statCards = [
    {
      title: 'Total Clients',
      value: stats?.totalClients || 0,
      icon: Users,
      description: 'Active clients',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Students',
      value: stats?.totalStudents || 0,
      icon: BookOpen,
      description: 'Enrolled students',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Total Revenue',
      value: `$${stats?.totalRevenue || 0}`,
      icon: DollarSign,
      description: 'This month',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Upcoming Sessions',
      value: stats?.upcomingSessions || 0,
      icon: Calendar,
      description: 'Next 7 days',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

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
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">
              Welcome to your ThinkBridge admin dashboard. Here's your overview for today.
            </p>
          </div>
          <Button onClick={() => navigate('/admin/notifications')}>
            <Bell className="mr-2 h-4 w-4" />
            Notification Center
          </Button>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
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
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Recent Payments
              </CardTitle>
              <CardDescription>Latest payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.recentPayments && stats.recentPayments.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">${payment.amount}</p>
                        <p className="text-sm text-gray-500">
                          {payment.lessonsPurchased} lessons - {payment.paymentMethod}
                        </p>
                        <p className="text-xs text-gray-400">
                          {format(new Date(payment.paymentDate), 'MMM dd, yyyy')}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-green-600">
                        Paid
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Payments
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No recent payments</p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Sessions
              </CardTitle>
              <CardDescription>Next scheduled classes</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.upcomingSessionsData && stats.upcomingSessionsData.length > 0 ? (
                <div className="space-y-4">
                  {stats.upcomingSessionsData.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">
                          {format(new Date(session.scheduledDate), 'MMM dd, yyyy')}
                        </p>
                        <p className="text-sm text-gray-500">
                          {session.startTime} - {session.endTime}
                        </p>
                        <Badge variant="secondary" className="mt-1">
                          {session.status}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    View All Sessions
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No upcoming sessions</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col">
                <Users className="mb-2" />
                Add New Client
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <Calendar className="mb-2" />
                Schedule Session
              </Button>
              <Button variant="outline" className="h-20 flex flex-col">
                <DollarSign className="mb-2" />
                Record Payment
              </Button>
              <Button variant="outline" className="h-20 flex flex-col" onClick={() => navigate('/admin/notifications')}>
                <Bell className="mb-2" />
                Send Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Alerts/Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-orange-500" />
              Alerts & Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertCircle className="mr-3 h-5 w-5 text-orange-500" />
                <div>
                  <p className="font-medium">Payment Reminders Needed</p>
                  <p className="text-sm text-gray-600">2 clients have low lesson balances</p>
                </div>
                <Button size="sm" className="ml-auto" onClick={() => navigate('/admin/notifications')}>
                  Send Reminders
                </Button>
              </div>
              <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <Calendar className="mr-3 h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">Class Reminders</p>
                  <p className="text-sm text-gray-600">3 classes scheduled for tomorrow</p>
                </div>
                <Button size="sm" variant="outline" className="ml-auto" onClick={() => navigate('/admin/notifications')}>
                  Send Reminders
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
