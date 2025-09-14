import React from 'react';
import { useData } from '../context/DataContext';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  Calendar, 
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

function Dashboard() {
  const { faculty, rooms, subjects, batches, timetable } = useData();

  const stats = [
    {
      title: 'Total Faculty',
      value: faculty.length,
      icon: Users,
      color: 'bg-blue-500',
      link: '/faculty'
    },
    {
      title: 'Rooms Available',
      value: rooms.length,
      icon: MapPin,
      color: 'bg-green-500',
      link: '/rooms'
    },
    {
      title: 'Subjects',
      value: subjects.length,
      icon: BookOpen,
      color: 'bg-purple-500',
      link: '/subjects'
    },
    {
      title: 'Student Batches',
      value: batches.length,
      icon: GraduationCap,
      color: 'bg-yellow-500',
      link: '/batches'
    }
  ];

  const recentActivity = [
    { action: 'Timetable generated for CS Department', time: '2 hours ago', type: 'success' },
    { action: 'New faculty member added', time: '1 day ago', type: 'info' },
    { action: 'Room 205 marked unavailable', time: '2 days ago', type: 'warning' },
    { action: 'Weekly schedule approved', time: '3 days ago', type: 'success' }
  ];

  return (
    <div className="space-y-8 mt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-4">
          <Link
            to="/scheduler"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Generate Timetable
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              to={stat.link}
              className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} rounded-md p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/scheduler"
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <Calendar className="h-5 w-5 text-blue-600 mr-3" />
                <span className="font-medium text-gray-900">Generate New Timetable</span>
              </Link>
              
              <Link
                to="/faculty"
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors"
              >
                <Users className="h-5 w-5 text-green-600 mr-3" />
                <span className="font-medium text-gray-900">Manage Faculty</span>
              </Link>
              
              <Link
                to="/approval"
                className="flex items-center p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors"
              >
                <CheckCircle className="h-5 w-5 text-purple-600 mr-3" />
                <span className="font-medium text-gray-900">Review Approvals</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`mt-1 w-2 h-2 rounded-full ${
                    activity.type === 'success' ? 'bg-green-400' : 
                    activity.type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Timetable Overview */}
      <div className="bg-white shadow-sm rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Timetable Status</h2>
            <Link
              to="/timetable"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Full Schedule →
            </Link>
          </div>
          
          {timetable.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {timetable.filter(s => s.status === 'confirmed').length}
                </div>
                <div className="text-sm text-green-700">Confirmed Classes</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {timetable.filter(s => s.status === 'tentative').length}
                </div>
                <div className="text-sm text-yellow-700">Pending Review</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {timetable.filter(s => s.status === 'conflict').length}
                </div>
                <div className="text-sm text-red-700">Conflicts</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <p>No timetable generated yet</p>
              <Link
                to="/scheduler"
                className="mt-2 inline-block text-blue-600 hover:text-blue-800 font-medium"
              >
                Generate your first timetable
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;