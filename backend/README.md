# Anyware Backend

This is the backend for the Anyware Software Fullstack Challenge project. It's built with Express.js, TypeScript, and MongoDB.

## Features

- User authentication with JWT
- CRUD operations for quizzes and announcements
- Protected routes with middleware
- MongoDB integration

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/anyware
   JWT_SECRET=anywaresoftwarefullstackchallenge
   ```

3. Start development server:
   ```
   npm run dev
   ```

### Database Seeding

To seed the database with sample data:
```
npm run data:import
```

To clear all data:
```
npm run data:destroy
```

### Build for Production

```
npm run build
npm start
```

## API Endpoints

### Users
- `POST /api/users/login` - Login (demo)
- `POST /api/users/logout` - Logout
- `GET /api/users/profile` - Get user profile

### Announcements
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get announcement by ID
- `POST /api/announcements` - Create announcement
- `PUT /api/announcements/:id` - Update announcement
- `DELETE /api/announcements/:id` - Delete announcement

### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz by ID
- `POST /api/quizzes` - Create quiz
- `PUT /api/quizzes/:id` - Update quiz
- `DELETE /api/quizzes/:id` - Delete quiz 