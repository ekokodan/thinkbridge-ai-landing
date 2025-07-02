
import React, { useState } from 'react';
import { MaterialComponentProps } from '@/types/materialCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronLeft, ChevronRight, Menu, RotateCcw } from 'lucide-react';
import BlockRenderer from './BlockRenderer';
import ExampleAccordion from './ExampleAccordion';
import PracticePanel from './PracticePanel';

const MaterialComponent: React.FC<MaterialComponentProps> = ({
  card,
  userProgress,
  onAnswerSubmitted,
  onCardComplete,
  onNavigate
}) => {
  const [isPracticePanelOpen, setIsPracticePanelOpen] = useState(false);
  
  const progressPercentage = (card.stepNumber / card.totalSteps) * 100;
  const canNavigateNext = userProgress.masteryStatus === 'mastered' || userProgress.accuracyPct >= 80;

  const getMasteryStatusColor = () => {
    switch (userProgress.masteryStatus) {
      case 'mastered': return 'text-green-600';
      case 'active': return 'text-blue-600';
      case 'locked': return 'text-slate-400';
      default: return 'text-slate-600';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'h' || e.key === 'H') {
      // Trigger hint in practice panel
    }
    if (e.ctrlKey && e.key === 'Enter') {
      // Submit answer in practice panel
    }
  };

  return (
    <div className="min-h-screen bg-slate-50" onKeyDown={handleKeyPress} tabIndex={0}>
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="space-y-4">
                <h2 className="font-semibold">{card.moduleTitle}</h2>
                <div className="text-sm text-slate-600">
                  Step {card.stepNumber} of {card.totalSteps}
                </div>
                <Progress value={progressPercentage} className="w-full" />
              </div>
            </SheetContent>
          </Sheet>
          
          <h1 className="text-lg font-semibold text-center flex-1">{card.title}</h1>
          
          {card.practice && (
            <Sheet open={isPracticePanelOpen} onOpenChange={setIsPracticePanelOpen}>
              <SheetTrigger asChild>
                <Button size="sm">Practice</Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <PracticePanel
                  question={card.practice}
                  userProgress={userProgress}
                  onAnswerSubmitted={onAnswerSubmitted}
                  estimatedTime={card.estimatedTime}
                />
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Left Sidebar - Hidden on mobile */}
        <div className="hidden lg:block w-64 bg-white border-r sticky top-0 h-screen">
          <div className="p-6 border-b">
            <h2 className="font-semibold text-lg mb-2">{card.moduleTitle}</h2>
            <div className="text-sm text-slate-600 mb-3">
              Step {card.stepNumber} of {card.totalSteps}
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>
          
          <div className="p-4">
            <div className={`text-sm font-medium ${getMasteryStatusColor()}`}>
              Status: {userProgress.masteryStatus}
            </div>
            <div className="text-sm text-slate-600 mt-1">
              Accuracy: {userProgress.accuracyPct}%
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:flex">
          {/* Reading Pane */}
          <div className="flex-1 lg:max-w-none p-6 lg:p-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{card.title}</span>
                  <div className="text-sm text-slate-500 font-normal">
                    {card.estimatedTime} min read
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <BlockRenderer blocks={card.body} />
                <ExampleAccordion examples={card.examples} />
              </CardContent>
            </Card>

            {/* Mobile Navigation */}
            <div className="lg:hidden mt-6 flex justify-between items-center bg-white p-4 rounded-lg border sticky bottom-4">
              <Button
                variant="outline"
                onClick={() => onNavigate('prev')}
                disabled={card.stepNumber === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                variant="outline"
                onClick={() => onNavigate('recommended')}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Review
              </Button>
              
              <Button
                onClick={() => onNavigate('next')}
                disabled={!canNavigateNext}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Right Rail - Practice Panel (Desktop only) */}
          {card.practice && (
            <div className="hidden lg:block w-96 p-6 sticky top-0 h-screen overflow-y-auto">
              <PracticePanel
                question={card.practice}
                userProgress={userProgress}
                onAnswerSubmitted={onAnswerSubmitted}
                estimatedTime={card.estimatedTime}
              />
              
              {/* Desktop Navigation */}
              <div className="mt-6 space-y-3">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => onNavigate('prev')}
                    disabled={card.stepNumber === 1}
                    className="flex-1"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Previous
                  </Button>
                  
                  <Button
                    onClick={() => onNavigate('next')}
                    disabled={!canNavigateNext}
                    className="flex-1"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => onNavigate('recommended')}
                  className="w-full"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Review
                </Button>
                
                <Button
                  onClick={() => onCardComplete(userProgress.masteryStatus)}
                  disabled={userProgress.masteryStatus !== 'mastered'}
                  className="w-full"
                >
                  Complete Card
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaterialComponent;
