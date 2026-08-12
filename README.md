# 🎯 AI Job Application CRM

A full-stack Job Application Tracking System built with Spring Boot, React, TypeScript, PostgreSQL, and Docker.

AI Job Application CRM helps job seekers manage their entire job hunt from one place — from tracking applications and resumes to monitoring status history, scheduling reminders, and receiving email notifications.

---

## ✨ Features

### 🔐 Authentication & Security

- JWT-based authentication
- Secure user registration and login
- BCrypt password hashing
- Protected REST APIs
- User-level authorization
- Users can access and modify only their own applications

### 📋 Job Application Management

- Create job applications
- Update application details
- Delete applications securely
- Track company, position, location, status and job link
- Automatically record application date
- Search applications by company
- Filter applications by status
- Pagination and sorting
- User-specific application listing

### 📊 Dashboard & Analytics

- Total applications
- Applied applications
- Interview applications
- Rejected applications
- Selected applications
- Visual application statistics
- User-specific dashboard data

### 🕓 Status History

Track every status change for an application:

```
Applied
   ↓
Interview
   ↓
Selected
```

Each transition is stored with its timestamp.

### 🔔 Reminder System

- Create reminders for applications
- Set reminder date and time
- View reminders for a job
- View all reminders belonging to the logged-in user
- Mark reminders as completed
- Automatic background reminder scheduler
- Prevent duplicate reminder emails

### 📧 Email Notifications

- Gmail SMTP integration
- Automatic reminder emails
- Scheduled reminder checking
- Email delivery tracking through `emailSent`
- Failed email attempts can be retried

### 📎 Resume Management

- Upload a resume for a job application
- Store resume metadata with the application
- Secure resume access based on job ownership
- Download attached resumes
- File storage handled separately from PostgreSQL

### 📱 Responsive UI

- Modern SaaS-style interface
- Responsive desktop and mobile layout
- Sidebar navigation
- Application cards/tables
- Dashboard charts
- Status badges
- Loading and error states

### 🐳 Docker

- Dockerized backend
- Dockerized frontend
- PostgreSQL container
- Docker Compose orchestration
- Persistent PostgreSQL data
- Persistent uploaded-file storage
- One-command local startup

---

## 🛠️ Tech Stack

### Backend

| Technology | Purpose |
|---|---|
| Java 17 | Core programming language |
| Spring Boot 4.1.0 | Backend framework |
| Spring Security | Authentication & authorization |
| JWT / OAuth2 Resource Server | Token-based security |
| Spring Data JPA | ORM / database access |
| PostgreSQL | Relational database |
| Spring Validation | Request validation |
| Spring Mail | Email notifications |
| Maven | Dependency management |
| Lombok | Boilerplate reduction |

### Frontend

| Technology | Purpose |
|---|---|
| React | UI framework |
| TypeScript | Type-safe frontend development |
| Vite | Frontend build tool |
| Tailwind CSS | Styling |
| Axios | HTTP client |
| React Router | Client-side routing |
| Recharts | Dashboard analytics |

### DevOps

| Technology | Purpose |
|---|---|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Nginx | Frontend serving and reverse proxy |
| Git / GitHub | Source control |

---

## 🏗️ Architecture

```
                     ┌─────────────────────┐
                     │      Browser        │
                     └──────────┬──────────┘
                                │
                                ▼
                     ┌─────────────────────┐
                     │   React + Nginx     │
                     │      Frontend       │
                     └──────────┬──────────┘
                                │
                          /api requests
                                │
                                ▼
                     ┌─────────────────────┐
                     │    Spring Boot      │
                     │       Backend       │
                     ├─────────────────────┤
                     │ Spring Security     │
                     │ JWT Authentication  │
                     │ Job Management      │
                     │ Reminders           │
                     │ Dashboard           │
                     │ Resume Storage      │
                     │ Email Scheduler     │
                     └───────┬───────┬─────┘
                             │       │
                             │       └─────────────► Gmail SMTP
                             │
                             ▼
                     ┌─────────────────────┐
                     │     PostgreSQL      │
                     └─────────────────────┘
```

---

## 🔐 Authentication Flow

```
User
  │
  ▼
Login
  │
  ▼
Spring Boot
  │
  ├── Verify email
  ├── Verify BCrypt password
  │
  ▼
JWT Token
  │
  ▼
Frontend stores token
  │
  ▼
Authorization: Bearer <JWT>
  │
  ▼
Spring Security
  │
  ▼
Protected API
```

The backend uses the authenticated user's identity from the JWT instead of trusting a client-provided `userId` for protected operations.

---

## 📁 Project Structure

```
ai-job-application-crm/
│
├── src/
│   └── main/
│       ├── java/com/tamal/jobtracker/
│       │
│       ├── auth/
│       │   ├── AuthController.java
│       │   ├── LoginRequest.java
│       │   └── JwtService.java
│       │
│       ├── config/
│       │   └── SecurityConfig.java
│       │
│       ├── user/
│       │   ├── User.java
│       │   ├── UserController.java
│       │   ├── UserService.java
│       │   └── UserRepository.java
│       │
│       ├── job/
│       │   ├── Job.java
│       │   ├── JobController.java
│       │   ├── JobService.java
│       │   ├── JobRepository.java
│       │   └── ResumeController.java
│       │
│       ├── history/
│       │   ├── JobStatusHistory.java
│       │   └── JobStatusHistoryRepository.java
│       │
│       ├── reminder/
│       │   ├── Reminder.java
│       │   ├── ReminderController.java
│       │   ├── ReminderService.java
│       │   ├── ReminderRepository.java
│       │   ├── ReminderScheduler.java
│       │   └── EmailService.java
│       │
│       ├── dashboard/
│       │   └── DashboardStats.java
│       │
│       ├── storage/
│       │   └── FileStorageService.java
│       │
│       └── exception/
│           ├── GlobalExceptionHandler.java
│           ├── UserNotFoundException.java
│           ├── JobNotFoundException.java
│           └── InvalidCredentialsException.java
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── types/
│   │   └── utils/
│   │
│   ├── Dockerfile
│   └── nginx.conf
│
├── Dockerfile
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Install:

- Java 17+
- Node.js
- Maven 3.9+
- PostgreSQL 17+
- Docker Desktop

---

### ⚙️ Environment Variables

Create a `.env` file using `.env.example`:

```env
POSTGRES_DB=jobtracker
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_database_password

