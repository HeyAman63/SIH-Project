import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import TimetableGrid from '../components/TimetableGrid';
import { Eye, Edit, Save, Download, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

function TimetableView() {
  const { timetable, batches } = useData();
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [editMode, setEditMode] = useState(false);

  const handleExport = () => {
    // Simulate export functionality
    alert('Timetable exported successfully!');
  };

  const handleSave = () => {
    // Simulate save functionality
    setEditMode(false);
    alert('Timetable saved successfully!');
  };

  return (
    <div className="space-y-6 mt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Timetable View</h1>
        <div className="flex items-center space-x-4">
          <select
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Batches</option>
            {batches.map(batch => (
              <option key={batch.id} value={batch.id}>{batch.name}</option>
            ))}
          </select>

          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              List
            </button>
          </div>

          <div className="flex items-center space-x-2">
            {editMode ? (
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </button>
            )}

            <button
              onClick={handleExport}
              className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </button>

            <Link
              to="/approval"
              className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Send className="mr-2 h-4 w-4" />
              Send for Approval
            </Link>
          </div>
        </div>
      </div>

      {timetable.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Eye className="h-8 w-8 text-gray-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Timetable Available</h3>
            <p className="text-gray-600 mb-6">
              Generate a timetable first to view and manage class schedules.
            </p>
            <Link
              to="/scheduler"
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Generate Timetable
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Timetable Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">Total Classes</div>
              <div className="text-2xl font-bold text-gray-900">{timetable.length}</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">Confirmed</div>
              <div className="text-2xl font-bold text-green-600">
                {timetable.filter(t => t.status === 'confirmed').length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">Tentative</div>
              <div className="text-2xl font-bold text-yellow-600">
                {timetable.filter(t => t.status === 'tentative').length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600">Conflicts</div>
              <div className="text-2xl font-bold text-red-600">
                {timetable.filter(t => t.status === 'conflict').length}
              </div>
            </div>
          </div>

          {/* Timetable Display */}
          {viewMode === 'grid' ? (
            <TimetableGrid />
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Day & Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Faculty
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Batch
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timetable.map((slot) => (
                    <tr key={slot.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][slot.dayOfWeek - 1]} {slot.timeSlot}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {slot.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {slot.faculty}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {slot.room}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {slot.batch}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          slot.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          slot.status === 'tentative' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {slot.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TimetableView;