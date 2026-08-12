<div align="center">

# 🎯 AI Job Application CRM

**A full-stack Job Application Tracking System** built with Spring Boot & React — manage your entire job hunt in one place.

[![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.1.0-brightgreen?style=flat-square&logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-4169E1?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

</div>

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register/login with token-based auth
- 📋 **Job Application Tracking** — Create, update, filter and search all your applications
- 📊 **Dashboard & Analytics** — Visual charts showing application status breakdown
- 🕓 **Status History Timeline** — Track every status change per application
- 📎 **Resume Upload** — Attach resume files directly to job applications
- 🔔 **Email Reminders** — Schedule interview/follow-up reminders via Gmail SMTP
- 📱 **Fully Responsive** — Mobile-first design with sidebar navigation
- 🐳 **Docker Ready** — One-command deployment with Docker Compose

---

## 🛠️ Tech Stack

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Java | 17 | Core language |
| Spring Boot | 4.1.0 | Application framework |
| Spring Security + OAuth2 | — | JWT authentication |
| Spring Data JPA | — | Database ORM |
| PostgreSQL | 17 | Relational database |
| Spring Mail | — | Email reminder service |
| Lombok | — | Boilerplate reduction |

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| TypeScript | 6.0 | Type safety |
| Vite | 8 | Build tool |
| Tailwind CSS | 3.4 | Styling |
| Recharts | 3 | Dashboard charts |
| Axios | 1.19 | HTTP client |
| React Router | 7 | Client-side routing |

### DevOps
| Technology | Purpose |
|---|---|
| Docker + Docker Compose | Containerisation & orchestration |
| Nginx | Frontend serving + API reverse proxy |
| GitHub | Source control |

---

## 🏗️ Architecture

```
[Browser]
    │
    ▼
[Nginx :80]  ──► React SPA (static)
    │
    └─/api/*──► [Spring Boot :8080]
                      │
                      ▼
               [PostgreSQL :5432]
```

Nginx serves the React frontend and reverse-proxies all `/api` calls to the Spring Boot backend — no CORS issues, single port exposed to the world.

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Node.js 22+
- PostgreSQL 17
- Maven 3.9+

### 1. Clone the repository
```bash
git clone https://github.com/Lucifer6296/ai-job-application-crm.git
cd ai-job-application-crm
```

### 2. Set up the database
```sql
CREATE DATABASE jobtracker;
```

### 3. Configure environment
Create a `.env` file in the project root (or set these as environment variables):
```env
POSTGRES_DB=jobtracker
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
JWT_SECRET=your-long-random-secret-key-here
MAIL_USERNAME=your@gmail.com
MAIL_PASSWORD=your_gmail_app_password
```

### 4. Run the backend
```bash
./mvnw spring-boot:run
# Backend starts on http://localhost:8080
```

### 5. Run the frontend
```bash
cd frontend
npm install
npm run dev
# Frontend starts on http://localhost:5174
```

---

## 🐳 Docker Deployment (Recommended)

Run the entire stack with a single command:

```bash
# 1. Copy and fill in secrets
cp .env.example .env   # edit with your values

# 2. Build and start all services
docker compose up --build -d

# 3. Open the app
open http://localhost
```

**Services started:**
| Service | Container | Port |
|---|---|---|
| PostgreSQL | `jobtracker-db` | internal |
| Spring Boot API | `jobtracker-backend` | internal |
| React + Nginx | `jobtracker-frontend` | **80** |

Data is persisted via named Docker volumes (`postgres_data`, `uploads_data`).

```bash
# View logs
docker compose logs -f backend

# Stop everything
docker compose down

# Stop and remove all data
docker compose down -v
```

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users/register` | Register new user |
| `POST` | `/api/auth/login` | Login, returns JWT |

### Jobs
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/jobs` | Get all jobs for current user |
| `POST` | `/api/jobs` | Create a new job application |
| `GET` | `/api/jobs/{id}` | Get job by ID |
| `PUT` | `/api/jobs/{id}` | Update a job |
| `DELETE` | `/api/jobs/{id}` | Delete a job |
| `GET` | `/api/jobs/{id}/history` | Get status change history |
| `GET` | `/api/jobs/dashboard` | Get dashboard stats |
| `GET` | `/api/jobs/search?company=` | Search by company name |

### Reminders
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/reminders` | Get all reminders |
| `POST` | `/api/reminders` | Create a reminder |
| `DELETE` | `/api/reminders/{id}` | Delete a reminder |

### Resume
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/jobs/{id}/resume` | Upload resume for a job |
| `GET` | `/uploads/{filename}` | Download uploaded resume |

---

## 📁 Project Structure

```
ai-job-application-crm/
├── src/                          # Spring Boot backend
│   └── main/java/com/tamal/jobtracker/
│       ├── auth/                 # JWT auth (login, token generation)
│       ├── config/               # Security & CORS config
│       ├── job/                  # Job CRUD + resume upload
│       ├── history/              # Status change history
│       ├── reminder/             # Reminders + email scheduler
│       ├── dashboard/            # Analytics/stats
│       ├── storage/              # File upload service
│       └── user/                 # User management
├── frontend/                     # React + Vite frontend
│   ├── src/
│   │   ├── api/                  # Axios API clients
│   │   ├── components/           # Reusable UI components
│   │   ├── context/              # Auth context
│   │   ├── hooks/                # Custom hooks
│   │   ├── pages/                # Route pages
│   │   └── types/                # TypeScript types
│   ├── Dockerfile                # Multi-stage frontend build
│   └── nginx.conf                # Nginx SPA + proxy config
├── Dockerfile                    # Multi-stage backend build
├── docker-compose.yml            # Full stack orchestration
└── .env                          # Environment secrets (gitignored)
```

---

## 🔧 Environment Variables Reference

| Variable | Description | Default |
|---|---|---|
| `DB_HOST` | PostgreSQL host | `localhost` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `POSTGRES_DB` | Database name | `jobtracker` |
| `POSTGRES_USER` | DB username | `postgres` |
| `POSTGRES_PASSWORD` | DB password | — |
| `JWT_SECRET` | Secret key for signing JWTs | — |
| `MAIL_USERNAME` | Gmail address for reminders | — |
| `MAIL_PASSWORD` | Gmail App Password | — |

> **Note:** For Gmail, generate an [App Password](https://support.google.com/accounts/answer/185833) — do not use your regular Gmail password.

---

## 📸 Screenshots

> Dashboard, Applications list, Job Details with status timeline, Reminders — coming soon.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/Lucifer6296">Lucifer6296</a>
</div>
