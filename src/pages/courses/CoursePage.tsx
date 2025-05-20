
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useCourse } from '@/hooks/useCourse';
import CourseSidebar from '@/components/CourseSidebar';
import { fetchProgressStats } from '@/api/progress';
import { useQuery } from '@tanstack/react-query';

const CoursePage: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { course, units, isLoading } = useCourse(courseId);

  // Redirect to the first unit if available
  useEffect(() => {
    if (!isLoading && units.length > 0) {
      navigate(`/courses/${courseId}/units/${units[0].id}`);
    }
  }, [isLoading, units, courseId, navigate]);

  // Progress stats query
  const { data: progressStats } = useQuery({
    queryKey: ['progress-stats', courseId],
    queryFn: () => courseId ? fetchProgressStats(courseId) : Promise.resolve(undefined),
    enabled: !!courseId
  });
  
  return (
    <div className="flex h-screen">
      <CourseSidebar units={units} isLoading={isLoading} />
      
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div className="max-w-5xl mx-auto">
          <nav className="mb-6">
            <Button 
              variant="ghost" 
              className="flex items-center gap-2" 
              asChild
            >
              <Link to="/">
                <ArrowLeft size={16} />
                Back to Courses
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-6">{course?.title}</h1>
              
              <Card className="mb-10">
                <CardContent className="p-6">
                  <p className="text-gray-600">{course?.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
