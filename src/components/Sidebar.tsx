import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  MapPin,
  BookOpen,
  GraduationCap,
  Settings,
  Calendar,
  Grid3X3,
  CheckCircle,
  FileText
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Faculty', path: '/faculty' },
  { icon: MapPin, label: 'Rooms', path: '/rooms' },
  { icon: BookOpen, label: 'Subjects', path: '/subjects' },
  { icon: GraduationCap, label: 'Batches', path: '/batches' },
  { icon: Settings, label: 'Constraints', path: '/constraints' },
  { icon: Calendar, label: 'Scheduler', path: '/scheduler' },
  { icon: Grid3X3, label: 'Timetable', path: '/timetable' },
  { icon: CheckCircle, label: 'Approval', path: '/approval' },
  { icon: FileText, label: 'Reports', path: '/reports' }
];

function Sidebar() {
  const location = useLocation();

  return (
    <div className="fixed left-0 top-16 h-full w-64 bg-white shadow-sm border-r border-gray-200">
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;