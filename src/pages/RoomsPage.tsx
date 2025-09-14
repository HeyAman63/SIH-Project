import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import TableView from '../components/TableView';
import Modal from '../components/Modal';

interface RoomForm {
  name: string;
  type: 'classroom' | 'lab';
  capacity: number;
  equipment: string[];
  availability: string[];
}

const initialForm: RoomForm = {
  name: '',
  type: 'classroom',
  capacity: 30,
  equipment: [],
  availability: []
};

function RoomsPage() {
  const { rooms, addRoom, updateRoom, deleteRoom } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [formData, setFormData] = useState<RoomForm>(initialForm);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const equipmentOptions = ['Projector', 'Whiteboard', 'AC', 'Computers', 'Audio System', 'Smart Board'];

  const columns = [
    { key: 'name', label: 'Room Name' },
    { 
      key: 'type', 
      label: 'Type',
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'lab' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </span>
      )
    },
    { key: 'capacity', label: 'Capacity' },
    { 
      key: 'equipment', 
      label: 'Equipment',
      render: (value: string[]) => value.join(', ')
    },
    { 
      key: 'availability', 
      label: 'Available Days',
      render: (value: string[]) => value.join(', ')
    }
  ];

  const handleAdd = () => {
    setEditingRoom(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleEdit = (room: any) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      type: room.type,
      capacity: room.capacity,
      equipment: room.equipment,
      availability: room.availability
    });
    setIsModalOpen(true);
  };

  const handleDelete = (room: any) => {
    if (confirm('Are you sure you want to delete this room?')) {
      deleteRoom(room.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRoom) {
      updateRoom(editingRoom.id, formData);
    } else {
      addRoom(formData);
    }
    
    setIsModalOpen(false);
    setFormData(initialForm);
  };

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        availability: [...prev.availability, day]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        availability: prev.availability.filter(d => d !== day)
      }));
    }
  };

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        equipment: [...prev.equipment, equipment]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        equipment: prev.equipment.filter(e => e !== equipment)
      }));
    }
  };

  return (
    <div className="space-y-6 mt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
      </div>

      <TableView
        columns={columns}
        data={rooms}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonText="Add Room"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRoom ? 'Edit Room' : 'Add Room'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'classroom' | 'lab' }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="classroom">Classroom</option>
                <option value="lab">Laboratory</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Capacity
              </label>
              <input
                type="number"
                min="1"
                max="200"
                required
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Equipment Available
            </label>
            <div className="grid grid-cols-3 gap-2">
              {equipmentOptions.map(equipment => (
                <label key={equipment} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.equipment.includes(equipment)}
                    onChange={(e) => handleEquipmentChange(equipment, e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{equipment}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Available Days
            </label>
            <div className="grid grid-cols-3 gap-2">
              {days.map(day => (
                <label key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.availability.includes(day)}
                    onChange={(e) => handleAvailabilityChange(day, e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {editingRoom ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default RoomsPage;