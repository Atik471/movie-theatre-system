# Movie Theater Booking System API

A robust RESTful API backend for a Movie Theater Booking System, built with Express.js, Prisma ORM, and PostgreSQL. It features Role-Based Access Control (RBAC), secure JWT authentication, and atomic transactions to prevent double-booking.

## Tech Stack

- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma v7](https://www.prisma.io/) (via `@prisma/adapter-pg`)
- **Authentication**: JWT (JSON Web Tokens) & `bcrypt`
- **Deployment**: Pre-configured for seamless [Railway](https://railway.app) deployments (dynamic Postgres connection injection).

## Core Features

- **Authentication & Authorization**
  - Secure registration and login.
  - Role-Based Access Control (`USER`, `ADMIN`).
- **Admin Privileges**
  - Full CRUD operations for **Movies** and **Showtimes**.
  - View all global system bookings with deep, relational data.
- **User Actions**
  - Browse currently active movies and view available showtimes.
  - **Book Tickets**: Utilizes Prisma `$transaction` to ensure database atomic operations, effectively preventing ticket overbooking race conditions.
  - View personal booking history.

## Local Development

### Prerequisites
- Node.js (v18+)
- Local PostgreSQL instance (or a hosted Postgres URI like Neon)

### Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/YourUsername/movie-theatre-system.git
   cd movie-theatre-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory and configure it:
   ```env
   # PostgreSQL Connection String
   # Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
   DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/movie_theater?schema=public"

   # Secure token generator key
   JWT_SECRET="your_secret_key"
   ```

4. **Database Database Synchronization**
   Push your Prisma schema to create the tables natively.
   ```bash
   npx prisma db push
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Deployment instructions

This project is fully optimized for **Railway**:

1. Log into Railway and provision a new **PostgreSQL** database.
2. Deploy this GitHub repository within the same Railway project space.
3. Automatically included `postinstall` bindings and `npm start` commands effortlessly detect Railway's fragmented `PG` variables, generate the Prisma Client, and push automated migrations before server execution.

## API Documentation

A complete, pre-configured **Postman Collection** is included in the repository.

Access: `Movie-Theater-Booking.postman_collection.json`

### instructions for Evaluation:
1. Open Postman Desktop or Web.
2. Hit **Import** and select the `.json` file from the project root.
3. Execute the `Auth > Register Admin` endpoint. 
4. Copy the JWT string returned in the payload, navigate to the Postman Collection **Variables** tab, and paste it into the `adminToken` or `userToken` value fields fields. Save securely.
5. All protected endpoints (`/api/admin/...`) are now fully unlocked for testing!

---
*Developed for the MAK Tech Solution Ltd Internship Assessment.*
