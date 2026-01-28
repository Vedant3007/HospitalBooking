# Hospital Appointment Booking System

This project is a Kubernetes-ready, microservices-based Healthcare Appointment Booking System. It includes authentication, backend API, email notifications, monitoring, and a React-based frontend — all containerized and orchestrated through Docker Compose (and compatible with Kubernetes).

---

## Project Structure
├── auth-service/ # JWT-based authentication API
├── backend/ # Appointment API and database logic
├── database/ # PostgreSQL schema and init scripts
├── frontend/ # React-based UI for booking and viewing appointments
├── monitoring/ # Prometheus configuration for metrics and Grafana for Graphical Visualisation
├── notification-service/ # Email notification service using SendGrid, Twilio and Postfix
└── docker-compose.yml # Orchestrates all services for local deployment (All-in-one docker deployment code)
└── Deployment Files/ # Contains YAML files for deploying each service individually


---

## 1.	`auth-service/`

- Purpose: Handles secure login with hardcoded user credentials (admin/doctor roles).
- Tech: Node.js, Express, JWT
- Port: `5001`
- Key Files:
  - `auth.js`: Authentication API
  - `.env`: Contains `JWT_SECRET`
  - `Dockerfile`


## 2.	`backend/`

- Purpose: Manages appointment booking and fetching.
- Tech: Node.js, Express, PostgreSQL
- Port: `5000`
- Prometheus Metrics: `/metrics` endpoint exposed
- Key Features:
  - `server.js`: REST API for booking and retrieving appointments
  - Calls `notification-service` to send confirmation emails
  - `.env` for DB and secret configs
  - `Dockerfile`


## 3. `database/`

- Purpose: Initializes PostgreSQL with necessary tables.
- Tech: PostgreSQL
- Key Files:
  - `init.sql`: Creates `appointments` and `users` tables
- Kubernetes Support: StatefulSet + PersistentVolumeClaim ready


## 4. `frontend/`

- Purpose: React UI for login, booking, and viewing appointments
- Tech: React, react-router-dom
- Port: `3000`
- Pages:
  - `/` – Login page
  - `/dashboard` – Appointment booking form
  - `/appointment` – Table view of all booked appointments
- Key Files:
  - `AppointmentForm.js`, `AppointmentList.js`, `AppointmentsPage.js`, `App.js`


## 5. `monitoring/`

- Purpose: Prometheus setup for service-level monitoring
- Tech: Prometheus
- Port: `9090`
- Key Files:
  - `prometheus.yml`: Scrapes metrics from `backend`, `auth-service`, and `notification-service`


## 6. `notification-service/`

- Purpose: Sends real-time email alerts to patients using SendGrid
- Tech: Node.js, Express, SendGrid API
- Port: `5002`
- Key Files:
  - `notify.js`: Accepts `/notify` POST requests to send email
  - `.env`: Includes `SENDGRID_API_KEY`, `SENDGRID_SENDER`
  - `Dockerfile`


## 7. `docker-compose.yml`

- Purpose: Launches all services locally
- Recommended for demonstration and quick setup
- Includes:
  - Auth service
  - Backend API
  - PostgreSQL database
  - Frontend
  - Notification service
  - Prometheus


## 8. `Deployment Files/`
- Purpose: For individual deployment of each services using Docker
- Key Files:
  - `deployment files`- Contains all Kubernetes YAML files to deploy and manage the app components.
  - `services` -  Expose pods to allow communication within the cluster or with users.
  - `secrets` - Securely store sensitive data like API keys and passwords.
  - `configmap`- Store non-sensitive configuration data used by containers.
  - `fluentd-daemonset` - Collects logs from all pods for centralized logging.


---

### How to Run:

## Option 1 (Recommended): Use Docker Compose
In the terminal, execute the following command -
	docker-compose up --build

Description -
- It brings up all services
- It is easiest for local testing
- It executes in the quickest all-in-one manner


## Option 2: Use Kubernetes YAML files (kept inside the Deployment Files folder)
In the terminal, execute command such as -
	kubectl apply -f frontend-deployment.yaml
(Replace frontend-deployment.yaml with other file names to deploy each individually)

Description -
- May take a few minutes to deploy each individually
- Gives more control over resource scaling, secrets, Persistent-Volumes, and HPA

---

Thank you for reviewing my project. It demonstrates a complete microservices-based hospital booking system with Kubernetes support, real-time alerts, observability, and secure design — all ready to scale in production environments.

I would like to thank my peers for their active engagement and my tutors for their guidance and encouragement throughout this unit.