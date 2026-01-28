import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get('http://localhost:5000/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    }

    fetchAppointments();
  }, []);

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '40px', color: 'black' }}>
      <h2>All Appointments</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>#</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Name</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Doctor</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Date</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Time</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>Symptoms</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, index) => (
            <tr key={a.id}>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{index + 1}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{a.name}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{a.doctor}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{a.date.slice(0, 10)}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{a.time}</td>
              <td style={{ borderBottom: '1px solid #eee', padding: '8px' }}>{a.symptoms}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;
