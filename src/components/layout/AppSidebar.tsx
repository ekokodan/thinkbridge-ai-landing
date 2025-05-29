
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel 
} from '@/components/ui/sidebar';
import { Home, Library, Settings, Calendar, BookOpen } from 'lucide-react';

const AppSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      url: '/app',
      isActive: location.pathname === '/app'
    },
    {
      title: 'Library',
      icon: Library,
      url: '/app/library',
      isActive: location.pathname === '/app/library'
    },
    {
      title: 'Calendar',
      icon: Calendar,
      url: '/app/calendar',
      isActive: location.pathname === '/app/calendar'
    },
    {
      title: 'Homework',
      icon: BookOpen,
      url: '/app/homework',
      isActive: location.pathname === '/app/homework'
    },
    {
      title: 'Settings',
      icon: Settings,
      url: '/app/settings',
      isActive: location.pathname === '/app/settings'
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-indigo-600">Student Portal</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={item.isActive}
                    onClick={() => navigate(item.url)}
                  >
                    <button className="flex items-center gap-3 w-full">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
