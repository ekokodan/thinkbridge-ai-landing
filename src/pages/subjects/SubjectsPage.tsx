
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const subjects = [
  {
    category: "Mathematics",
    topics: ["Algebra", "Geometry", "Calculus", "Statistics", "Trigonometry", "Linear Algebra"],
    icon: "📊",
    color: "bg-blue-50 text-blue-600",
    description: "Master mathematical concepts from basic arithmetic to advanced calculus with our expert tutors and AI-powered practice exercises."
  },
  {
    category: "Sciences",
    topics: ["Physics", "Chemistry", "Biology", "Earth Science", "Astronomy"],
    icon: "🧪",
    color: "bg-green-50 text-green-600",
    description: "Explore the natural world through our comprehensive science courses, featuring virtual labs and interactive simulations."
  },
  {
    category: "Languages",
    topics: ["English", "Spanish", "French", "German", "Chinese", "Japanese"],
    icon: "🌎",
    color: "bg-purple-50 text-purple-600",
    description: "Develop fluency in multiple languages through conversation practice with native speakers and AI language partners."
  },
  {
    category: "Computer Science",
    topics: ["Python", "JavaScript", "Java", "C++", "Web Development", "Data Science"],
    icon: "💻",
    color: "bg-orange-50 text-orange-600",
    description: "Learn to code and build real projects with guidance from industry professionals and our AI code review system."
  },
  {
    category: "Social Sciences",
    topics: ["History", "Geography", "Economics", "Psychology", "Sociology"],
    icon: "🏛️",
    color: "bg-red-50 text-red-600",
    description: "Understand human societies past and present through engaging lessons that connect historical events to contemporary issues."
  },
  {
    category: "Arts & Literature",
    topics: ["Creative Writing", "Literary Analysis", "Art History", "Music Theory"],
    icon: "🎭",
    color: "bg-yellow-50 text-yellow-600",
    description: "Express yourself and analyze the great works of literature and art with guidance from creative professionals."
  }
];

const SubjectsPage = () => {
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
                Explore Our Subjects
              </motion.h1>
              <motion.p 
                className="text-lg text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Discover the wide range of subjects available for tutoring and self-paced learning on ThinkBridge.
              </motion.p>
              <Button asChild size="lg">
                <Link to="/book">Find a Tutor</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Subject Categories */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {subjects.map((subject, index) => (
                  <motion.div
                    key={subject.category}
                    className="bg-white rounded-xl overflow-hidden shadow-md border border-slate-100"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={`p-6 ${subject.color}`}>
                      <span className="text-4xl mb-4 block">{subject.icon}</span>
                      <h2 className="text-2xl font-bold mb-2">{subject.category}</h2>
                      <p className="text-sm opacity-90">{subject.description}</p>
                    </div>
                    <div className="p-6">
                      <h3 className="font-medium text-sm text-muted-foreground mb-3">Popular Topics:</h3>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map(topic => (
                          <span 
                            key={topic} 
                            className="px-3 py-1 bg-slate-100 rounded-full text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          asChild
                        >
                          <Link to={`/book?subject=${encodeURIComponent(subject.category)}`}>
                            Explore {subject.category}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Learning Approaches */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Our Learning Approaches</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We offer multiple ways to learn, catering to different learning styles and needs.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Self-Paced Learning</h3>
                  <p className="text-muted-foreground mb-4">
                    Access our extensive library of resources and practice exercises anytime, 
                    with adaptive AI that adjusts to your learning pace.
                  </p>
                  <Button variant="link" asChild>
                    <Link to="/pricing">View Plans</Link>
                  </Button>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">One-on-One Tutoring</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect with expert tutors for personalized lessons tailored to your specific needs and learning goals.
                  </p>
                  <Button variant="link" asChild>
                    <Link to="/book">Book a Session</Link>
                  </Button>
                </div>
                
                <div className="bg-white p-8 rounded-xl shadow-md">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">Group Workshops</h3>
                  <p className="text-muted-foreground mb-4">
                    Join interactive group sessions on specific topics, led by experienced educators in a collaborative environment.
                  </p>
                  <Button variant="link" asChild>
                    <Link to="/book">Explore Workshops</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-indigo-600 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to start learning?</h2>
              <p className="text-lg mb-8 text-indigo-100">
                Choose from hundreds of subjects and get matched with the perfect tutor for your needs.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/book">Book a Tutor</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-indigo-600" asChild>
                  <Link to="/pricing">View Pricing</Link>
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

export default SubjectsPage;
