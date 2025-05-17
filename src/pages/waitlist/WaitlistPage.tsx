
import { Suspense } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WaitlistHero from './WaitlistHero';
import WaitlistForm from './WaitlistForm';
import WaitlistTestimonials from './WaitlistTestimonials';
import LoadingSpinner from '../../components/LoadingSpinner';

const WaitlistPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-[100] focus:text-thinkbridge-700"
      >
        Skip to content
      </a>

      <Navbar />
      
      <main id="main-content" className="pt-16">
        <WaitlistHero />
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
            <Suspense fallback={<div className="py-16 flex justify-center"><LoadingSpinner /></div>}>
              <WaitlistForm />
            </Suspense>
            
            <Suspense fallback={<div className="py-16 flex justify-center"><LoadingSpinner /></div>}>
              <WaitlistTestimonials />
            </Suspense>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default WaitlistPage;
