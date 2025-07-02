
import React, { useState } from 'react';
import { PracticeQuestion, UserProgress } from '@/types/materialCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X, HelpCircle, Clock } from 'lucide-react';

interface PracticePanelProps {
  question: PracticeQuestion;
  userProgress: UserProgress;
  onAnswerSubmitted: (payload: { answer: string; isCorrect: boolean }) => void;
  estimatedTime?: number;
}

const PracticePanel: React.FC<PracticePanelProps> = ({
  question,
  userProgress,
  onAnswerSubmitted,
  estimatedTime
}) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = () => {
    const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toString().toLowerCase().trim();
    
    if (isCorrect) {
      setFeedback('correct');
      // Add confetti effect here if needed
    } else {
      setFeedback('incorrect');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 240);
    }
    
    onAnswerSubmitted({ answer, isCorrect });
  };

  const handleHint = () => {
    setShowHint(true);
  };

  const renderInput = () => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <RadioGroup value={answer} onValueChange={setAnswer}>
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      case 'numeric':
        return (
          <Input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your answer..."
            className={isShaking ? 'animate-pulse border-red-500' : ''}
          />
        );
      case 'expression':
        return (
          <Input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter mathematical expression..."
            className={`font-mono ${isShaking ? 'animate-pulse border-red-500' : ''}`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Practice</h3>
          {estimatedTime && (
            <div className="flex items-center gap-1 text-sm text-slate-600">
              <Clock className="w-4 h-4" />
              <span>{estimatedTime}min</span>
            </div>
          )}
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Attempts:</span>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < userProgress.attempts ? 'bg-blue-500' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-slate-600">
            {userProgress.attempts}/5 tries
          </span>
        </div>

        {/* Question */}
        <div className="space-y-4">
          <div 
            className="text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: question.question }}
          />
          
          {renderInput()}
        </div>

        {/* Hint */}
        {showHint && question.hint && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <p className="text-amber-800">{question.hint}</p>
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className={`p-4 rounded-lg flex items-center gap-2 ${
            feedback === 'correct' 
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {feedback === 'correct' ? (
              <>
                <Check className="w-5 h-5" />
                <span>Correct! Well done.</span>
              </>
            ) : (
              <>
                <X className="w-5 h-5" />
                <span>Not quite right. Try again!</span>
              </>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={handleSubmit}
            disabled={!answer || feedback === 'correct'}
            className="flex-1"
          >
            Submit
          </Button>
          <Button
            variant="secondary"
            onClick={handleHint}
            disabled={showHint}
          >
            Hint
          </Button>
        </div>

        {feedback === 'correct' && (
          <Button className="w-full" variant="outline">
            Next Question
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PracticePanel;
