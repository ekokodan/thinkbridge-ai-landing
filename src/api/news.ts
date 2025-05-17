
export interface NewsItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  readMoreUrl: string;
}

export const fetchNews = (): Promise<NewsItem[]> => {
  // This would be a real API call in production
  return Promise.resolve([
    {
      id: "1",
      title: "Adaptive Learning Engine v1.0 launching Fall 2025",
      preview: "Our AI-powered learning engine will revolutionize how students interact with educational content, providing personalized pathways based on individual learning styles.",
      date: "May 10, 2025",
      readMoreUrl: "#",
    },
    {
      id: "2",
      title: "Mobile app prototype in alpha",
      preview: "Get early access to our mobile application and help us shape the future of on-the-go learning with ThinkBridge's powerful AI tools.",
      date: "April 22, 2025",
      readMoreUrl: "#",
    },
    {
      id: "3",
      title: "Partnership with local schools",
      preview: "ThinkBridge is proud to announce our partnership with over 50 schools nationwide to bring advanced AI tutoring to thousands of students.",
      date: "March 15, 2025",
      readMoreUrl: "#",
    },
    {
      id: "4",
      title: "New math curriculum developed with educators",
      preview: "Our team has collaborated with expert educators to create a comprehensive, adaptive math curriculum that meets students where they are.",
      date: "February 28, 2025",
      readMoreUrl: "#",
    },
  ]);
};
