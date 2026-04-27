# Gym Workout Tracker API

A REST API for logging and tracking gym workouts, exercises, and performance logs.

## Links

- **GitHub Repository:** https://github.com/ShreyamPatel22/gym-workout-tracker-api
- **Live API:** https://gym-workout-tracker-api.onrender.com
- **Swagger UI:** https://gym-workout-tracker-api.onrender.com/api-docs

## Seed Credentials

| Role  | Email               | Password  |
|-------|---------------------|-----------|
| Admin | admin@example.com   | admin123  |
| User  | john@example.com    | user123   |

## Tech Stack

- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT Authentication
- bcrypt Password Hashing
- Swagger UI (OpenAPI 3.0)
- Deployed on Render

---

# Testing Plan

**Swagger UI:** https://gym-workout-tracker-api.onrender.com/api-docs

## Setup
All protected endpoints require a JWT:
1. Use `POST /api/auth/login` to get a token
2. Click **Authorize** at the top of Swagger UI
3. Paste the token and click **Authorize**

---

## POST /api/auth/signup
**Access Control:** Public

**Success (201):**
- Click Try it out, use:
```json
{
  "first_name": "Test",
  "last_name": "User",
  "email": "test@example.com",
  "password": "password123"
}
