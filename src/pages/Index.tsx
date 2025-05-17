
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutThinkBridge from "../components/AboutThinkBridge";
import UpcomingNews from "../components/UpcomingNews";
import TutoringBanner from "../components/TutoringBanner";
import SubjectsOffered from "../components/SubjectsOffered";
import TestimonialsCarousel from "../components/TestimonialsCarousel";
import FAQAccordion from "../components/FAQAccordion";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-[100] focus:text-thinkbridge-700"
      >
        Skip to content
      </a>
      
      <Navbar />
      
      <main id="main-content">
        <HeroSection />
        <AboutThinkBridge />
        <TutoringBanner />
        <SubjectsOffered />
        <UpcomingNews />
        <TestimonialsCarousel />
        <FAQAccordion />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
