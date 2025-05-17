
export interface WaitlistFormData {
  email: string;
  name: string;
  role: 'student' | 'parent' | 'teacher' | 'other';
  subjects: string[];
  preferredPlan: 'ai' | 'tutor-ai';
  consent: boolean;
}

export const submitWaitlistForm = async (data: WaitlistFormData): Promise<{success: boolean, message: string}> => {
  console.log("Waitlist form submission data:", data);
  
  // Simulate network request delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate successful API response
  return {
    success: true,
    message: "Thank you for joining our waitlist! We'll be in touch soon."
  };
};

export const fetchWaitlistTestimonials = async (): Promise<{id: string; quote: string; author: string; role: string}[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: "wt1",
      quote: "Being on the waitlist gave me early access to ThinkBridge. The combination of AI and human tutors has transformed my learning experience.",
      author: "Sarah K.",
      role: "High School Student"
    },
    {
      id: "wt2",
      quote: "As a parent, I appreciate how ThinkBridge adapts to my child's learning style. The early access was worth the wait!",
      author: "Michael T.",
      role: "Parent of Middle School Student"
    },
    {
      id: "wt3",
      quote: "I joined the waitlist after struggling with traditional tutoring. ThinkBridge's AI analysis of my weak areas helped me improve rapidly.",
      author: "Jamie L.",
      role: "College Freshman"
    }
  ];
};
