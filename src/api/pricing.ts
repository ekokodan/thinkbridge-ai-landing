export interface PricingPlan {
  id: string;
  title: string;
  price: number;
  billing: 'monthly' | 'yearly' | 'per-class';
  description: string;
  features: string[];
  isPopular?: boolean;
  tutorHours?: number;
  ctaText: string;
  classes?: number;
}

export interface PricingFeatureComparison {
  feature: string;
  aiBasic: string | boolean;
  tutorLite: string | boolean;
  tutorPlus: string | boolean;
  tutorOnly?: string | boolean;
}

export const fetchPricingPlans = async (): Promise<PricingPlan[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: "tutor-only",
      title: "Tutor Only",
      price: 35,
      billing: "per-class",
      description: "Pure tutoring experience without AI features",
      features: [
        "Live sessions with expert tutors",
        "Choose bundle size (5, 10, 15, or 20 classes)",
        "Personalized feedback",
        "Homework help",
        "Exam preparation"
      ],
      ctaText: "Get Tutor Only"
    },
    {
      id: "ai-basic",
      title: "AI Basic",
      price: 29,
      billing: "monthly",
      description: "AI-powered tutoring for self-paced learners",
      features: [
        "Unlimited AI chat support",
        "Adaptive learning paths",
        "Progress tracking",
        "Practice problems",
        "Basic explanations"
      ],
      ctaText: "Start with AI"
    },
    {
      id: "tutor-lite",
      title: "Tutor Lite",
      price: 119,
      billing: "monthly",
      description: "Limited live sessions with expert tutors plus AI support",
      features: [
        "Everything in AI Basic",
        "4 hours with live tutors per month",
        "Personalized feedback",
        "Homework help",
        "Exam preparation"
      ],
      tutorHours: 4,
      isPopular: true,
      ctaText: "Get Tutor Lite"
    },
    {
      id: "tutor-plus",
      title: "Tutor Plus",
      price: 219,
      billing: "monthly",
      description: "Comprehensive tutoring with priority live session access",
      features: [
        "Everything in Tutor Lite",
        "8 hours with live tutors per month",
        "Priority scheduling",
        "Advanced topic coverage",
        "Project-based learning",
        "Priority support"
      ],
      tutorHours: 8,
      ctaText: "Get Tutor Plus"
    }
  ];
};

export const fetchFeatureComparison = async (): Promise<PricingFeatureComparison[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
    {
      feature: "AI Chat Support",
      aiBasic: "Unlimited",
      tutorLite: "Unlimited",
      tutorPlus: "Priority Unlimited",
      tutorOnly: false
    },
    {
      feature: "Adaptive Lessons",
      aiBasic: "Basic",
      tutorLite: "Advanced",
      tutorPlus: "Premium",
      tutorOnly: false
    },
    {
      feature: "Live Tutoring Sessions",
      aiBasic: false,
      tutorLite: "4 hrs/month",
      tutorPlus: "8 hrs/month",
      tutorOnly: "Pay per class"
    },
    {
      feature: "Custom Study Plans",
      aiBasic: "AI-generated",
      tutorLite: "Tutor-reviewed",
      tutorPlus: "Tutor-created",
      tutorOnly: "Tutor-created"
    },
    {
      feature: "Homework Help",
      aiBasic: "Basic",
      tutorLite: true,
      tutorPlus: true,
      tutorOnly: true
    },
    {
      feature: "Exam Prep Materials",
      aiBasic: "Limited",
      tutorLite: true,
      tutorPlus: "Premium",
      tutorOnly: "Basic"
    },
    {
      feature: "Priority Support",
      aiBasic: false,
      tutorLite: false,
      tutorPlus: true,
      tutorOnly: false
    }
  ];
};

export const fetchPricingFAQs = async (): Promise<{question: string, answer: string}[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a free trial?",
      answer: "We offer a 7-day free trial for all our plans. You won't be charged until the trial period ends, and you can cancel anytime before that."
    },
    {
      question: "How do the tutoring hours work?",
      answer: "Tutoring hours can be scheduled in 30-minute or 1-hour blocks through our booking system. Unused hours don't roll over to the next month."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "You can cancel your subscription at any time from your account settings. You'll maintain access until the end of your current billing period."
    },
    {
      question: "Is there a discount for annual billing?",
      answer: "Yes, we offer a 15% discount when you choose annual billing for any of our plans."
    }
  ];
};
