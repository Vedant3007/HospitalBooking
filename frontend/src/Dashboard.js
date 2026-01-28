import React from 'react';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList'; // Import the new component

function Dashboard() {
  return (
    <div
      style={{
        backgroundImage: "url('https://www.vhba.vic.gov.au/sites/default/files/styles/banner_1440x560/public/2023-07/VHBA-Hospital-Infrastructure-Delivery-Fund-istock-healthcare-worker-with-patient-in-hospital-setting-banner-1440x560.jpg?itok=1-5e3eSy')",
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '40px',
        color: 'white',
      }}
    >
      <h1>Welcome to the Hospital Dashboard</h1>
      <AppointmentForm />
    </div>
  );
}

export default Dashboard;
