
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/sonner';
import { useStudentStore } from '@/stores/useStudentStore';

// Import existing pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import AboutPage from '@/pages/about/AboutPage';
import PricingPage from '@/pages/pricing/PricingPage';
import SubjectsPage from '@/pages/subjects/SubjectsPage';
import CoursePage from '@/pages/courses/CoursePage';
import UnitPage from '@/pages/courses/UnitPage';
import LessonPage from '@/pages/courses/LessonPage';
import LibraryPage from '@/pages/library/LibraryPage';
import WaitlistPage from '@/pages/waitlist/WaitlistPage';
import JoinTutorPage from '@/pages/join-tutor/JoinTutorPage';
import BookingLayout from '@/pages/booking/BookingLayout';
import TutorLayout from '@/pages/tutor/TutorLayout';
import TutorDashboard from '@/pages/tutor/TutorDashboard';
import StudentsPage from '@/pages/tutor/StudentsPage';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import ClientManagement from '@/pages/admin/ClientManagement';
import StudentManagement from '@/pages/admin/StudentManagement';
import TutorManagement from '@/pages/admin/TutorManagement';
import ContentManagement from '@/pages/admin/ContentManagement';
import PaymentManagement from '@/pages/admin/PaymentManagement';
import CalendarManagement from '@/pages/admin/CalendarManagement';
import NotificationCenter from '@/pages/admin/NotificationCenter';

// Import new student experience components
import OnboardingPage from '@/pages/OnboardingPage';
import StudentLayout from '@/pages/student/StudentLayout';
import StudentDashboard from '@/pages/student/StudentDashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Route Guard Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useStudentStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

// Public Route Guard (redirect if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useStudentStore();
  
  if (isAuthenticated) {
    return <Navigate to="/student" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Marketing Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/courses/:courseId" element={<CoursePage />} />
          <Route path="/courses/:courseId/units/:unitId" element={<UnitPage />} />
          <Route path="/courses/:courseId/units/:unitId/lessons/:lessonId" element={<LessonPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/waitlist" element={<WaitlistPage />} />
          <Route path="/join-tutor" element={<JoinTutorPage />} />
          <Route path="/booking/*" element={<BookingLayout><div /></BookingLayout>} />
          
          {/* Student Onboarding (Public) */}
          <Route 
            path="/onboarding" 
            element={
              <PublicRoute>
                <OnboardingPage />
              </PublicRoute>
            } 
          />
          
          {/* Student Portal (Protected) - Changed from /app to /student */}
          <Route 
            path="/student" 
            element={
              <ProtectedRoute>
                <StudentLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<StudentDashboard />} />
            {/* We'll add more student routes here like library, settings, etc. */}
          </Route>
          
          {/* Tutor Routes */}
          <Route path="/tutor" element={<TutorLayout />}>
            <Route index element={<TutorDashboard />} />
            <Route path="students" element={<StudentsPage />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/clients" element={<ClientManagement />} />
          <Route path="/admin/students" element={<StudentManagement />} />
          <Route path="/admin/tutors" element={<TutorManagement />} />
          <Route path="/admin/content" element={<ContentManagement />} />
          <Route path="/admin/payments" element={<PaymentManagement />} />
          <Route path="/admin/calendar" element={<CalendarManagement />} />
          <Route path="/admin/notifications" element={<NotificationCenter />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
