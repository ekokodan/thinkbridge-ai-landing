
export interface Subject {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface TutoringPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  hours: number;
  isOneOff: boolean;
}

export interface Tutor {
  id: string;
  name: string;
  subjects: string[];
  avatarUrl: string | null;
  rating: number;
  bio: string;
}

export interface TimeSlot {
  id: string;
  tutorId: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  isAvailable: boolean;
}

export const fetchSubjects = async (): Promise<Subject[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  return [
    {
      id: "math",
      name: "Mathematics",
      icon: "calculator",
      description: "Algebra, Calculus, Geometry, Statistics and more"
    },
    {
      id: "english",
      name: "English",
      icon: "book-open",
      description: "Reading, Writing, Grammar, Literature analysis"
    },
    {
      id: "french",
      name: "French",
      icon: "languages",
      description: "Vocabulary, Grammar, Conversation, Culture"
    },
    {
      id: "python",
      name: "Python",
      icon: "code",
      description: "Programming basics, Data structures, Algorithms"
    }
  ];
};

export const fetchPlans = async (): Promise<TutoringPlan[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return [
    {
      id: "one-off",
      name: "One-off Session",
      description: "Single 1-hour tutoring session",
      price: 40,
      hours: 1,
      isOneOff: true
    },
    {
      id: "tutor-lite",
      name: "Tutor Lite",
      description: "4 hours of tutoring per month + AI support",
      price: 119,
      hours: 4,
      isOneOff: false
    },
    {
      id: "tutor-plus",
      name: "Tutor Plus",
      description: "8 hours of tutoring per month + priority AI support",
      price: 219,
      hours: 8,
      isOneOff: false
    }
  ];
};

export const fetchTutors = async (subjectId: string): Promise<Tutor[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: "tutor-1",
      name: "Dr. Elena Rodriguez",
      subjects: ["math", "python"],
      avatarUrl: null,
      rating: 4.9,
      bio: "PhD in Mathematics with 8 years of teaching experience"
    },
    {
      id: "tutor-2",
      name: "James Wilson",
      subjects: ["english", "french"],
      avatarUrl: null,
      rating: 4.8,
      bio: "Bilingual educator with Masters in Linguistics"
    },
    {
      id: "tutor-3",
      name: "Michael Chen",
      subjects: ["math", "python"],
      avatarUrl: null,
      rating: 4.7,
      bio: "Software engineer and mathematics enthusiast"
    },
    {
      id: "tutor-4",
      name: "Sophie Martin",
      subjects: ["french", "english"],
      avatarUrl: null,
      rating: 4.9,
      bio: "Native French speaker with education degree"
    }
  ].filter(tutor => tutor.subjects.includes(subjectId));
};

export const fetchAvailableSlots = async (
  tutorId: string,
  date: string
): Promise<TimeSlot[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 900));
  
  // Generate time slots for the given date
  const slots = [];
  const baseDate = new Date(date);
  
  // Generate slots from 9 AM to 5 PM
  for (let hour = 9; hour < 17; hour++) {
    const startTime = new Date(baseDate);
    startTime.setHours(hour, 0, 0);
    
    const endTime = new Date(baseDate);
    endTime.setHours(hour + 1, 0, 0);
    
    // Randomly determine if slot is available
    const isAvailable = Math.random() > 0.3;
    
    slots.push({
      id: `slot-${tutorId}-${hour}`,
      tutorId,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      isAvailable
    });
  }
  
  return slots;
};

export interface BookingData {
  subjectId: string;
  planId: string;
  tutorId: string;
  slotId: string;
  studentName?: string;
  email?: string;
  notes?: string;
  couponCode?: string;
}

export const submitBooking = async (data: BookingData): Promise<{success: boolean; bookingId?: string; message: string}> => {
  console.log("Booking submission data:", data);
  
  // Simulate API request
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate successful booking
  return {
    success: true,
    bookingId: `booking-${Date.now()}`,
    message: "Your tutoring session has been booked successfully!"
  };
};
