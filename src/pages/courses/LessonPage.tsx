
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { fetchLesson } from '@/api/courses';
import { fetchAvailableBadges } from '@/api/progress';
import { useProgressStore } from '@/stores/useProgressStore';
import VideoPlayer from '@/components/VideoPlayer';

const LessonPage: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string, lessonId: string }>();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const { data: lesson, isLoading } = useQuery({
    queryKey: ['lesson', lessonId],
    queryFn: () => lessonId ? fetchLesson(lessonId) : Promise.resolve(undefined),
    enabled: !!lessonId
  });
  
  const { data: availableBadges } = useQuery({
    queryKey: ['badges'],
    queryFn: fetchAvailableBadges
  });
  
  const xp = useProgressStore(state => state.xp);
  const badges = useProgressStore(state => state.badges);
  const earnedBadges = availableBadges?.filter(badge => badges.includes(badge.id)) || [];
  const progressLevels = Math.floor(xp / 100) + 1;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
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
          
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 rounded-full px-3 py-1 flex items-center gap-1">
              <span className="text-indigo-700 font-medium">{xp} XP</span>
              <span className="text-xs text-indigo-600">Level {progressLevels}</span>
            </div>
            
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                  aria-label="View badges"
                >
                  <Award size={16} />
                  Badges
                  {badges.length > 0 && (
                    <Badge className="ml-1">{badges.length}</Badge>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Your Badges</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {earnedBadges.length > 0 ? (
                    earnedBadges.map(badge => (
                      <Card key={badge.id}>
                        <CardContent className="p-4 flex flex-col items-center text-center">
                          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                            <Award size={32} className="text-indigo-600" />
                          </div>
                          <h3 className="font-medium text-sm">{badge.name}</h3>
                          <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">Complete lessons and quizzes to earn badges!</p>
                    </div>
                  )}
                  
                  {availableBadges && availableBadges.length > earnedBadges.length && (
                    <div className="col-span-full mt-4">
                      <h3 className="font-medium mb-2">Badges to Earn</h3>
                      {availableBadges
                        .filter(badge => !badges.includes(badge.id))
                        .map(badge => (
                          <div key={badge.id} className="flex items-center justify-between p-2 border-t">
                            <div>
                              <p className="font-medium text-sm">{badge.name}</p>
                              <p className="text-xs text-gray-500">{badge.condition}</p>
                            </div>
                            <Badge variant="outline">{badge.xpThreshold} XP</Badge>
                          </div>
                        ))
                      }
                    </div>
                  )}
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-28 w-full" />
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-6">{lesson?.title}</h1>
              
              {lesson && (
                <VideoPlayer 
                  videoUrl={lesson.videoUrl} 
                  transcript={lesson.transcript} 
                  lessonId={lesson.id} 
                />
              )}
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>About this Lesson</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{lesson?.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LessonPage;
