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
```
- Expect 201 with user object

**400 Bad Request:**
- Remove `email` field → Expect 400

**409 Conflict:**
- Use `"email": "admin@example.com"` → Expect 409

---

## POST /api/auth/login
**Access Control:** Public

**Success (200):**
```json
{ "email": "admin@example.com", "password": "admin123" }
```
- Expect 200 with token

**400 Bad Request:**
- Remove `password` field → Expect 400

**401 Unauthorized:**
- Use `"password": "wrongpassword"` → Expect 401

---

## POST /api/workouts
**Access Control:** Authenticated users only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

Copy token → click Authorize

**Success (201):**
```json
{ "name": "Chest Day", "description": "Upper body" }
```
- Expect 201 with workout object

**400 Bad Request:**
- Remove `name` field → Expect 400

**401 Unauthorized:**
- Remove JWT → Expect 401

---

## GET /api/workouts
**Access Control:** Authenticated users only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

**Success (200):**
- Execute → Expect 200 with array of user's workouts

**401 Unauthorized:**
- Remove JWT → Expect 401

---

## GET /api/workouts/{id}
**Access Control:** Owner only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

**Success (200):**
- Use a workout ID from GET /api/workouts → Expect 200

**400 Bad Request:**
- Use id: `invalid-uuid` → Expect 400

**401 Unauthorized:**
- Remove JWT → Expect 401

**403 Forbidden:**
- Login with:
  - Email: `admin@example.com`
  - Password: `admin123`
- Use a workout ID belonging to `john@example.com` → Expect 403

**404 Not Found:**
- Use id: `a1b2c3d4-e5f6-7890-abcd-ef1234567890` → Expect 404

---

## PUT /api/workouts/{id}
**Access Control:** Owner only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

Get workout ID from GET /api/workouts

**Success (200):**
```json
{ "name": "Updated Chest Day", "description": "Updated" }
```
- Expect 200 with updated workout

**400 Bad Request:**
- Remove `name` field → Expect 400

**401 Unauthorized:**
- Remove JWT → Expect 401

**403 Forbidden:**
- Login with:
  - Email: `admin@example.com`
  - Password: `admin123`
- Use john's workout ID → Expect 403

**404 Not Found:**
- Use id: `a1b2c3d4-e5f6-7890-abcd-ef1234567890` → Expect 404

---

## DELETE /api/workouts/{id}
**Access Control:** Owner only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

**Success (204):**
- Use a workout ID owned by logged in user → Expect 204

**401 Unauthorized:**
- Remove JWT → Expect 401

**403 Forbidden:**
- Login with:
  - Email: `admin@example.com`
  - Password: `admin123`
- Use john's workout ID → Expect 403

**404 Not Found:**
- Use id: `a1b2c3d4-e5f6-7890-abcd-ef1234567890` → Expect 404

---

## POST /api/exercises
**Access Control:** Admin only

**Setup:** Login with:
- Email: `admin@example.com`
- Password: `admin123`

**Success (201):**
```json
{ "name": "Shoulder Press", "muscle_group": "Shoulders" }
```
- Expect 201 with exercise object

**400 Bad Request:**
- Remove `muscle_group` → Expect 400

**401 Unauthorized:**
- Remove JWT → Expect 401

**403 Forbidden:**
- Login with:
  - Email: `john@example.com`
  - Password: `user123`
- Expect 403

**409 Conflict:**
- Use `"name": "Bench Press"` → Expect 409

---

## GET /api/exercises
**Access Control:** Authenticated users only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

**Success (200):**
- Execute → Expect 200 with array of 4 exercises

**401 Unauthorized:**
- Remove JWT → Expect 401

---

## GET /api/exercises/{id}
**Access Control:** Authenticated users only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

**Success (200):**
- Use an exercise ID from GET /api/exercises → Expect 200

**400 Bad Request:**
- Use id: `invalid-uuid` → Expect 400

**401 Unauthorized:**
- Remove JWT → Expect 401

**404 Not Found:**
- Use id: `a1b2c3d4-e5f6-7890-abcd-ef1234567890` → Expect 404

---

## PUT /api/exercises/{id}
**Access Control:** Admin only

**Setup:** Login with:
- Email: `admin@example.com`
- Password: `admin123`

**Success (200):**
- Use an exercise ID from GET /api/exercises
```json
{ "name": "Barbell Bench Press", "muscle_group": "Chest" }
```
- Expect 200 with updated exercise

**401 Unauthorized:**
- Remove JWT → Expect 401

**403 Forbidden:**
- Login with:
  - Email: `john@example.com`
  - Password: `user123`
- Expect 403

**404 Not Found:**
- Use id: `a1b2c3d4-e5f6-7890-abcd-ef1234567890` → Expect 404

---

## DELETE /api/exercises/{id}
**Access Control:** Admin only

**Setup:** Login with:
- Email: `admin@example.com`
- Password: `admin123`

**Success (204):**
- Use an exercise ID → Expect 204

**401 Unauthorized:**
- Remove JWT → Expect 401

**403 Forbidden:**
- Login with:
  - Email: `john@example.com`
  - Password: `user123`
- Expect 403

**404 Not Found:**
- Use id: `a1b2c3d4-e5f6-7890-abcd-ef1234567890` → Expect 404

---

## POST /api/workoutlogs
**Access Control:** Authenticated users only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

Get a workout ID from GET /api/workouts and an exercise ID from GET /api/exercises

**Success (201):**
```json
{
  "workout_id": "<john's workout id>",
  "exercise_id": "<exercise id>",
  "sets": 3,
  "reps": 10,
  "weight": 135,
  "notes": "Felt strong today"
}
```
- Expect 201 with workout log object

**400 Bad Request:**
- Remove `sets` field → Expect 400

**401 Unauthorized:**
- Remove JWT → Expect 401

**403 Forbidden:**
- Login with:
  - Email: `admin@example.com`
  - Password: `admin123`
- Use a workout ID belonging to `john@example.com` → Expect 403

**404 Not Found:**
- Use `"workout_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890"` → Expect 404

---

## GET /api/workoutlogs
**Access Control:** Authenticated users only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

**Success (200):**
- Execute → Expect 200 with array of user's workout logs

**401 Unauthorized:**
- Remove JWT → Expect 401

---

## GET /api/workoutlogs/{id}
**Access Control:** Owner only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

**Success (200):**
- Use a log ID from GET /api/workoutlogs → Expect 200

**400 Bad Request:**
- Use id: `invalid-uuid` → Expect 400

**401 Unauthorized:**
- Remove JWT → Expect 401

**403 Forbidden:**
- Login with:
  - Email: `admin@example.com`
  - Password: `admin123`
- Use a log ID belonging to `john@example.com` → Expect 403

**404 Not Found:**
- Use id: `a1b2c3d4-e5f6-7890-abcd-ef1234567890` → Expect 404

---

## PUT /api/workoutlogs/{id}
**Access Control:** Owner only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

Get a log ID from GET /api/workoutlogs

**Success (200):**
```json
{ "sets": 4, "reps": 12, "weight": 145, "notes": "Increased weight" }
```
- Expect 200 with updated log

**401 Unauthorized:**
- Remove JWT → Expect 401

**403 Forbidden:**
- Login with:
  - Email: `admin@example.com`
  - Password: `admin123`
- Use john's log ID → Expect 403

**404 Not Found:**
- Use id: `a1b2c3d4-e5f6-7890-abcd-ef1234567890` → Expect 404

---

## DELETE /api/workoutlogs/{id}
**Access Control:** Owner only

**Setup:** Login with:
- Email: `john@example.com`
- Password: `user123`

**Success (204):**
- Use a log ID owned by john → Expect 204

**401 Unauthorized:**
- Remove JWT → Expect 401

**403 Forbidden:**
- Login with:
  - Email: `admin@example.com`
  - Password: `admin123`
- Use john's log ID → Expect 403

**404 Not Found:**
- Use id: `a1b2c3d4-e5f6-7890-abcd-ef1234567890` → Expect 404
