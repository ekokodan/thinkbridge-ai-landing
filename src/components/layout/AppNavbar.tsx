
import React from 'react';
import { useStudentStore } from '@/stores/useStudentStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const AppNavbar: React.FC = () => {
  const { profile, actions } = useStudentStore();

  const handleLogout = () => {
    actions.logout();
  };

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-indigo-600">ThinkBridge</h1>
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                placeholder="Search content..."
                className="pl-10 w-80"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarFallback>
                {profile?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:block text-sm font-medium">
              {profile?.name || 'Student'}
            </span>
          </div>
          
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
