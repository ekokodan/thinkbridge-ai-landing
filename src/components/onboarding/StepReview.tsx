
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { useStudentStore } from '@/stores/useStudentStore';
import { mockCreateProfile } from '@/api/mocks/profileMock';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, User, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const StepReview: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { data } = useOnboardingStore();
  const { actions: studentActions } = useStudentStore();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const planDetails = {
    'ai-only': 'AI-Only Plan',
    'tutor-lite': 'Tutor-Lite Plan',
    'tutor-plus': 'Tutor-Plus Plan'
  };

  const handleCreateAccount = async () => {
    setIsCreating(true);
    try {
      const profile = await mockCreateProfile(data);
      studentActions.setProfile(profile);
      
      toast.success('Welcome to ThinkBridge! Your profile has been created.');
      navigate('/student');
    } catch (error) {
      toast.error('There was an error creating your profile. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Review Your Profile
        </h2>
        <p className="text-slate-600">
          Please review your information before creating your account.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Plan:</span>
                <Badge variant="default">{planDetails[data.plan!]}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Age:</span>
                <span className="font-medium">{data.age}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Grade:</span>
                <span className="font-medium">{data.grade}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Timezone:</span>
                <span className="font-medium text-sm">{data.timezone}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="h-5 w-5 mr-2" />
                Learning Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-slate-600 block mb-1">Subjects:</span>
                <div className="flex flex-wrap gap-1">
                  {data.subjects?.map((subject) => (
                    <Badge key={subject} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Study Hours:</span>
                <span className="font-medium">{data.weeklyStudyHours}h/week</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Target className="h-5 w-5 mr-2" />
              Learning Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700">{data.learningGoals}</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <TrendingUp className="h-5 w-5 mr-2" />
              Skill Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {data.skillLevels && Object.entries(data.skillLevels).map(([subject, level]) => (
                <div key={subject} className="flex justify-between items-center">
                  <span className="text-slate-600">{subject}:</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i <= level ? 'bg-indigo-500' : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      {level === 1 ? 'Beginner' :
                       level === 2 ? 'Basic' :
                       level === 3 ? 'Intermediate' :
                       level === 4 ? 'Advanced' : 'Expert'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={handleCreateAccount}
          disabled={isCreating}
          className="px-8"
        >
          {isCreating ? 'Creating Account...' : 'Confirm & Create Account'}
        </Button>
      </div>
    </div>
  );
};

export default StepReview;
