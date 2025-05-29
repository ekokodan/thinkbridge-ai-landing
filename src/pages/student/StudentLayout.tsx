
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useStudentStore } from '@/stores/useStudentStore';
import { SidebarProvider } from '@/components/ui/sidebar';
import StudentNavbar from '@/components/layout/StudentNavbar';
import StudentSidebar from '@/components/layout/StudentSidebar';

const StudentLayout: React.FC = () => {
  const { isAuthenticated } = useStudentStore();

  if (!isAuthenticated) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-50 flex w-full">
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          <StudentNavbar />
          <main className="flex-1 min-h-screen">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default StudentLayout;
