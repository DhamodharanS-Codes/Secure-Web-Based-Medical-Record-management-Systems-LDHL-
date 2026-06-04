
# Lifetime Digital Health Locker

## Overview

Lifetime Digital Health Locker is a secure web-based healthcare record management system that enables patients to store, manage, and share their medical records digitally. The platform provides role-based access control for Patients, Doctors, and Administrators while maintaining security, transparency, and accountability through audit logging and alert monitoring.

This project was developed as a Final Year M.Sc. Computer Science project to demonstrate secure full-stack web application development using modern technologies.

---

## Features

### Authentication & Authorization

* User Registration and Login
* JWT-Based Authentication
* Role-Based Access Control (RBAC)
* Protected API Routes

### Patient Module

* Upload Medical Records
* View Personal Records
* Secure Record Management
* Alert Notifications

### Doctor Module

* Role-Protected Dashboard
* Patient Record Access (with permissions)
* Access Request Management

### Admin Module

* Monitor Audit Logs
* View Security Alerts
* Manage System Activities
* Track User Actions

### Audit Logging

* Login Tracking
* Medical Record Upload Tracking
* Record Access Monitoring
* Unauthorized Access Detection
* Timestamped Activity Logs

### Security Features

* JWT Authentication
* Protected Backend Routes
* Audit Trail System
* Security Alert Generation
* Role-Based Authorization
* Secure File Upload Handling

---

## Technology Stack

### Frontend

* React.js
* React Router
* Axios
* CSS3

### Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication
* Multer

### Database

* MySQL

---

## System Architecture

Patient / Doctor / Admin
↓
React Frontend
↓
Express REST API
↓
Authentication & Authorization Layer
↓
MySQL Database
↓
Medical Records, Audit Logs, Alerts

---

## Database Tables

### users

Stores user account information and roles.

### medical_records

Stores uploaded medical record information.

### audit_logs

Stores all important user activities.

### audit_alerts

Stores security and activity alerts.

### permissions

Manages doctor access permissions for patient records.

---

## Project Workflow

### User Authentication

1. User logs in using email and password.
2. Backend validates credentials.
3. JWT token is generated.
4. User role is embedded in the token.
5. Frontend stores token for future requests.

### Medical Record Upload

1. Patient uploads a medical record.
2. Multer processes the file upload.
3. Record metadata is stored in MySQL.
4. Audit log entry is created.
5. Security alert is generated.

### Doctor Access Flow

1. Doctor requests access to patient records.
2. Permission request is recorded.
3. Access is granted based on approval.
4. All access activities are logged.

---

## Security Implementation

* JWT Authentication
* Role-Based Access Control
* Protected API Endpoints
* Audit Logging System
* Security Alert Monitoring
* Secure File Upload Processing

---

## Future Enhancements

* Doctor Approval Workflow
* Email Notifications
* Record Categories
* Advanced Search & Filters
* Download Protection
* Password Encryption with bcrypt
* Dashboard Analytics
* Cloud Storage Integration

---

## Installation

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### Database

1. Create a MySQL database.
2. Import the provided SQL schema.
3. Configure database credentials in the `.env` file.

---

## Environment Variables

Create a `.env` file inside the backend folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=lifetime_health_locker
JWT_SECRET=your_secret_key
```

---

## Learning Outcomes

This project demonstrates practical implementation of:

* Full Stack Web Development
* Authentication and Authorization
* RESTful API Development
* Secure File Management
* Database Design
* Audit Logging
* Healthcare Data Security

---

## Author

**Dhamodharan S**
M.Sc. Computer Science
Final Year Project

---

## License

This project is developed for academic and educational purposes.
