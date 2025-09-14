import React, { createContext, useContext, useState } from 'react';

interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  availability: string[];
  maxHoursPerDay: number;
  subjects: string[];
}

interface Room {
  id: string;
  name: string;
  type: 'classroom' | 'lab';
  capacity: number;
  equipment: string[];
  availability: string[];
}

interface Subject {
  id: string;
  name: string;
  code: string;
  department: string;
  credits: number;
  sessionsPerWeek: number;
  duration: number;
  type: 'theory' | 'lab';
}

interface Batch {
  id: string;
  name: string;
  department: string;
  semester: number;
  strength: number;
  subjects: string[];
}

interface TimetableSlot {
  id: string;
  dayOfWeek: number;
  timeSlot: string;
  subject: string;
  faculty: string;
  room: string;
  batch: string;
  status: 'confirmed' | 'tentative' | 'conflict';
}

interface DataContextType {
  faculty: Faculty[];
  rooms: Room[];
  subjects: Subject[];
  batches: Batch[];
  timetable: TimetableSlot[];
  addFaculty: (faculty: Omit<Faculty, 'id'>) => void;
  updateFaculty: (id: string, faculty: Partial<Faculty>) => void;
  deleteFaculty: (id: string) => void;
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (id: string, room: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  addBatch: (batch: Omit<Batch, 'id'>) => void;
  updateBatch: (id: string, batch: Partial<Batch>) => void;
  deleteBatch: (id: string) => void;
  generateTimetable: () => Promise<void>;
  updateTimetableSlot: (id: string, updates: Partial<TimetableSlot>) => void;
}

const mockFaculty: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@university.edu',
    department: 'Computer Science',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    maxHoursPerDay: 6,
    subjects: ['1', '2']
  },
  {
    id: '2',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@university.edu',
    department: 'Computer Science',
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    maxHoursPerDay: 8,
    subjects: ['3', '4']
  }
];

const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Room 101',
    type: 'classroom',
    capacity: 60,
    equipment: ['Projector', 'Whiteboard', 'AC'],
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  {
    id: '2',
    name: 'Lab 201',
    type: 'lab',
    capacity: 30,
    equipment: ['Computers', 'Projector', 'AC'],
    availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  }
];

const mockSubjects: Subject[] = [
  {
    id: '1',
    name: 'Data Structures',
    code: 'CS201',
    department: 'Computer Science',
    credits: 4,
    sessionsPerWeek: 4,
    duration: 60,
    type: 'theory'
  },
  {
    id: '2',
    name: 'Database Systems',
    code: 'CS301',
    department: 'Computer Science',
    credits: 3,
    sessionsPerWeek: 3,
    duration: 60,
    type: 'theory'
  }
];

const mockBatches: Batch[] = [
  {
    id: '1',
    name: 'CS-2nd Year-A',
    department: 'Computer Science',
    semester: 3,
    strength: 45,
    subjects: ['1', '2']
  },
  {
    id: '2',
    name: 'CS-3rd Year-B',
    department: 'Computer Science',
    semester: 5,
    strength: 38,
    subjects: ['2']
  }
];

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [faculty, setFaculty] = useState<Faculty[]>(mockFaculty);
  const [rooms, setRooms] = useState<Room[]>(mockRooms);
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);

  const addFaculty = (newFaculty: Omit<Faculty, 'id'>) => {
    const id = Date.now().toString();
    setFaculty([...faculty, { ...newFaculty, id }]);
  };

  const updateFaculty = (id: string, updates: Partial<Faculty>) => {
    setFaculty(faculty.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const deleteFaculty = (id: string) => {
    setFaculty(faculty.filter(f => f.id !== id));
  };

  const addRoom = (newRoom: Omit<Room, 'id'>) => {
    const id = Date.now().toString();
    setRooms([...rooms, { ...newRoom, id }]);
  };

  const updateRoom = (id: string, updates: Partial<Room>) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteRoom = (id: string) => {
    setRooms(rooms.filter(r => r.id !== id));
  };

  const addSubject = (newSubject: Omit<Subject, 'id'>) => {
    const id = Date.now().toString();
    setSubjects([...subjects, { ...newSubject, id }]);
  };

  const updateSubject = (id: string, updates: Partial<Subject>) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const addBatch = (newBatch: Omit<Batch, 'id'>) => {
    const id = Date.now().toString();
    setBatches([...batches, { ...newBatch, id }]);
  };

  const updateBatch = (id: string, updates: Partial<Batch>) => {
    setBatches(batches.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const deleteBatch = (id: string) => {
    setBatches(batches.filter(b => b.id !== id));
  };

  const generateTimetable = async (): Promise<void> => {
    // Simulate AI optimization process
    const mockTimetable: TimetableSlot[] = [
      {
        id: '1',
        dayOfWeek: 1,
        timeSlot: '09:00-10:00',
        subject: '1',
        faculty: '1',
        room: '1',
        batch: '1',
        status: 'confirmed'
      },
      {
        id: '2',
        dayOfWeek: 1,
        timeSlot: '10:00-11:00',
        subject: '2',
        faculty: '2',
        room: '1',
        batch: '2',
        status: 'confirmed'
      },
      {
        id: '3',
        dayOfWeek: 2,
        timeSlot: '09:00-10:00',
        subject: '2',
        faculty: '2',
        room: '2',
        batch: '1',
        status: 'tentative'
      }
    ];

    await new Promise(resolve => setTimeout(resolve, 3000));
    setTimetable(mockTimetable);
  };

  const updateTimetableSlot = (id: string, updates: Partial<TimetableSlot>) => {
    setTimetable(timetable.map(slot => slot.id === id ? { ...slot, ...updates } : slot));
  };

  return (
    <DataContext.Provider value={{
      faculty,
      rooms,
      subjects,
      batches,
      timetable,
      addFaculty,
      updateFaculty,
      deleteFaculty,
      addRoom,
      updateRoom,
      deleteRoom,
      addSubject,
      updateSubject,
      deleteSubject,
      addBatch,
      updateBatch,
      deleteBatch,
      generateTimetable,
      updateTimetableSlot
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}