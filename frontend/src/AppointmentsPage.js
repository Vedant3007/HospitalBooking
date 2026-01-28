import React from 'react';
import AppointmentList from './AppointmentList';

function AppointmentsPage() {
  return (
    <div style={{ padding: '40px', background: '#f2f2f2', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '20px' }}>All Booked Appointments</h1>
      <AppointmentList />
    </div>
  );
}

export default AppointmentsPage;
