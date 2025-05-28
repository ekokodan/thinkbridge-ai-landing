
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy-loaded pages
const LandingPage = lazy(() => import("./pages/Index"));
const BookingPage = lazy(() => import("./pages/booking/BookingPage"));
const PricingPage = lazy(() => import("./pages/pricing/PricingPage"));
const WaitlistPage = lazy(() => import("./pages/waitlist/WaitlistPage"));
const AboutPage = lazy(() => import("./pages/about/AboutPage"));
const SubjectsPage = lazy(() => import("./pages/subjects/SubjectsPage"));
const JoinTutorPage = lazy(() => import("./pages/join-tutor/JoinTutorPage"));

// Tutor Dashboard and Library pages
const TutorLayout = lazy(() => import("./pages/tutor/TutorLayout"));
const TutorDashboard = lazy(() => import("./pages/tutor/TutorDashboard"));
const StudentsPage = lazy(() => import("./pages/tutor/StudentsPage"));
const LibraryPage = lazy(() => import("./pages/library/LibraryPage"));

// Admin pages
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

// Course pages
const CoursePage = lazy(() => import("./pages/courses/CoursePage"));
const UnitPage = lazy(() => import("./pages/courses/UnitPage"));
const LessonPage = lazy(() => import("./pages/courses/LessonPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/book/*" element={<BookingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/waitlist" element={<WaitlistPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/join-tutor" element={<JoinTutorPage />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            
            {/* Tutor Dashboard Routes */}
            <Route path="/tutor" element={<TutorLayout />}>
              <Route index element={<TutorDashboard />} />
              <Route path="students" element={<StudentsPage />} />
              <Route path="students/:id" element={<StudentsPage />} />
              {/* Additional tutor routes will be added here */}
            </Route>
            
            {/* Library Routes */}
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/library/:id" element={<LibraryPage />} />
            
            {/* Course Routes */}
            <Route path="/courses/:courseId" element={<CoursePage />} />
            <Route path="/courses/:courseId/units/:unitId" element={<UnitPage />} />
            <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
