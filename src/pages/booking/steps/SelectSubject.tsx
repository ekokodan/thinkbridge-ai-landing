
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Book, Languages, Calculator, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchSubjects } from '@/api/booking';
import { useBookingStore } from '@/stores/useBookingStore';

const getSubjectIcon = (iconName: string) => {
  switch (iconName) {
    case 'book-open':
      return <Book className="h-8 w-8" />;
    case 'languages':
      return <Languages className="h-8 w-8" />;
    case 'calculator':
      return <Calculator className="h-8 w-8" />;
    case 'code':
      return <Code className="h-8 w-8" />;
    default:
      return <Book className="h-8 w-8" />;
  }
};

const SelectSubject = () => {
  const navigate = useNavigate();
  const { selectedSubjectId, selectSubject } = useBookingStore();
  
  const { data: subjects, isLoading } = useQuery({
    queryKey: ['subjects'],
    queryFn: fetchSubjects
  });
  
  const handleContinue = () => {
    if (selectedSubjectId) {
      navigate('/book/plan');
    }
  };
  
  // Pre-select subject if only one is available
  useEffect(() => {
    if (subjects?.length === 1 && !selectedSubjectId) {
      selectSubject(subjects[0].id);
    }
  }, [subjects, selectedSubjectId, selectSubject]);
  
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
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <div className="w-10 h-10 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select a Subject</h2>
      <p className="text-muted-foreground mb-8">
        Choose the subject you'd like to get tutoring for
      </p>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {subjects?.map((subject) => (
          <motion.div key={subject.id} variants={item}>
            <Card 
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedSubjectId === subject.id ? 'border-thinkbridge-600 shadow-md' : ''
              }`}
              onClick={() => selectSubject(subject.id)}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`
                  w-16 h-16 rounded-full flex items-center justify-center mb-4
                  ${selectedSubjectId === subject.id ? 'bg-thinkbridge-100 text-thinkbridge-600' : 'bg-slate-100 text-slate-600'}
                `}>
                  {getSubjectIcon(subject.icon)}
                </div>
                <h3 className="text-lg font-semibold mb-2">{subject.name}</h3>
                <p className="text-muted-foreground text-sm">{subject.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-12 flex justify-end">
        <Button 
          onClick={handleContinue} 
          disabled={!selectedSubjectId}
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default SelectSubject;
