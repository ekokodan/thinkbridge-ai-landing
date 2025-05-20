
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useProgressStore } from '@/stores/useProgressStore';
import { Practice, Question } from '@/api/courses';

interface QuizModalProps {
  practice: Practice;
  isOpen: boolean;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ practice, isOpen, onClose }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<{ correct: number, total: number } | null>(null);
  
  const { actions } = useProgressStore();
  
  const currentQuestion = practice.questions[currentQuestionIndex];
  
  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    setFeedback(null);
    setShowHint(false);
  };
  
  const checkAnswer = () => {
    const answer = answers[currentQuestion.id] || '';
    const isCorrect = Array.isArray(currentQuestion.correctAnswer) 
      ? currentQuestion.correctAnswer.includes(answer)
      : answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    
    setFeedback(isCorrect ? 'correct' : 'incorrect');
    return isCorrect;
  };
  
  const handleNext = () => {
    const isLastQuestion = currentQuestionIndex === practice.questions.length - 1;
    
    if (isLastQuestion) {
      // Count correct answers
      const correctAnswers = practice.questions.reduce((count, question) => {
        const userAnswer = answers[question.id] || '';
        const isCorrect = Array.isArray(question.correctAnswer)
          ? question.correctAnswer.includes(userAnswer)
          : userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
        
        return isCorrect ? count + 1 : count;
      }, 0);
      
      // Calculate score percentage
      const score = Math.round((correctAnswers / practice.questions.length) * 100);
      
      // Set results
      setResults({ correct: correctAnswers, total: practice.questions.length });
      setIsSubmitted(true);
      
      // Update progress store
      actions.updateQuizProgress(practice.id, score);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFeedback(null);
      setShowHint(false);
    }
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setFeedback(null);
    setShowHint(false);
    setIsSubmitted(false);
    setResults(null);
  };
  
  const handleCloseComplete = () => {
    resetQuiz();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleCloseComplete}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{practice.title}</DialogTitle>
        </DialogHeader>
        
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-4"
            >
              <div className="text-center py-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                  results && results.correct / results.total >= 0.7
                    ? 'bg-green-100 text-green-600'
                    : 'bg-amber-100 text-amber-600'
                }`}>
                  <span className="text-2xl font-bold">
                    {results?.correct}/{results?.total}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2">
                  {results && results.correct / results.total >= 0.7
                    ? 'Great job!'
                    : 'Keep practicing!'
                  }
                </h3>
                <p className="text-gray-600">
                  You answered {results?.correct} out of {results?.total} questions correctly.
                </p>
                <p className="text-gray-600 mt-2">
                  Score: {results ? Math.round((results.correct / results.total) * 100) : 0}%
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="py-4"
            >
              <div className="mb-4 flex justify-between text-sm text-gray-500">
                <span>Question {currentQuestionIndex + 1} of {practice.questions.length}</span>
                {currentQuestion.type === 'multiple-choice' && <span>Multiple choice</span>}
                {currentQuestion.type === 'short-answer' && <span>Short answer</span>}
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-lg mb-4">{currentQuestion.text}</h3>
                
                {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                  <RadioGroup
                    value={answers[currentQuestion.id] || ''}
                    onValueChange={handleAnswerChange}
                    disabled={feedback !== null}
                  >
                    {currentQuestion.options.map((option) => (
                      <div key={option} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={option} id={`option-${option}`} />
                        <Label htmlFor={`option-${option}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
                
                {currentQuestion.type === 'short-answer' && (
                  <Input
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder="Enter your answer"
                    disabled={feedback !== null}
                  />
                )}
              </div>
              
              {feedback && (
                <Alert 
                  className={feedback === 'correct' ? 'bg-green-50' : 'bg-red-50'}
                  aria-live="polite"
                >
                  <div className={`p-2 rounded-full mr-2 ${
                    feedback === 'correct' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {feedback === 'correct' ? <Check size={16} /> : <X size={16} />}
                  </div>
                  <AlertDescription>
                    {feedback === 'correct' 
                      ? 'Correct! Well done.' 
                      : <div>
                          <p>Not quite. The correct answer is:</p>
                          <p className="font-medium mt-1">
                            {Array.isArray(currentQuestion.correctAnswer) 
                              ? currentQuestion.correctAnswer.join(' or ') 
                              : currentQuestion.correctAnswer}
                          </p>
                        </div>
                    }
                  </AlertDescription>
                </Alert>
              )}
              
              {showHint && currentQuestion.hint && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
                  <p className="font-medium mb-1">Hint:</p>
                  <p>{currentQuestion.hint}</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        
        <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-2">
          {isSubmitted ? (
            <Button onClick={resetQuiz}>Try Again</Button>
          ) : (
            <div className="flex flex-col sm:flex-row sm:justify-between w-full gap-2">
              {!feedback && (
                <Button 
                  variant="outline" 
                  onClick={() => setShowHint(true)}
                  disabled={!currentQuestion.hint || showHint}
                  className="flex items-center gap-2"
                >
                  <HelpCircle size={16} />
                  Need a hint?
                </Button>
              )}
              
              <div className="flex gap-2 sm:ml-auto">
                {feedback ? (
                  <Button onClick={handleNext}>
                    {currentQuestionIndex === practice.questions.length - 1
                      ? 'See Results'
                      : 'Next Question'}
                  </Button>
                ) : (
                  <Button 
                    onClick={checkAnswer}
                    disabled={!answers[currentQuestion.id]}
                  >
                    Check Answer
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;
