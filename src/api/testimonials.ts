
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
}

export const fetchTestimonials = (): Promise<Testimonial[]> => {
  // This would be a real API call in production
  return Promise.resolve([
    {
      id: "1",
      name: "Alex Johnson",
      role: "High School Student",
      quote: "ThinkBridge helped me improve my math grade from a C to an A in just two months. The personalized approach made all the difference.",
    },
    {
      id: "2",
      name: "Sarah Williams",
      role: "Parent",
      quote: "My daughter struggled with reading comprehension until we found ThinkBridge. The AI tutor's patience and adaptability has been a game-changer for her confidence.",
    },
    {
      id: "3",
      name: "Michael Chen",
      role: "College Student",
      quote: "Studying for my computer science degree became so much easier with ThinkBridge. The Python tutoring is exceptional - clear explanations and practical exercises.",
    },
    {
      id: "4",
      name: "Dr. Emily Rodriguez",
      role: "Education Researcher",
      quote: "The data-driven approach of ThinkBridge represents the future of education. Their progress tracking tools provide invaluable insights for both students and educators.",
    },
  ]);
};
