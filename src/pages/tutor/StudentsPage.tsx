
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useStudents } from '@/hooks/useTutorData';
import StudentsTable from '@/components/tutor/StudentsTable';
import StudentDrawer from '@/components/tutor/StudentDrawer';

const StudentsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: students, isLoading } = useStudents();
  
  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-1">Students</h1>
        <p className="text-gray-500">
          Manage and view your student details, progress, and lessons
        </p>
      </motion.div>
      
      <StudentsTable students={students || []} isLoading={isLoading} />
      
      {id && <StudentDrawer />}
      
      <Outlet />
    </div>
  );
};

export default StudentsPage;
