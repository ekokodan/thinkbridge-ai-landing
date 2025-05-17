
import { Suspense } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PricingHero from './PricingHero';
import PricingTable from './PricingTable';
import ComparisonGrid from './ComparisonGrid';
import PricingFAQ from './PricingFAQ';
import CTAFooter from './CTAFooter';
import LoadingSpinner from '../../components/LoadingSpinner';

const PricingPage = () => {
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
        <PricingHero />
        
        <Suspense fallback={<div className="py-16 flex justify-center"><LoadingSpinner /></div>}>
          <PricingTable />
        </Suspense>
        
        <Suspense fallback={<div className="py-16 flex justify-center"><LoadingSpinner /></div>}>
          <ComparisonGrid />
        </Suspense>
        
        <Suspense fallback={<div className="py-16 flex justify-center"><LoadingSpinner /></div>}>
          <PricingFAQ />
        </Suspense>
        
        <CTAFooter />
      </main>
      
      <Footer />
    </div>
  );
};

export default PricingPage;
