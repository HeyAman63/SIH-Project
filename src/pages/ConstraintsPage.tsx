import React, { useState } from 'react';
import { Settings, Clock, Users, MapPin } from 'lucide-react';

interface Constraints {
  maxClassesPerDay: number;
  maxConsecutiveHours: number;
  minBreakBetweenClasses: number;
  workloadDistribution: 'even' | 'flexible';
  allowBackToBackLabs: boolean;
  preferredTimeSlots: string[];
  restrictedTimeSlots: string[];
  roomUtilizationMax: number;
}

const initialConstraints: Constraints = {
  maxClassesPerDay: 6,
  maxConsecutiveHours: 3,
  minBreakBetweenClasses: 15,
  workloadDistribution: 'even',
  allowBackToBackLabs: false,
  preferredTimeSlots: ['09:00-10:00', '10:00-11:00', '11:00-12:00'],
  restrictedTimeSlots: ['12:00-13:00'],
  roomUtilizationMax: 80
};

function ConstraintsPage() {
  const [constraints, setConstraints] = useState<Constraints>(initialConstraints);
  const [saved, setSaved] = useState(false);

  const timeSlots = [
    '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
    '14:00-15:00', '15:00-16:00', '16:00-17:00'
  ];

  const handleSave = () => {
    // Simulate saving constraints
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleTimeSlotChange = (timeSlot: string, type: 'preferred' | 'restricted', checked: boolean) => {
    if (type === 'preferred') {
      if (checked) {
        setConstraints(prev => ({
          ...prev,
          preferredTimeSlots: [...prev.preferredTimeSlots, timeSlot],
          restrictedTimeSlots: prev.restrictedTimeSlots.filter(t => t !== timeSlot)
        }));
      } else {
        setConstraints(prev => ({
          ...prev,
          preferredTimeSlots: prev.preferredTimeSlots.filter(t => t !== timeSlot)
        }));
      }
    } else {
      if (checked) {
        setConstraints(prev => ({
          ...prev,
          restrictedTimeSlots: [...prev.restrictedTimeSlots, timeSlot],
          preferredTimeSlots: prev.preferredTimeSlots.filter(t => t !== timeSlot)
        }));
      } else {
        setConstraints(prev => ({
          ...prev,
          restrictedTimeSlots: prev.restrictedTimeSlots.filter(t => t !== timeSlot)
        }));
      }
    }
  };

  return (
    <div className="space-y-6 mt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Scheduling Constraints</h1>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {saved ? 'Saved!' : 'Save Constraints'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Constraints */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Settings className="h-6 w-6 text-blue-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">General Constraints</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Classes Per Day
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={constraints.maxClassesPerDay}
                onChange={(e) => setConstraints(prev => ({
                  ...prev,
                  maxClassesPerDay: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Consecutive Hours
              </label>
              <input
                type="number"
                min="1"
                max="6"
                value={constraints.maxConsecutiveHours}
                onChange={(e) => setConstraints(prev => ({
                  ...prev,
                  maxConsecutiveHours: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Break Between Classes (minutes)
              </label>
              <select
                value={constraints.minBreakBetweenClasses}
                onChange={(e) => setConstraints(prev => ({
                  ...prev,
                  minBreakBetweenClasses: parseInt(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={0}>No break required</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workload Distribution
              </label>
              <select
                value={constraints.workloadDistribution}
                onChange={(e) => setConstraints(prev => ({
                  ...prev,
                  workloadDistribution: e.target.value as 'even' | 'flexible'
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="even">Even distribution across days</option>
                <option value="flexible">Flexible distribution</option>
              </select>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={constraints.allowBackToBackLabs}
                  onChange={(e) => setConstraints(prev => ({
                    ...prev,
                    allowBackToBackLabs: e.target.checked
                  }))}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Allow back-to-back lab sessions</span>
              </label>
            </div>
          </div>
        </div>

        {/* Time Slot Preferences */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Clock className="h-6 w-6 text-green-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Time Slot Preferences</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Preferred Time Slots</h3>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map(slot => (
                  <label key={`pref-${slot}`} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={constraints.preferredTimeSlots.includes(slot)}
                      onChange={(e) => handleTimeSlotChange(slot, 'preferred', e.target.checked)}
                      className="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{slot}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Restricted Time Slots</h3>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map(slot => (
                  <label key={`rest-${slot}`} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={constraints.restrictedTimeSlots.includes(slot)}
                      onChange={(e) => handleTimeSlotChange(slot, 'restricted', e.target.checked)}
                      className="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{slot}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Resource Constraints */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-6">
            <MapPin className="h-6 w-6 text-purple-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Resource Constraints</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Room Utilization (%)
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={constraints.roomUtilizationMax}
                  onChange={(e) => setConstraints(prev => ({
                    ...prev,
                    roomUtilizationMax: parseInt(e.target.value)
                  }))}
                  className="flex-1"
                />
                <span className="text-sm font-medium text-gray-700 w-12">
                  {constraints.roomUtilizationMax}%
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Maximum percentage of time slots a room can be occupied
              </p>
            </div>
          </div>
        </div>

        {/* Optimization Settings */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-yellow-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Optimization Priorities</h2>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600 mb-4">
              Rank the importance of each optimization factor (1 = highest priority):
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Faculty workload balance</span>
                <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Room utilization efficiency</span>
                <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Student schedule gaps</span>
                <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                  <option value="1">1</option>
                  <option value="2" selected>2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Time slot preferences</span>
                <select className="px-2 py-1 border border-gray-300 rounded text-sm">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3" selected>3</option>
                  <option value="4">4</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConstraintsPage;