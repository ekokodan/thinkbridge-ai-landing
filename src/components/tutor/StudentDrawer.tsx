
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { X, Mail, Phone } from 'lucide-react';
import { useStudents } from '@/hooks/useTutorData';
import { useTutorStore } from '@/stores/useTutorStore';
import { format } from 'date-fns';
import ProgressChart from './ProgressChart';

const StudentDrawer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { actions } = useTutorStore();
  const { data: students, isLoading } = useStudents();
  const [notes, setNotes] = React.useState('');
  
  const student = React.useMemo(() => {
    if (!students || !id) return null;
    return students.find(s => s.id === id) || null;
  }, [students, id]);
  
  const handleClose = () => {
    actions.setSelectedStudent(null);
    navigate('/tutor/students');
  };

  React.useEffect(() => {
    if (student?.notes) {
      setNotes(student.notes);
    }
  }, [student]);
  
  if (isLoading) {
    return (
      <motion.div
        className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="flex justify-center py-12">
          <div className="w-8 h-8 border-4 border-indigo-300 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
      </motion.div>
    );
  }
  
  if (!student) {
    return (
      <motion.div
        className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 overflow-y-auto"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold">Student Profile</h2>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X size={20} />
          </Button>
        </div>
        <p>Student not found.</p>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg p-6 overflow-y-auto"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 20 }}
      role="dialog"
      aria-labelledby="student-drawer-title"
    >
      <div className="flex justify-between mb-6">
        <h2 id="student-drawer-title" className="text-2xl font-bold">Student Profile</h2>
        <Button variant="ghost" size="sm" onClick={handleClose} aria-label="Close">
          <X size={20} />
        </Button>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        {student.avatar ? (
          <img 
            src={student.avatar} 
            alt={student.name} 
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-indigo-600">
              {student.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
        )}
        <h3 className="text-xl font-semibold">{student.name}</h3>
        <p className="text-gray-500 mb-2">{student.plan}</p>
        
        <div className="flex space-x-2 mb-2">
          {student.subjects.map(subject => (
            <span key={subject} className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
              {subject}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-4 mt-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <Mail size={16} className="mr-2" />
            Email
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <Phone size={16} className="mr-2" />
            Call
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="progress">
        <TabsList className="w-full mb-6">
          <TabsTrigger value="progress" className="w-1/3">Progress</TabsTrigger>
          <TabsTrigger value="notes" className="w-1/3">Notes</TabsTrigger>
          <TabsTrigger value="tasks" className="w-1/3">Tasks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
              <CardDescription>Current progress across subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 mb-4">
                <ProgressChart 
                  data={[
                    { subject: student.subjects[0] || 'Subject 1', value: student.progress },
                    { subject: student.subjects[1] || 'Subject 2', value: Math.max(30, student.progress - 15) },
                    { subject: 'Average', value: 65 }
                  ]} 
                />
              </div>
              
              <div className="mt-8">
                <h4 className="text-sm font-medium mb-2">Next Lesson</h4>
                {student.nextLesson ? (
                  <p className="text-sm text-gray-700">
                    {format(new Date(student.nextLesson), 'EEEE, MMMM d, yyyy - h:mm a')}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">No upcoming lessons scheduled.</p>
                )}
                
                <Button className="mt-4 w-full" size="sm">Schedule New Lesson</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes">
          <Card>
            <CardHeader>
              <CardTitle>Session Notes</CardTitle>
              <CardDescription>Record notes for this student</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter your notes about this student..."
                className="min-h-[200px] mb-4"
              />
              <Button>Save Notes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Tasks</CardTitle>
              <CardDescription>Track student's homework and assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {student.tasks && student.tasks.length > 0 ? (
                <div className="space-y-4">
                  {student.tasks.map((task) => (
                    <div key={task.id} className="flex items-center space-x-2">
                      <Checkbox id={task.id} checked={task.completed} />
                      <label
                        htmlFor={task.id}
                        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${task.completed ? 'line-through text-gray-500' : ''}`}
                      >
                        {task.title}
                      </label>
                    </div>
                  ))}
                  
                  <Button className="w-full mt-4" variant="outline">Add New Task</Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No tasks assigned</p>
                  <Button>Assign First Task</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default StudentDrawer;
