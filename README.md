# Task Management System
# Deployment Links

## Frontend (Vercel)

https://prime-trade-ai-six.vercel.app/

## Backend API (Render)

https://primetradeai-funo.onrender.com

## Swagger Documentation

https://primetradeai-funo.onrender.com/api-docs

## GitHub Repository

https://github.com/Saurav09s/PrimeTradeAi

## Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL (Neon)
* Prisma ORM
* JWT Authentication
* bcrypt
* Swagger

### Frontend

* React.js
* Axios
* React Router DOM

## Features

* User Registration
* User Login
* JWT Authentication
* Role Based Access Control (Admin/User)
* Task CRUD Operations
* Protected Routes
* Input Validation
* Error Handling
* Task Completion Status
* Swagger API Documentation

## Setup

### Backend

```bash
npm install
npx prisma db push
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```

## Environment Variables

```env
DATABASE_URL=
JWT_SECRET=
PORT=5000
```

## API Endpoints

### Auth

* POST /api/v1/auth/register
* POST /api/v1/auth/login

### Tasks

* GET /api/v1/tasks
* POST /api/v1/tasks
* PUT /api/v1/tasks/:id
* DELETE /api/v1/tasks/:id

### Admin

* GET /api/v1/admin/users

## Scalability Notes

* JWT based stateless authentication
* Modular architecture
* Prisma ORM for database abstraction
* PostgreSQL for scalability
* Easy migration to microservices
* Redis caching can be added for frequently accessed resources
* Can be containerized using Docker

## Author

Saurav Suman
