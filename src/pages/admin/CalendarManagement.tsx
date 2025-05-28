
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Edit, Trash2, Calendar as CalendarIcon, Clock, Users, CheckCircle, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useClasses, useClassSessions, useStudents } from '@/hooks/useAdminData';
import { useAdminStore, ClassSession } from '@/stores/useAdminStore';

const sessionFormSchema = z.object({
  classId: z.string().min(1, 'Class is required'),
  scheduledDate: z.date({ required_error: 'Date is required' }),
  startTime: z.string().min(1, 'Start time is required'),
  endTime: z.string().min(1, 'End time is required'),
  notes: z.string().optional(),
});

type SessionFormData = z.infer<typeof sessionFormSchema>;

const CalendarManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<ClassSession | null>(null);
  
  const { data: classes = [], isLoading: classesLoading } = useClasses();
  const { data: sessions = [], isLoading: sessionsLoading } = useClassSessions();
  const { data: students = [] } = useStudents();
  const { actions } = useAdminStore();
  
  const form = useForm<SessionFormData>({
    resolver: zodResolver(sessionFormSchema),
    defaultValues: {
      classId: '',
      scheduledDate: new Date(),
      startTime: '',
      endTime: '',
      notes: '',
    },
  });

  const filteredSessions = sessions.filter(session => {
    const classInfo = classes.find(c => c.id === session.classId);
    const student = students.find(s => s.id === classInfo?.studentId);
    
    const matchesSearch = student?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classInfo?.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.notes?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || session.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const todaySessions = sessions.filter(session => {
    const sessionDate = new Date(session.scheduledDate);
    const today = new Date();
    return sessionDate.toDateString() === today.toDateString();
  });

  const upcomingSessions = sessions.filter(session => {
    const sessionDate = new Date(session.scheduledDate);
    const today = new Date();
    return sessionDate > today && session.status === 'scheduled';
  });

  const handleSubmit = (data: SessionFormData) => {
    const sessionData = {
      classId: data.classId,
      scheduledDate: data.scheduledDate.toISOString(),
      startTime: data.startTime,
      endTime: data.endTime,
      status: 'scheduled' as const,
      attendanceConfirmed: false,
      notes: data.notes,
    };
    
    if (editingSession) {
      actions.updateSession(editingSession.id, sessionData);
    } else {
      actions.addSession(sessionData);
    }
    
    form.reset();
    setIsAddDialogOpen(false);
    setEditingSession(null);
  };

  const handleEdit = (session: ClassSession) => {
    setEditingSession(session);
    form.reset({
      classId: session.classId,
      scheduledDate: new Date(session.scheduledDate),
      startTime: session.startTime,
      endTime: session.endTime,
      notes: session.notes || '',
    });
    setIsAddDialogOpen(true);
  };

  const handleMarkAttendance = (sessionId: string, attended: boolean) => {
    actions.markAttendance(sessionId, attended);
  };

  const handleCancel = (sessionId: string) => {
    if (window.confirm('Are you sure you want to cancel this session?')) {
      actions.updateSession(sessionId, { status: 'cancelled' });
    }
  };

  const getStatusColor = (status: ClassSession['status']) => {
    switch (status) {
      case 'scheduled': return 'default';
      case 'completed': return 'outline';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  const isLoading = classesLoading || sessionsLoading;

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
            <h1 className="text-3xl font-bold mb-2">Calendar Management</h1>
            <p className="text-gray-600">
              Schedule and manage tutoring sessions
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingSession(null);
                form.reset();
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingSession ? 'Edit Session' : 'Schedule New Session'}
                </DialogTitle>
                <DialogDescription>
                  {editingSession ? 'Update session details' : 'Create a new tutoring session'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="classId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {classes.map((classItem) => {
                              const student = students.find(s => s.id === classItem.studentId);
                              return (
                                <SelectItem key={classItem.id} value={classItem.id}>
                                  {student?.name} - {classItem.subject}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="scheduledDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes (optional)</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Session notes or special instructions..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddDialogOpen(false);
                        setEditingSession(null);
                        form.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingSession ? 'Update Session' : 'Schedule Session'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaySessions.length}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled for today
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingSessions.length}</div>
            <p className="text-xs text-muted-foreground">
              Future sessions
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Classes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-muted-foreground">
              Active classes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Search & Filter Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Search by student name, subject, or notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sessions</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Calendar Tabs */}
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Session List</TabsTrigger>
          <TabsTrigger value="today">Today's Schedule</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                All Sessions ({filteredSessions.length})
              </CardTitle>
              <CardDescription>
                Complete session schedule and management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student & Subject</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Attendance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSessions.map((session) => {
                      const classInfo = classes.find(c => c.id === session.classId);
                      const student = students.find(s => s.id === classInfo?.studentId);
                      return (
                        <TableRow key={session.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Users className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium">{student?.name || 'Unknown Student'}</div>
                                <div className="text-sm text-gray-500">{classInfo?.subject}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">
                                {new Date(session.scheduledDate).toLocaleDateString()}
                              </div>
                              <div className="text-gray-500">
                                {session.startTime} - {session.endTime}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">{classInfo?.duration || 60} min</span>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(session.status)}>
                              {session.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {session.status === 'scheduled' && !session.attendanceConfirmed ? (
                              <div className="flex space-x-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleMarkAttendance(session.id, true)}
                                  className="text-green-600"
                                >
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleMarkAttendance(session.id, false)}
                                  className="text-red-600"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-500">
                                {session.attendanceConfirmed ? 
                                  (session.status === 'completed' ? 'Attended' : 'Confirmed') : 
                                  '-'}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(session)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              {session.status === 'scheduled' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCancel(session.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                
                {filteredSessions.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    {searchQuery || filterStatus !== 'all'
                      ? 'No sessions found matching your filters.'
                      : 'No sessions scheduled yet.'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>
                Sessions scheduled for today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {todaySessions.length > 0 ? (
                <div className="space-y-4">
                  {todaySessions.map((session) => {
                    const classInfo = classes.find(c => c.id === session.classId);
                    const student = students.find(s => s.id === classInfo?.studentId);
                    return (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg font-semibold">
                            {session.startTime}
                          </div>
                          <div>
                            <div className="font-medium">{student?.name}</div>
                            <div className="text-sm text-gray-500">{classInfo?.subject}</div>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No sessions scheduled for today
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                Future scheduled sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.slice(0, 10).map((session) => {
                    const classInfo = classes.find(c => c.id === session.classId);
                    const student = students.find(s => s.id === classInfo?.studentId);
                    return (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="text-sm">
                            <div className="font-medium">
                              {new Date(session.scheduledDate).toLocaleDateString()}
                            </div>
                            <div className="text-gray-500">{session.startTime}</div>
                          </div>
                          <div>
                            <div className="font-medium">{student?.name}</div>
                            <div className="text-sm text-gray-500">{classInfo?.subject}</div>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(session.status)}>
                          {session.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No upcoming sessions scheduled
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalendarManagement;
