
import React from 'react';
import { motion } from 'framer-motion';
import { useStudentStore } from '@/stores/useStudentStore';
import { useCredits, useHomework, useUpcomingSessions, useProgressData } from '@/hooks/useStudentData';
import ProgressWidget from '@/components/dashboard/ProgressWidget';
import CreditsWidget from '@/components/dashboard/CreditsWidget';
import HomeworkWidget from '@/components/dashboard/HomeworkWidget';
import SessionsWidget from '@/components/dashboard/SessionsWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, TrendingUp, Clock, BookOpen } from 'lucide-react';

const StudentDashboard: React.FC = () => {
  const { profile } = useStudentStore();
  const { data: credits, isLoading: creditsLoading } = useCredits();
  const { data: homework, isLoading: homeworkLoading } = useHomework();
  const { data: sessions, isLoading: sessionsLoading } = useUpcomingSessions();
  const { data: progressData, isLoading: progressLoading } = useProgressData();

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Welcome back, {profile.name?.split(' ')[0] || 'Student'}!
        </h1>
        <p className="text-slate-600">
          Here's your learning progress and upcoming activities.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <GraduationCap className="h-8 w-8 text-indigo-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-slate-600">Current Grade</p>
                  <p className="text-lg font-bold">{profile.grade}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-slate-600">Active Subjects</p>
                  <p className="text-lg font-bold">{profile.subjects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-slate-600">Study Hours/Week</p>
                  <p className="text-lg font-bold">{profile.weeklyStudyHours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-slate-600">Overall Progress</p>
                  <p className="text-lg font-bold">
                    {progressData ? 
                      Math.round(progressData.skillRadarData.reduce((acc, curr) => acc + curr.value, 0) / progressData.skillRadarData.length) 
                      : '---'
                    }%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Overview - Takes up 2 columns on large screens */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <ProgressWidget data={progressData} isLoading={progressLoading} />
        </motion.div>

        {/* Credits Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <CreditsWidget credits={credits} isLoading={creditsLoading} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Homework Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <HomeworkWidget homework={homework} isLoading={homeworkLoading} />
        </motion.div>

        {/* Upcoming Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <SessionsWidget sessions={sessions} isLoading={sessionsLoading} />
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;
