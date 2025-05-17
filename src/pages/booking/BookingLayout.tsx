
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BookingLayoutProps {
  children: ReactNode;
}

// Define the steps in the booking process
const steps = [
  { path: '/book/subject', label: 'Select Subject' },
  { path: '/book/plan', label: 'Choose Plan' },
  { path: '/book/schedule', label: 'Pick Date & Time' },
  { path: '/book/review', label: 'Review & Pay' }
];

const BookingLayout = ({ children }: BookingLayoutProps) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const currentStepIndex = steps.findIndex(step => step.path === currentPath);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Book Your Tutoring Session</h1>
        
        {/* Progress bar - hidden on confirmation page */}
        {!currentPath.includes('confirmation') && (
          <div className="mb-8">
            {/* Mobile step indicator */}
            <div className="md:hidden text-center mb-4">
              <p className="text-lg font-medium">
                Step {currentStepIndex + 1} of {steps.length}
              </p>
              <p className="text-muted-foreground">{steps[currentStepIndex]?.label || ''}</p>
            </div>
            
            {/* Desktop step indicator */}
            <div className="hidden md:flex items-center justify-between">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="flex items-center"
                  aria-current={currentPath === step.path ? 'step' : undefined}
                >
                  {/* Step number circle */}
                  <div className={`
                    h-10 w-10 rounded-full flex items-center justify-center mr-2
                    ${currentStepIndex >= index 
                      ? 'bg-thinkbridge-600 text-white' 
                      : 'bg-slate-200 text-slate-600'}
                  `}>
                    {index + 1}
                  </div>
                  
                  {/* Step label */}
                  <span className={`
                    text-sm font-medium
                    ${currentStepIndex >= index ? 'text-foreground' : 'text-muted-foreground'}
                  `}>
                    {step.label}
                  </span>
                  
                  {/* Connector line between steps */}
                  {index < steps.length - 1 && (
                    <div className="flex-grow mx-4 h-[2px] bg-slate-200">
                      <div 
                        className="h-full bg-thinkbridge-600 transition-all duration-300"
                        style={{ 
                          width: currentStepIndex > index ? '100%' : '0%'
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main content area with page transition */}
      <motion.div
        key={currentPath}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-white shadow-md rounded-xl p-6 md:p-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default BookingLayout;
