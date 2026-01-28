import React, { useState } from 'react';
import axios from 'axios';

function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    doctor: '',
    date: '',
    time: '',
    symptoms: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/appointments', formData);
      alert('Appointment booked!');
    } catch (err) {
      alert('Error booking appointment.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
      <h2>Book Appointment</h2>
      <input type="text" name="name" placeholder="Patient Name" onChange={handleChange} required />
      <input type="text" name="doctor" placeholder="Doctor Name" onChange={handleChange} required />
      <input type="date" name="date" onChange={handleChange} required />
      <input type="time" name="time" onChange={handleChange} required />
      <textarea name="symptoms" placeholder="Symptoms" onChange={handleChange} required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default AppointmentForm;
