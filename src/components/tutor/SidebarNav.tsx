
import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  BarChart, 
  Library, 
  ChevronLeft, 
  ChevronRight,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTutorStore } from '@/stores/useTutorStore';

const navItems = [
  { 
    name: 'Dashboard', 
    path: '/tutor', 
    icon: Home 
  },
  { 
    name: 'Students', 
    path: '/tutor/students', 
    icon: Users 
  },
  { 
    name: 'Calendar', 
    path: '/tutor/calendar', 
    icon: Calendar 
  },
  { 
    name: 'Lessons', 
    path: '/tutor/lessons', 
    icon: BookOpen 
  },
  { 
    name: 'Analytics', 
    path: '/tutor/analytics', 
    icon: BarChart 
  },
  { 
    name: 'Library Admin', 
    path: '/tutor/library-admin', 
    icon: Library 
  }
];

const SidebarNav = () => {
  const { sidebarOpen, actions } = useTutorStore();
  
  return (
    <motion.div
      className={cn(
        "h-screen bg-white border-r border-slate-200 flex flex-col transition-all duration-300",
        sidebarOpen ? "w-64" : "w-20"
      )}
      animate={{ width: sidebarOpen ? '16rem' : '5rem' }}
      initial={false}
    >
      <div className="p-4 flex items-center justify-between border-b border-slate-200">
        <h2 className={cn("font-bold text-indigo-600 transition-opacity", 
          sidebarOpen ? "opacity-100" : "opacity-0")}>
          ThinkBridge Tutor
        </h2>
        <button
          onClick={actions.toggleSidebar}
          className="p-1 rounded-md hover:bg-slate-100"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center p-2 rounded-md transition-all",
                  isActive 
                    ? "bg-indigo-50 text-indigo-600" 
                    : "text-gray-600 hover:bg-gray-100",
                  !sidebarOpen && "justify-center"
                )}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {sidebarOpen && (
                  <span className="ml-3">{item.name}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <NavLink
          to="/library"
          className="flex items-center p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-all"
        >
          <Library size={20} className="flex-shrink-0" />
          {sidebarOpen && <span className="ml-3">Course Library</span>}
        </NavLink>
      </div>
    </motion.div>
  );
};

export default SidebarNav;
