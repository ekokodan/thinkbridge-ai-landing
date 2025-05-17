
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { submitWaitlistForm, type WaitlistFormData } from '@/api/waitlist';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Define available subjects
const SUBJECTS = [
  { id: 'math', label: 'Mathematics' },
  { id: 'english', label: 'English' },
  { id: 'science', label: 'Science' },
  { id: 'history', label: 'History' },
  { id: 'french', label: 'French' },
  { id: 'python', label: 'Python' },
  { id: 'ai', label: 'AI Basics' },
];

// Define form validation schema
const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['student', 'parent', 'teacher', 'other'], {
    required_error: 'Please select your role',
  }),
  subjects: z.array(z.string()).min(1, 'Please select at least one subject'),
  preferredPlan: z.enum(['ai', 'tutor-ai'], {
    required_error: 'Please select a preferred plan',
  }),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the terms' }),
  }),
});

// Make sure this type exactly matches the schema above
type WaitlistFormValues = z.infer<typeof formSchema>;

const WaitlistForm = () => {
  const [submitted, setSubmitted] = useState(false);

  // Initialize form
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      role: 'student',
      subjects: [],
      preferredPlan: 'ai',
      consent: false as unknown as true, // We'll validate it to be true with our schema
    },
  });

  // Setup mutation for form submission
  const mutation = useMutation({
    mutationFn: (data: WaitlistFormData) => submitWaitlistForm(data),
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  // Handle form submission
  function onSubmit(values: WaitlistFormValues) {
    // At this point, values will have all required fields because of the schema validation
    mutation.mutate(values as WaitlistFormData);
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-md">
      {submitted ? (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-green-100 mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Thank you for joining our waitlist!</h2>
          <p className="text-muted-foreground mb-6">
            We'll send you updates about ThinkBridge and notify you when early access becomes available.
          </p>
          <Button 
            onClick={() => setSubmitted(false)}
            variant="outline"
          >
            Submit Another Response
          </Button>
        </motion.div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">Join Our Waitlist</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="your@email.com" 
                        type="email" 
                        autoComplete="email"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        autoComplete="name"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>I am a</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        {...field}
                      >
                        <option value="student">Student</option>
                        <option value="parent">Parent</option>
                        <option value="teacher">Teacher</option>
                        <option value="other">Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-3">
                <FormLabel>Subjects of Interest</FormLabel>
                <div className="flex flex-wrap gap-2">
                  <Controller
                    control={form.control}
                    name="subjects"
                    render={({ field }) => (
                      <>
                        {SUBJECTS.map((subject) => (
                          <label
                            key={subject.id}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm cursor-pointer transition-colors
                              ${
                                field.value.includes(subject.id)
                                  ? 'bg-thinkbridge-600 text-white'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }
                            `}
                          >
                            <input
                              type="checkbox"
                              className="sr-only"
                              value={subject.id}
                              checked={field.value.includes(subject.id)}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                if (checked) {
                                  field.onChange([...field.value, subject.id]);
                                } else {
                                  field.onChange(
                                    field.value.filter((val) => val !== subject.id)
                                  );
                                }
                              }}
                            />
                            {subject.label}
                          </label>
                        ))}
                      </>
                    )}
                  />
                </div>
                {form.formState.errors.subjects && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.subjects.message}
                  </p>
                )}
              </div>
              
              <FormField
                control={form.control}
                name="preferredPlan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Plan</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label
                        className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                          field.value === 'ai' ? 'border-thinkbridge-600 bg-thinkbridge-50' : 'border-input'
                        }`}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value="ai"
                          checked={field.value === 'ai'}
                          onChange={() => field.onChange('ai')}
                        />
                        <div className="font-medium mb-1">AI Only</div>
                        <div className="text-sm text-muted-foreground">
                          AI-powered tutoring without live sessions
                        </div>
                      </label>
                      
                      <label
                        className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                          field.value === 'tutor-ai' ? 'border-thinkbridge-600 bg-thinkbridge-50' : 'border-input'
                        }`}
                      >
                        <input
                          type="radio"
                          className="sr-only"
                          value="tutor-ai"
                          checked={field.value === 'tutor-ai'}
                          onChange={() => field.onChange('tutor-ai')}
                        />
                        <div className="font-medium mb-1">Tutor + AI</div>
                        <div className="text-sm text-muted-foreground">
                          Live tutoring sessions with AI support
                        </div>
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to receive emails about ThinkBridge and understand I can unsubscribe at any time.
                      </FormLabel>
                      <FormDescription>
                        We respect your privacy and will never share your information.
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {mutation.isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    There was a problem submitting your information. Please try again.
                  </AlertDescription>
                </Alert>
              )}
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                    Submitting...
                  </>
                ) : (
                  'Join Waitlist'
                )}
              </Button>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default WaitlistForm;
