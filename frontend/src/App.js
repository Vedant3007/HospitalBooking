import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import AppointmentsPage from './AppointmentsPage'; // Import the new page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appointment" element={<AppointmentsPage />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;
