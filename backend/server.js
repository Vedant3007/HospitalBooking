const axios = require('axios');
const client = require('prom-client');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

// Setup PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Initialize default metrics collection
client.collectDefaultMetrics();

// Optional: create a custom counter
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests received',
  labelNames: ['method', 'route', 'status_code']
});

// Test route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

app.get('/api/appointments', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM appointments');
    client.release();
    res.json(result.rows);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send('Server Error');
  }
});

// Appointment booking route
app.post('/api/appointments', async (req, res) => {
  console.log('POST /api/appointments hit with:', req.body);
  try {
    const { name, doctor, date, time, symptoms } = req.body;
    const client = await pool.connect();
    const result = await client.query(
      'INSERT INTO appointments (name, doctor, date, time, symptoms) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, doctor, date, time, symptoms]
    );
    client.release();

    const appointment = result.rows[0];

    // Send notification
    try {
      await axios.post('http://notification-service:5002/notify', {
        to: 'vedantpatel1st@gmail.com',
        message: `Dear ${appointment.name}, your appointment with Dr. ${appointment.doctor} is confirmed for ${appointment.date} at ${appointment.time}.`
      });
      console.log('Notification email sent.');
    } catch (notifyErr) {
      console.error('Failed to send email notification:', notifyErr.message);
    }

    res.json(appointment);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send('Server Error');
  }
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});
