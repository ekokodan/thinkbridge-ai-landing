
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useUnit } from '@/hooks/useUnit';
import { useCourse } from '@/hooks/useCourse';
import CourseSidebar from '@/components/CourseSidebar';
import ProgressLegend from '@/components/ProgressLegend';
import ProgressSquares from '@/components/ProgressSquares';
import LessonItem from '@/components/LessonItem';
import PracticeItem from '@/components/PracticeItem';
import { Lesson, Practice } from '@/api/courses';

const UnitPage: React.FC = () => {
  const { courseId, unitId } = useParams<{ courseId: string, unitId: string }>();
  const { course, units, isLoading: isCourseLoading } = useCourse(courseId);
  const { unit, lessons, practices, progressStats, isLoading: isUnitLoading } = useUnit(unitId, courseId);
  
  const isLoading = isCourseLoading || isUnitLoading;
  
  // Create items for progress squares
  const progressItems = [
    ...lessons.map((lesson: Lesson) => ({ 
      id: lesson.id, 
      title: lesson.title, 
      type: 'lesson' as const 
    })),
    ...practices.map((practice: Practice) => ({ 
      id: practice.id, 
      title: practice.title, 
      type: practice.type as 'quiz' | 'unit-test'
    }))
  ];
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="flex h-screen">
      <CourseSidebar units={units} isLoading={isCourseLoading} />
      
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <nav className="mb-6">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2" 
              asChild
            >
              <Link to={`/courses/${courseId}`}>
                <ArrowLeft size={16} />
                Back to Course
              </Link>
            </Button>
          </nav>
          
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-28 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-48 w-full" />
                ))}
              </div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-6">{unit?.title}</h1>
              
              <div className="mb-8">
                <ProgressLegend stats={progressStats} />
              </div>
              
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>About this Unit</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose">
                    <div dangerouslySetInnerHTML={{ __html: unit?.about || "" }} />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Progress Tracker</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProgressSquares items={progressItems} />
                </CardContent>
              </Card>
              
              {lessons.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">Learn</h2>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {lessons.map((lesson) => (
                      <motion.div key={lesson.id} variants={item}>
                        <LessonItem lesson={lesson} courseId={courseId || ""} />
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              )}
              
              {practices.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-2xl font-bold mb-4">Practice</h2>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={container}
                    initial="hidden"
                    animate="show"
                  >
                    {practices.map((practice) => (
                      <motion.div key={practice.id} variants={item}>
                        <PracticeItem practice={practice} />
                      </motion.div>
                    ))}
                  </motion.div>
                </section>
              )}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UnitPage;
