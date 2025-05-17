
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTAFooter = () => {
  return (
    <section className="py-20 px-4 bg-thinkbridge-600 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to transform your learning experience?
        </motion.h2>
        
        <motion.p 
          className="text-lg text-thinkbridge-100 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join our waitlist to be the first to experience ThinkBridge's personalized learning platform or book a session with one of our expert tutors today.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button asChild size="lg" variant="secondary" className="text-lg px-8">
            <Link to="/waitlist">Join Waitlist</Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent text-white border-white hover:bg-white hover:text-thinkbridge-600">
            <Link to="/book">Book Lesson</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CTAFooter;
