import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, User, Video } from 'lucide-react';
import { UpcomingSession } from '@/api/mocks/studentDataMock';

interface SessionsWidgetProps {
  sessions: UpcomingSession[] | undefined;
  isLoading: boolean;
}

const SessionsWidget: React.FC<SessionsWidgetProps> = ({ sessions, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  const upcomingSessions = sessions || [];

  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'in-person': return User;
      default: return Calendar;
    }
  };

  const getSessionTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'default';
      case 'in-person': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Upcoming Sessions
          {upcomingSessions.length > 0 && (
            <Badge variant="outline">{upcomingSessions.length}</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {upcomingSessions.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-slate-400" />
            <p>No upcoming sessions scheduled.</p>
            <Button variant="outline" className="mt-3">
              Book a Session
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingSessions.slice(0, 3).map((session) => {
              const SessionIcon = getSessionTypeIcon(session.type);
              
              return (
                <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{session.subject}</h4>
                      <Badge variant={getSessionTypeColor(session.type)}>
                        <SessionIcon className="h-3 w-3 mr-1" />
                        {session.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-600 mb-1">with {session.tutorName}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Join
                  </Button>
                </div>
              );
            })}
            
            {upcomingSessions.length > 3 && (
              <Button variant="ghost" className="w-full mt-3">
                View All Sessions
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionsWidget;