JWT_SECRET=your_long_random_jwt_secret

MAIL_USERNAME=your_gmail@gmail.com
MAIL_PASSWORD=your_gmail_app_password
```

> **Gmail:** For email reminders, use a [Google App Password](https://support.google.com/accounts/answer/185833) instead of your normal Gmail password.

> **Never commit `.env` to GitHub.**

---

### 🐳 Docker Deployment

The recommended way to run the complete application is Docker Compose.

**Build and start:**

```bash
docker compose up --build -d
```

**Open:**

```
http://localhost
```

**Services**

| Container | Service |
|---|---|
| `jobtracker-db` | PostgreSQL |
| `jobtracker-backend` | Spring Boot API |
| `jobtracker-frontend` | React + Nginx |

**View logs**

```bash
docker compose logs -f backend
docker compose logs -f frontend
```

**Stop containers**

```bash
docker compose down
```

**Stop and remove containers + database volume**

```bash
docker compose down -v
```

---

### 💻 Local Development

**Backend** — from the project root:

```bash
./mvnw spring-boot:run
# http://localhost:8080
```

**Frontend** — from the `frontend/` directory:

```bash
npm install
npm run dev
# http://localhost:5174
```

---

## 📡 API Overview

All protected endpoints require:

```
Authorization: Bearer <JWT>
```

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users/register` | Register user |
| `POST` | `/api/auth/login` | Login and receive JWT |

### Jobs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/jobs` | Get authenticated user's jobs |
| `POST` | `/api/jobs` | Create job |
| `GET` | `/api/jobs/{id}` | Get job |
| `PUT` | `/api/jobs/{id}` | Update job |
| `DELETE` | `/api/jobs/{id}` | Delete job |
| `GET` | `/api/jobs/search?company=` | Search by company |
| `GET` | `/api/jobs/page?page=&size=&sort=` | Pagination and sorting |
| `GET` | `/api/jobs/{id}/history` | Status history |
| `GET` | `/api/jobs/dashboard` | Dashboard statistics |
| `POST` | `/api/jobs/{id}/resume` | Upload resume |
| `GET` | `/api/jobs/{id}/resume` | Download resume |

### Reminders

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/reminders` | Get authenticated user's reminders |
| `POST` | `/api/reminders/job/{jobId}` | Create reminder |
| `GET` | `/api/reminders/job/{jobId}` | Get job reminders |
| `PATCH` | `/api/reminders/{id}/complete` | Mark reminder completed |

---

## 📊 Dashboard

The dashboard provides user-specific analytics:

```
Total Applications
      │
      ├── Applied
      ├── Interview
      ├── Rejected
      └── Selected
```

---

## 🕓 Status History

Every status transition is stored with a timestamp:

```
Applied
   │
   ▼
Interview
   │
   ▼
Selected
```

---

## 🔔 Reminder & Email System

The scheduler runs periodically and checks reminders where:

```
completed = false
emailSent = false
reminderTime <= current time
```

When a reminder becomes due:

```
Reminder
   ↓
Scheduler
   ↓
EmailService
   ↓
Gmail SMTP
   ↓
User receives notification
```

After successful delivery, `emailSent = true` — preventing duplicate emails.

---

## 📎 Resume Management

Users can attach resumes to individual applications:

```
Job Application
      │
      └── Resume
           ├── Filename
           └── Storage Path
```

Resume files are stored outside PostgreSQL while metadata is linked to the application. Access is protected through the authenticated user's ownership of the application.

---

## 🛡️ Security

- JWT authentication
- BCrypt password hashing
- Bearer token authentication
- Protected API endpoints
- User-level authorization
- Ownership checks for jobs, reminders and resumes
- Request validation
- Global exception handling
- Secure authentication failure handling

```
User A JWT  →  User A Job  ✅
User B JWT  →  User A Job  ❌
```

---

## 🧪 Error Handling

Structured handling for common API failures:

```
400 → Validation error
401 → Authentication / invalid credentials
404 → Resource not found
500 → Unexpected server error
```

Global exception handling is implemented using Spring's controller advice mechanism.

---

## 📈 Future Improvements

- Advanced analytics
- Multiple resume versions
- Cover letter management
- Interview round tracking
- Calendar integration
- Cloud object storage for resumes
- Real-time notifications
- AI-powered resume/job matching
- Deployment monitoring

---

## ⭐ Project Highlights

This project demonstrates practical experience with:

`Java` `Spring Boot` `Spring Security` `JWT` `PostgreSQL` `JPA/Hibernate` `REST APIs` `React` `TypeScript` `Tailwind CSS` `Axios` `Docker` `Docker Compose` `Nginx` `Email Automation` `File Storage` `Authentication` `Authorization`

Built as a complete full-stack application to manage the modern job-search workflow.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/Lucifer6296">Lucifer6296</a>
</div>
