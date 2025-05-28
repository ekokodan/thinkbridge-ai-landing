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
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Plus, Search, Edit, Trash2, User, GraduationCap, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useStudents, useClients } from '@/hooks/useAdminData';
import { useAdminStore, Student, WorkAssignment } from '@/stores/useAdminStore';

const studentFormSchema = z.object({
  clientId: z.string().min(1, 'Client is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().optional().or(z.literal('')),
  grade: z.string().optional(),
  subjects: z.array(z.string()),
  lessonBalance: z.number().min(0, 'Lesson balance cannot be negative'),
  status: z.enum(['active', 'inactive', 'on-hold']),
  notes: z.string().optional(),
});

const workAssignmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  subject: z.string().min(1, 'Subject is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  status: z.enum(['assigned', 'in-progress', 'completed', 'overdue']),
});

type StudentFormData = z.infer<typeof studentFormSchema>;
type WorkAssignmentData = z.infer<typeof workAssignmentSchema>;

const SUBJECTS = ['Math', 'Science', 'English', 'History', 'Physics', 'Chemistry', 'Biology', 'Spanish', 'French'];

const StudentManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isWorkDialogOpen, setIsWorkDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  const { data: students = [], isLoading } = useStudents();
  const { data: clients = [] } = useClients();
  const { actions } = useAdminStore();
  
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      clientId: '',
      name: '',
      email: '',
      grade: '',
      subjects: [],
      lessonBalance: 0,
      status: 'active',
      notes: '',
    },
  });

  const workForm = useForm<WorkAssignmentData>({
    resolver: zodResolver(workAssignmentSchema),
    defaultValues: {
      title: '',
      description: '',
      subject: '',
      dueDate: '',
      status: 'assigned',
    },
  });

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubmit = (data: StudentFormData) => {
    const studentData = {
      clientId: data.clientId,
      name: data.name,
      email: data.email,
      grade: data.grade,
      subjects: data.subjects,
      lessonBalance: data.lessonBalance,
      status: data.status,
      notes: data.notes,
      assignedWork: editingStudent?.assignedWork || [],
      totalLessonsCompleted: editingStudent?.totalLessonsCompleted || 0,
    };
    
    if (editingStudent) {
      actions.updateStudent(editingStudent.id, studentData);
    } else {
      actions.addStudent(studentData);
    }
    
    form.reset();
    setIsAddDialogOpen(false);
    setEditingStudent(null);
  };

  const handleWorkSubmit = (data: WorkAssignmentData) => {
    if (selectedStudent) {
      const workData = {
        title: data.title,
        description: data.description,
        subject: data.subject,
        dueDate: data.dueDate,
        status: data.status,
      };
      actions.addWorkAssignment(selectedStudent.id, workData);
      workForm.reset();
      setIsWorkDialogOpen(false);
      setSelectedStudent(null);
    }
  };

  const handleLessonBalanceChange = (studentId: string, change: number) => {
    actions.updateLessonBalance(studentId, change);
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    form.reset({
      clientId: student.clientId,
      name: student.name,
      email: student.email || '',
      grade: student.grade || '',
      subjects: student.subjects,
      lessonBalance: student.lessonBalance,
      status: student.status,
      notes: student.notes || '',
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (studentId: string) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      actions.deleteStudent(studentId);
    }
  };

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'on-hold': return 'destructive';
      default: return 'secondary';
    }
  };

  const getWorkStatusIcon = (status: WorkAssignment['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'overdue': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <BookOpen className="h-4 w-4 text-gray-500" />;
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
            <h1 className="text-3xl font-bold mb-2">Student Management</h1>
            <p className="text-gray-600">
              Manage students, lesson balances, and assignments
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingStudent(null);
                form.reset();
              }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingStudent ? 'Edit Student' : 'Add New Student'}
                </DialogTitle>
                <DialogDescription>
                  {editingStudent ? 'Update student information' : 'Create a new student profile'}
                </DialogDescription>
              </DialogHeader>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="clientId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Parent/Client</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select client" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {clients.map((client) => (
                                <SelectItem key={client.id} value={client.id}>
                                  {client.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Student Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter student name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (optional)</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Student email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="grade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grade Level</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 9th Grade" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="on-hold">On Hold</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="lessonBalance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lesson Balance</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Number of lessons remaining"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="subjects"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subjects</FormLabel>
                        <div className="grid grid-cols-3 gap-2">
                          {SUBJECTS.map((subject) => (
                            <label key={subject} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={field.value.includes(subject)}
                                onChange={(e) => {
                                  const newSubjects = e.target.checked
                                    ? [...field.value, subject]
                                    : field.value.filter(s => s !== subject);
                                  field.onChange(newSubjects);
                                }}
                              />
                              <span className="text-sm">{subject}</span>
                            </label>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Additional notes about the student..."
                            className="min-h-[80px]"
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
                        setEditingStudent(null);
                        form.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingStudent ? 'Update Student' : 'Create Student'}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="mr-2 h-5 w-5" />
            Search Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by name or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" />
            Students ({filteredStudents.length})
          </CardTitle>
          <CardDescription>
            Manage student information, lesson balances, and assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Parent/Client</TableHead>
                      <TableHead>Subjects</TableHead>
                      <TableHead>Lesson Balance</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => {
                      const client = clients.find(c => c.id === student.clientId);
                      return (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <User className="h-4 w-4 text-green-600" />
                              </div>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                {student.grade && (
                                  <div className="text-sm text-gray-500">{student.grade}</div>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{client?.name || 'Unknown Client'}</div>
                              <div className="text-gray-500">{client?.email || ''}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {(student.subjects || []).map((subject) => (
                                <Badge key={subject} variant="outline" className="text-xs">
                                  {subject}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-semibold">
                                {student.lessonBalance}
                              </span>
                              <div className="flex space-x-1">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleLessonBalanceChange(student.id, 1)}
                                >
                                  +
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleLessonBalanceChange(student.id, -1)}
                                  disabled={student.lessonBalance === 0}
                                >
                                  -
                                </Button>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(student.status)}>
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedStudent(student);
                                  setIsWorkDialogOpen(true);
                                }}
                              >
                                + Work
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(student)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(student.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
                
                {filteredStudents.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    {searchQuery ? 'No students found matching your search.' : 'No students yet. Add your first student to get started.'}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="assignments">
              <div className="space-y-6">
                {filteredStudents.map((student) => (
                  <Card key={student.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{student.name}</CardTitle>
                      <CardDescription>
                        Assigned work and progress
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {(student.assignedWork || []).length > 0 ? (
                        <div className="space-y-3">
                          {(student.assignedWork || []).map((assignment) => (
                            <div key={assignment.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center space-x-3">
                                {getWorkStatusIcon(assignment.status)}
                                <div>
                                  <div className="font-medium">{assignment.title}</div>
                                  <div className="text-sm text-gray-500">
                                    {assignment.subject} • Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              <Badge variant="outline">
                                {assignment.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          No assignments yet
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Work Assignment Dialog */}
      <Dialog open={isWorkDialogOpen} onOpenChange={setIsWorkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Work</DialogTitle>
            <DialogDescription>
              Create a new assignment for {selectedStudent?.name}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...workForm}>
            <form onSubmit={workForm.handleSubmit(handleWorkSubmit)} className="space-y-4">
              <FormField
                control={workForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignment Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter assignment title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={workForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Assignment description and instructions"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={workForm.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {SUBJECTS.map((subject) => (
                            <SelectItem key={subject} value={subject}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={workForm.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsWorkDialogOpen(false);
                    setSelectedStudent(null);
                    workForm.reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Assign Work
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentManagement;
