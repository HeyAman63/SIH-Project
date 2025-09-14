import React from 'react';
import { useData } from '../context/DataContext';

const timeSlots = [
  '09:00-10:00',
  '10:00-11:00',
  '11:00-12:00',
  '12:00-13:00',
  '14:00-15:00',
  '15:00-16:00',
  '16:00-17:00'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function TimetableGrid() {
  const { timetable, subjects, faculty, rooms, batches } = useData();

  const getSlotData = (dayIndex: number, timeSlot: string) => {
    return timetable.find(slot => slot.dayOfWeek === dayIndex && slot.timeSlot === timeSlot);
  };

  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || '';
  const getFacultyName = (id: string) => faculty.find(f => f.id === id)?.name || '';
  const getRoomName = (id: string) => rooms.find(r => r.id === id)?.name || '';
  const getBatchName = (id: string) => batches.find(b => b.id === id)?.name || '';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 border-green-300 text-green-800';
      case 'tentative': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'conflict': return 'bg-red-100 border-red-300 text-red-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="grid grid-cols-6 divide-x divide-gray-200">
            {/* Header */}
            <div className="bg-gray-50 p-4 font-medium text-gray-900">Time</div>
            {days.map((day) => (
              <div key={day} className="bg-gray-50 p-4 font-medium text-gray-900 text-center">
                {day}
              </div>
            ))}
            
            {/* Time slots */}
            {timeSlots.map((timeSlot) => (
              <React.Fragment key={timeSlot}>
                <div className="bg-gray-50 p-4 text-sm font-medium text-gray-700 border-t border-gray-200">
                  {timeSlot}
                </div>
                {days.map((day, dayIndex) => {
                  const slot = getSlotData(dayIndex + 1, timeSlot);
                  return (
                    <div key={`${day}-${timeSlot}`} className="p-2 border-t border-gray-200 min-h-[80px]">
                      {slot ? (
                        <div className={`p-2 rounded border-2 text-xs ${getStatusColor(slot.status)}`}>
                          <div className="font-semibold">{getSubjectName(slot.subject)}</div>
                          <div className="mt-1">{getFacultyName(slot.faculty)}</div>
                          <div className="flex justify-between mt-1">
                            <span>{getRoomName(slot.room)}</span>
                            <span>{getBatchName(slot.batch)}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-300">
                          Free
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimetableGrid;