
import React from 'react';
import { motion } from 'framer-motion';
import { useStudents } from '@/hooks/useTutorData';
import AnalyticsCards from '@/components/tutor/AnalyticsCards';

const TutorDashboard: React.FC = () => {
  const { data: students, isLoading } = useStudents();

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold mb-1">Tutor Dashboard</h1>
        <p className="text-gray-500">
          Welcome to your tutor dashboard. Here's your overview for today.
        </p>
      </motion.div>
      
      <AnalyticsCards />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-bold mb-4">Upcoming Lessons</h2>
            
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 bg-slate-100 animate-pulse rounded-md"></div>
                ))}
              </div>
            ) : students && students.length > 0 ? (
              <div className="space-y-3">
                {students
                  .filter(student => student.nextLesson)
                  .sort((a, b) => {
                    if (!a.nextLesson) return 1;
                    if (!b.nextLesson) return -1;
                    return new Date(a.nextLesson).getTime() - new Date(b.nextLesson).getTime();
                  })
                  .slice(0, 5)
                  .map((student) => (
                    <div key={student.id} className="flex items-center p-3 border rounded-lg hover:bg-slate-50">
                      {student.avatar ? (
                        <img 
                          src={student.avatar} 
                          alt={student.name} 
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                          <span className="text-sm font-bold text-indigo-600">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-500">
                          {student.nextLesson && new Date(student.nextLesson).toLocaleString(undefined, {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <div className="ml-auto flex gap-1">
                        {student.subjects.map(subject => (
                          <span key={subject} className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">No upcoming lessons scheduled.</p>
            )}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-bold mb-4">Student Progress</h2>
            
            {isLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-12 bg-slate-100 animate-pulse rounded-md"></div>
                ))}
              </div>
            ) : students && students.length > 0 ? (
              <div className="space-y-4">
                {students
                  .sort((a, b) => b.progress - a.progress)
                  .slice(0, 5)
                  .map((student) => (
                    <div key={student.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{student.name}</span>
                        <span className="text-sm text-gray-500">{student.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">No student data available.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TutorDashboard;
