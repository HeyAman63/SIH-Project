import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Download, Calendar, Users, MapPin, BarChart3, FileText } from 'lucide-react';

function ReportsPage() {
  const { faculty, rooms, subjects, batches, timetable } = useData();
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState({
    from: '2025-01-15',
    to: '2025-01-21'
  });

  const reportTypes = [
    {
      id: 'weekly-schedule',
      title: 'Weekly Class Schedule',
      description: 'Complete timetable for all batches and subjects',
      icon: Calendar,
      format: ['PDF', 'Excel', 'ICS']
    },
    {
      id: 'faculty-workload',
      title: 'Faculty Workload Report',
      description: 'Teaching hours and workload distribution analysis',
      icon: Users,
      format: ['PDF', 'Excel']
    },
    {
      id: 'room-utilization',
      title: 'Room Utilization Report',
      description: 'Room occupancy rates and usage patterns',
      icon: MapPin,
      format: ['PDF', 'Excel']
    },
    {
      id: 'analytics',
      title: 'Scheduling Analytics',
      description: 'Optimization metrics and constraint satisfaction analysis',
      icon: BarChart3,
      format: ['PDF']
    },
    {
      id: 'conflict-report',
      title: 'Conflict & Issues Report',
      description: 'Scheduling conflicts and resolution recommendations',
      icon: FileText,
      format: ['PDF', 'Excel']
    }
  ];

  const handleExport = (reportId: string, format: string) => {
    // Simulate export functionality
    alert(`Exporting ${reportTypes.find(r => r.id === reportId)?.title} as ${format}...`);
    
    // Simulate download
    setTimeout(() => {
      alert('Report downloaded successfully!');
    }, 1000);
  };

  const generateStats = () => {
    const totalClasses = timetable.length;
    const facultyUtilization = faculty.map(f => {
      const classes = timetable.filter(t => t.faculty === f.id).length;
      return {
        name: f.name,
        classes,
        utilization: Math.round((classes / (f.maxHoursPerDay * 5)) * 100)
      };
    });

    const roomUtilization = rooms.map(r => {
      const classes = timetable.filter(t => t.room === r.id).length;
      return {
        name: r.name,
        classes,
        utilization: Math.round((classes / 35) * 100) // 7 slots * 5 days
      };
    });

    return {
      totalClasses,
      facultyUtilization,
      roomUtilization,
      confirmedClasses: timetable.filter(t => t.status === 'confirmed').length,
      conflictClasses: timetable.filter(t => t.status === 'conflict').length
    };
  };

  const stats = generateStats();

  return (
    <div className="space-y-8 mt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">From:</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">To:</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-blue-600">{stats.totalClasses}</div>
          <div className="text-sm text-gray-600">Total Classes</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-green-600">{stats.confirmedClasses}</div>
          <div className="text-sm text-gray-600">Confirmed</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-red-600">{stats.conflictClasses}</div>
          <div className="text-sm text-gray-600">Conflicts</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-purple-600">{faculty.length}</div>
          <div className="text-sm text-gray-600">Active Faculty</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="text-2xl font-bold text-yellow-600">{rooms.length}</div>
          <div className="text-sm text-gray-600">Available Rooms</div>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Available Reports</h2>
          
          <div className="space-y-4">
            {reportTypes.map((report) => {
              const Icon = report.icon;
              return (
                <div key={report.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{report.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                        
                        <div className="flex items-center space-x-2 mt-3">
                          {report.format.map((format) => (
                            <button
                              key={format}
                              onClick={() => handleExport(report.id, format)}
                              className="flex items-center px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                            >
                              <Download className="h-3 w-3 mr-1" />
                              {format}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Utilization Overview</h2>
          
          {/* Faculty Utilization */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Faculty Workload</h3>
            <div className="space-y-3">
              {stats.facultyUtilization.map((f, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{f.name}</span>
                      <span className="text-gray-500">{f.classes} classes ({f.utilization}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          f.utilization > 80 ? 'bg-red-500' :
                          f.utilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(f.utilization, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Room Utilization */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Room Utilization</h3>
            <div className="space-y-3">
              {stats.roomUtilization.map((r, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{r.name}</span>
                      <span className="text-gray-500">{r.classes} classes ({r.utilization}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          r.utilization > 80 ? 'bg-red-500' :
                          r.utilization > 60 ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min(r.utilization, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export All */}
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-medium text-blue-900 mb-2">Export All Reports</h3>
            <p className="text-sm text-blue-700 mb-4">
              Download a comprehensive report package including all available reports in your preferred format.
            </p>
            <button
              onClick={() => handleExport('all-reports', 'ZIP')}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Download className="mr-2 h-4 w-4" />
              Download All (ZIP)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;