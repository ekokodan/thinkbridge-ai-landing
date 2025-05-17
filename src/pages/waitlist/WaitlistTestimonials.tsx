
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchWaitlistTestimonials } from '@/api/waitlist';
import { Card, CardContent } from '@/components/ui/card';

const WaitlistTestimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['waitlist-testimonials'],
    queryFn: fetchWaitlistTestimonials,
  });

  useEffect(() => {
    if (!testimonials?.length) return;
    
    // Auto advance testimonial carousel every 6 seconds
    const interval = setInterval(() => {
      setActiveIndex((current) => 
        current === testimonials.length - 1 ? 0 : current + 1
      );
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials?.length]);

  if (isLoading || !testimonials?.length) {
    return (
      <div className="h-full flex items-center justify-center py-16">
        <div className="w-10 h-10 border-4 border-thinkbridge-300 border-t-thinkbridge-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="lg:sticky lg:top-24">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-2">What Our Users Say</h2>
          <p className="text-muted-foreground">
            Discover how ThinkBridge is transforming the learning experience for students and parents worldwide.
          </p>
        </div>
        
        <div className="relative h-[320px]">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              activeIndex === index && (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute w-full"
                >
                  <Card className="border-thinkbridge-200 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex flex-col h-full">
                        <blockquote className="text-lg italic mb-8">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="mt-auto">
                          <div className="font-semibold">{testimonial.author}</div>
                          <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  activeIndex === index ? "w-8 bg-thinkbridge-600" : "w-2 bg-thinkbridge-300"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitlistTestimonials;
