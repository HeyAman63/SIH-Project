import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import TableView from '../components/TableView';
import Modal from '../components/Modal';

interface BatchForm {
  name: string;
  department: string;
  semester: number;
  strength: number;
  subjects: string[];
}

const initialForm: BatchForm = {
  name: '',
  department: '',
  semester: 1,
  strength: 30,
  subjects: []
};

function BatchPage() {
  const { batches, subjects, addBatch, updateBatch, deleteBatch } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<any>(null);
  const [formData, setFormData] = useState<BatchForm>(initialForm);

  const columns = [
    { key: 'name', label: 'Batch Name' },
    { key: 'department', label: 'Department' },
    { key: 'semester', label: 'Semester' },
    { key: 'strength', label: 'Students' },
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
    setEditingBatch(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleEdit = (batch: any) => {
    setEditingBatch(batch);
    setFormData({
      name: batch.name,
      department: batch.department,
      semester: batch.semester,
      strength: batch.strength,
      subjects: batch.subjects
    });
    setIsModalOpen(true);
  };

  const handleDelete = (batch: any) => {
    if (confirm('Are you sure you want to delete this batch?')) {
      deleteBatch(batch.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingBatch) {
      updateBatch(editingBatch.id, formData);
    } else {
      addBatch(formData);
    }
    
    setIsModalOpen(false);
    setFormData(initialForm);
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
        <h1 className="text-3xl font-bold text-gray-900">Batch Management</h1>
      </div>

      <TableView
        columns={columns}
        data={batches}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addButtonText="Add Batch"
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBatch ? 'Edit Batch' : 'Add Batch'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Batch Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., CS-3rd Year-A"
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
                placeholder="e.g., Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Semester
              </label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData(prev => ({ ...prev, semester: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Student Strength
              </label>
              <input
                type="number"
                min="1"
                max="200"
                required
                value={formData.strength}
                onChange={(e) => setFormData(prev => ({ ...prev, strength: parseInt(e.target.value) }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subjects
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {subjects.map(subject => (
                <label key={subject.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject.id)}
                    onChange={(e) => handleSubjectChange(subject.id, e.target.checked)}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{subject.name} ({subject.code})</span>
                </label>
              ))}
            </div>
            {subjects.length === 0 && (
              <p className="text-sm text-gray-500 italic">No subjects available. Please add subjects first.</p>
            )}
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
              {editingBatch ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default BatchPage;