const client = require('prom-client');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Prometheus metrics setup
client.collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
});

app.use((req, res, next) => {
  res.on('finish', () => {
    httpRequestCounter.labels(req.method, req.path, res.statusCode).inc();
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Notification Service Running');
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

// Email notification endpoint
app.post('/notify', async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: 'Missing "to" or "message"' });
  }

  const email = {
    to: to,
    from: process.env.SENDGRID_SENDER, // Must be verified in SendGrid
    subject: 'HD Hospital Notification',
    text: message,
  };

  try {
    await sgMail.send(email);
    console.log(`Email sent to ${to}`);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (err) {
    console.error('SendGrid error:', err.message);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(5002, () => {
  console.log('Notification service listening on port 5002');
});
