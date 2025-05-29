
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LessonCredit } from '@/stores/useStudentStore';
import { Calendar, Clock, Users } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface CreditsWidgetProps {
  credits: LessonCredit[] | undefined;
  isLoading: boolean;
}

const CreditsWidget: React.FC<CreditsWidgetProps> = ({ credits, isLoading }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai-session': return <Clock className="h-4 w-4" />;
      case 'tutor-session': return <Users className="h-4 w-4" />;
      case 'group-session': return <Users className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'ai-session': return 'AI Sessions';
      case 'tutor-session': return 'Tutor Sessions';
      case 'group-session': return 'Group Sessions';
      default: return type;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Lesson Credits
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!credits || credits.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Lesson Credits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-500 text-center py-4">
            No lesson credits available
          </p>
          <Button className="w-full">
            Purchase Credits
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Lesson Credits
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {credits.map((credit, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getTypeIcon(credit.type)}
                <span className="font-medium text-sm">
                  {getTypeLabel(credit.type)}
                </span>
              </div>
              <Badge variant={credit.remaining > 0 ? "default" : "secondary"}>
                {credit.remaining}/{credit.total}
              </Badge>
            </div>
            
            <Progress 
              value={(credit.remaining / credit.total) * 100} 
              className="h-2"
            />
            
            <div className="flex justify-between text-xs text-slate-500">
              <span>{credit.remaining} remaining</span>
              <span>
                Expires {format(parseISO(credit.expiryDate), 'MMM dd')}
              </span>
            </div>
          </div>
        ))}
        
        <Button className="w-full mt-4">
          Book a Session
        </Button>
      </CardContent>
    </Card>
  );
};

export default CreditsWidget;
