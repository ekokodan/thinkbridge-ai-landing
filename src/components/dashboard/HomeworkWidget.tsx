import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Homework } from '@/api/mocks/studentDataMock';

interface HomeworkWidgetProps {
  homework: Homework[] | undefined;
  isLoading: boolean;
}

const HomeworkWidget: React.FC<HomeworkWidgetProps> = ({ homework, isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Homework & Tasks
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

  const pendingHomework = homework?.filter(item => !item.completed) || [];
  const completedHomework = homework?.filter(item => item.completed) || [];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Homework & Tasks
          {pendingHomework.length > 0 && (
            <Badge variant="outline">{pendingHomework.length} pending</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pendingHomework.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
            <p>All caught up! No pending homework.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingHomework.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <Badge variant={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600">{item.subject}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3 text-orange-500" />
                    <span className="text-xs text-slate-500">Due {item.dueDate}</span>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Start
                </Button>
              </div>
            ))}
            
            {pendingHomework.length > 3 && (
              <Button variant="ghost" className="w-full mt-3">
                View All ({pendingHomework.length} total)
              </Button>
            )}
          </div>
        )}
        
        {completedHomework.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-slate-600 mb-2">
              Recently completed ({completedHomework.length})
            </p>
            <div className="space-y-2">
              {completedHomework.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HomeworkWidget;
