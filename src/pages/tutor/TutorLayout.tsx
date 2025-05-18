
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNav from '@/components/tutor/SidebarNav';
import { useTutorStore } from '@/stores/useTutorStore';
import { cn } from '@/lib/utils';

const TutorLayout: React.FC = () => {
  const { sidebarOpen } = useTutorStore();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarNav />
      <div className={cn(
        "flex-1 overflow-y-auto transition-all duration-300 bg-slate-50",
        sidebarOpen ? "ml-64" : "ml-20"
      )}>
        <Outlet />
      </div>
    </div>
  );
};

export default TutorLayout;
