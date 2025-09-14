import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import TableView from '../components/TableView';
import Modal from '../components/Modal';

interface FacultyForm {
  name: string;
  email: string;
  department: string;
  availability: string[];
  maxHoursPerDay: number;
  subjects: string[];
}

const initialForm: FacultyForm = {
  name: '',
  email: '',
  department: '',
  availability: [],
  maxHoursPerDay: 8,
  subjects: []
};

function FacultyPage() {
  const { faculty, subjects, addFaculty, updateFaculty, deleteFaculty } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<any>(null);
  const [formData, setFormData] = useState<FacultyForm>(initialForm);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
    { 
      key: 'availability', 
      label: 'Available Days',
      render: (value: string[]) => value.join(', ')
    },
    { key: 'maxHoursPerDay', label: 'Max Hours/Day' },
    {
      key: 'subjects',
      label: 'Subjects',
      render: (value: string[]) => {
        const subjectNames = value.map(id => 
          subjects.find(s => s.id === id)?.name || id
        );
        return subjectNames.join(', ');
      }
    }
  ];

  const handleAdd = () => {
    setEditingFaculty(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleEdit = (faculty: any) => {
    setEditingFaculty(faculty);
    setFormData({
      name: faculty.name,
      email: faculty.email,
      department: faculty.department,
      availability: faculty.availability,
      maxHoursPerDay: faculty.maxHoursPerDay,
      subjects: faculty.subjects
    });
    setIsModalOpen(true);
  };

  const handleDelete = (faculty: any) => {
    if (confirm('Are you sure you want to delete this faculty member?')) {
      deleteFaculty(faculty.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingFaculty) {
      updateFaculty(editingFaculty.id, formData);
    } else {
      addFaculty(formData);
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

  const handleSubjectChange = (subjectId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        subjects: [...prev.subjects, subjectId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        subjects: prev.subjects.filter(id => id !== subjectId)
      }));
    }
  };

  return (
    <div className="space-y-6 mt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Faculty Management</h1>
      </div>

      <TableView
        columns={columns}
        data={faculty}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonText="Add Faculty"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingFaculty ? 'Edit Faculty' : 'Add Faculty'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
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
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                required
                value={formData.department}
                onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Hours Per Day
              </label>
              <input
                type="number"
                min="1"
                max="12"
                required
                value={formData.maxHoursPerDay}
                onChange={(e) => setFormData(prev => ({ ...prev, maxHoursPerDay: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subjects
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {subjects.map(subject => (
                <label key={subject.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject.id)}
                    onChange={(e) => handleSubjectChange(subject.id, e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{subject.name}</span>
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
              {editingFaculty ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default FacultyPage;