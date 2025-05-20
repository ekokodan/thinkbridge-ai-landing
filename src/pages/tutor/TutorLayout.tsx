
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNav from '@/components/tutor/SidebarNav';
import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from '@/components/ui/sidebar';

const TutorLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden w-full">
        <Sidebar variant="inset" collapsible="icon">
          <SidebarContent>
            <SidebarNav />
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="overflow-y-auto bg-slate-50">
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default TutorLayout;
