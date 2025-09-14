import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FacultyPage from './pages/FacultyPage';
import RoomsPage from './pages/RoomsPage';
import SubjectsPage from './pages/SubjectsPage';
import BatchPage from './pages/BatchPage';
import ConstraintsPage from './pages/ConstraintsPage';
import SchedulerPage from './pages/SchedulerPage';
import TimetableView from './pages/TimetableView';
import ApprovalPage from './pages/ApprovalPage';
import ReportsPage from './pages/ReportsPage';
import Layout from './components/Layout';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
        <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="subjects" element={<SubjectsPage />} />
          <Route path="batches" element={<BatchPage />} />
          <Route path="constraints" element={<ConstraintsPage />} />
          <Route path="scheduler" element={<SchedulerPage />} />
          <Route path="timetable" element={<TimetableView />} />
          <Route path="approval" element={<ApprovalPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route index element={<Navigate to="/dashboard" />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
}

export default App;