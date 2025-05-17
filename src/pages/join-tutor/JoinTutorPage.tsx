
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  education: z.string().min(10, {
    message: "Please provide details about your education.",
  }),
  expertise: z.string().min(10, {
    message: "Please share your areas of expertise.",
  }),
  experience: z.string().min(10, {
    message: "Please describe your teaching experience.",
  }),
  availability: z.string().min(5, {
    message: "Please indicate your availability.",
  }),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions." }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const benefits = [
  {
    title: "Flexible Schedule",
    description: "Set your own hours and work as much or as little as you want.",
    icon: "⏰"
  },
  {
    title: "Competitive Pay",
    description: "Earn competitive rates based on your expertise and experience.",
    icon: "💰"
  },
  {
    title: "Global Reach",
    description: "Connect with students from around the world.",
    icon: "🌎"
  },
  {
    title: "Advanced Platform",
    description: "Utilize our AI-powered tools to enhance your teaching.",
    icon: "🤖"
  },
  {
    title: "Professional Growth",
    description: "Access professional development resources and a community of educators.",
    icon: "📈"
  },
  {
    title: "Impact Lives",
    description: "Make a meaningful difference in students' academic journeys.",
    icon: "✨"
  }
];

const JoinTutorPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      education: "",
      expertise: "",
      experience: "",
      availability: "",
      agreeTerms: false,
    },
  });

  function onSubmit(data: FormValues) {
    console.log(data);
    setIsSubmitted(true);
    toast({
      title: "Application Submitted",
      description: "Thank you for your interest in joining ThinkBridge as a tutor!",
    });
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-foreground mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Join Our Tutor Network
              </motion.h1>
              <motion.p 
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Share your expertise and help students around the world achieve their academic goals.
              </motion.p>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Become a ThinkBridge Tutor?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join our community of passionate educators and enjoy these benefits while making a difference.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={benefit.title}
                    className="bg-white p-8 rounded-xl shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-4xl mb-4">{benefit.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Application Form */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Apply to Join</h2>
                <p className="text-muted-foreground">
                  Fill out the form below to start your application process. Our team will review your information 
                  and get back to you within 48 hours.
                </p>
              </div>
              
              {isSubmitted ? (
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Application Submitted!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for your interest in joining ThinkBridge as a tutor. We'll review your application and reach out to you soon.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Submit Another Application</Button>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="you@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="education"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Educational Background</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please list your degrees, institutions, and years of graduation"
                                {...field}
                                className="min-h-[100px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="expertise"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Areas of Expertise</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="List the subjects you're qualified to teach"
                                {...field}
                                className="min-h-[100px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="experience"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teaching Experience</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your past teaching or tutoring experience"
                                {...field}
                                className="min-h-[100px]"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Weekly Availability</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="E.g., Weekdays 6-9pm, Weekends 10am-4pm" 
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="agreeTerms"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel>
                                I agree to the terms and conditions, including background checks and verification of my credentials
                              </FormLabel>
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      
                      <Button type="submit" className="w-full" size="lg">
                        Submit Application
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">What Our Tutors Say</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Hear from tutors who are already part of our global community.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Dr. Maria Rodriguez",
                    role: "Mathematics Tutor",
                    quote: "Joining ThinkBridge was one of the best career decisions I've made. The platform is intuitive, the students are engaged, and the AI tools help me provide better instruction.",
                    image: "https://randomuser.me/api/portraits/women/45.jpg"
                  },
                  {
                    name: "James Wilson",
                    role: "Computer Science Tutor",
                    quote: "I love the flexibility ThinkBridge provides. I can teach students from across the globe while maintaining my full-time job in the tech industry.",
                    image: "https://randomuser.me/api/portraits/men/32.jpg"
                  },
                  {
                    name: "Sarah Chen",
                    role: "Language Tutor",
                    quote: "The professional development opportunities at ThinkBridge have helped me grow as an educator. The community of fellow tutors is supportive and collaborative.",
                    image: "https://randomuser.me/api/portraits/women/68.jpg"
                  }
                ].map((testimonial, index) => (
                  <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              </div>
              
              <div className="space-y-6">
                {[
                  {
                    question: "What qualifications do I need to become a tutor?",
                    answer: "We typically require tutors to have at least a bachelor's degree in their subject area or significant professional experience. For some specialized subjects, additional certifications may be needed."
                  },
                  {
                    question: "How does payment work?",
                    answer: "Tutors are paid bi-weekly through direct deposit or PayPal. Rates vary based on subject expertise, experience level, and session type."
                  },
                  {
                    question: "What technology do I need?",
                    answer: "You'll need a reliable computer with a webcam, a stable internet connection, and a quiet space for conducting sessions. We provide all the necessary teaching software."
                  },
                  {
                    question: "How many hours do I need to commit?",
                    answer: "We're flexible with scheduling. Some tutors work as few as 5 hours per week, while others choose to tutor full-time. You can set your own availability."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 text-center">
                <p className="mb-6">Still have questions?</p>
                <Button variant="outline" asChild>
                  <a href="mailto:tutors@thinkbridge.com">Contact Tutor Support</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default JoinTutorPage;
