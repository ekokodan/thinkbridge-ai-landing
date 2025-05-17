
import { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import BookingLayout from './BookingLayout';
import SelectSubject from './steps/SelectSubject';
import SelectPlan from './steps/SelectPlan';
import SelectDateTime from './steps/SelectDateTime';
import ReviewAndPay from './steps/ReviewAndPay';
import Confirmation from './steps/Confirmation';
import LoadingSpinner from '../../components/LoadingSpinner';

const BookingPage = () => {
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
      
      <main id="main-content" className="py-16">
        <Suspense fallback={<LoadingSpinner />}>
          <BookingLayout>
            <Routes>
              <Route path="/" element={<Navigate to="subject" replace />} />
              <Route path="subject" element={<SelectSubject />} />
              <Route path="plan" element={<SelectPlan />} />
              <Route path="schedule" element={<SelectDateTime />} />
              <Route path="review" element={<ReviewAndPay />} />
              <Route path="confirmation" element={<Confirmation />} />
            </Routes>
          </BookingLayout>
        </Suspense>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
