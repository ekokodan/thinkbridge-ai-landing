
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleBookClick = () => {
    console.log("Book");
    // This log is here for the test to verify
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero-gradient min-h-[75vh] flex items-center pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div 
            className={`text-center md:text-left space-y-6 ${
              isVisible ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
            data-testid="hero-content"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Personalized Learning <span className="text-thinkbridge-600">Powered by AI</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0">
              Adaptive lessons, real-time feedback, and expert tutors—all in one platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link 
                to="/book" 
                className="btn-primary flex items-center justify-center gap-2"
                onClick={handleBookClick}
                data-testid="book-button"
              >
                Book a Tutor
                <ArrowRight size={20} />
              </Link>
              <button className="btn-secondary flex items-center justify-center gap-2">
                Join Waitlist
              </button>
            </div>
          </div>

          <div 
            className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
            style={{ animationDelay: '0.4s' }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-thinkbridge-400 to-thinkbridge-600 opacity-30 blur-xl rounded-2xl"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl">
                <div className="aspect-video bg-gray-100 rounded-lg mb-6 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                    alt="Student using ThinkBridge platform" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="h-2 bg-thinkbridge-200 rounded w-3/4"></div>
                  <div className="h-2 bg-thinkbridge-200 rounded"></div>
                  <div className="h-2 bg-thinkbridge-200 rounded w-5/6"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-8 w-24 bg-thinkbridge-500 rounded-lg"></div>
                    <div className="h-8 w-8 rounded-full bg-thinkbridge-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
