#Learning Management System

A full-stack Learning Management System (LMS) built with React and Express. This application provides features for managing quizzes and announcements.

## Project Overview

This project consists of:

- **Frontend**: React, TypeScript, Redux, Material UI
- **Backend**: Express.js, TypeScript, MongoDB
- **Testing**: Jest, React Testing Library

## Key Features

- **User Authentication**: JWT-based authentication system
- **Dashboard**: Overview of courses, assignments, and announcements
- **Announcements System**: Create, read, update, and delete announcements
- **Quiz Management**: Create and manage quizzes with due dates
- **Responsive Design**: Mobile-first UI that works on all screen sizes
- **Internationalization**: Support for multiple languages (English default)
- **Comprehensive Testing**: Unit and integration tests for frontend components

## Frontend

### Technology Stack

- React 19
- TypeScript
- Redux Toolkit
- Material UI 7
- React Router 7
- Jest + React Testing Library

### Key Components

- **Layout Components**: Header, Sidebar, responsive layout system
- **Dashboard Components**: AnnouncementCard, QuizCard, ExamsBanner
- **Authentication**: RequireAuth HOC for protected routes
- **Pages**: Dashboard, Announcements, Quizzes, and placeholder pages

### UI Enhancements

- Modern design with gradients and cards
- Responsive layout for all screen sizes
- Mobile-optimized views for all content
- Form validations for data entry
- Loading states and error handling

### Testing Implementation

The frontend includes comprehensive tests:

- **Component Tests**:
  - `AnnouncementCard.test.tsx`: Tests rendering of announcement content and author information
  - `QuizCard.test.tsx`: Tests both quiz and assignment display with correct information
  - `Header.test.tsx`: Tests desktop and mobile layouts and interactions
  - `RequireAuth.test.tsx`: Tests authentication flow and protected routes

- **Page Tests**:
  - `AnnouncementPage.test.tsx`: Tests page structure and component embedding

Tests verify:
- Component rendering
- User interactions (clicks)
- Conditional displays
- Responsive design elements
- Authentication flows

## Backend

### Technology Stack

- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication

### API Endpoints

#### Users
- `POST /api/users/login` - Login
- `POST /api/users/logout` - Logout
- `GET /api/users/profile` - Get user profile

#### Announcements
- `GET /api/announcements` - Get all announcements
- `GET /api/announcements/:id` - Get announcement by ID
- `POST /api/announcements` - Create announcement
- `PUT /api/announcements/:id` - Update announcement
- `DELETE /api/announcements/:id` - Delete announcement

#### Quizzes
- `GET /api/quizzes` - Get all quizzes
- `GET /api/quizzes/:id` - Get quiz by ID
- `POST /api/quizzes` - Create quiz
- `PUT /api/quizzes/:id` - Update quiz
- `DELETE /api/quizzes/:id` - Delete quiz

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or Atlas)

### Running the Backend

1. Navigate to the backend folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/anyware
   JWT_SECRET=anywaresoftwarefullstackchallenge
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Running the Frontend

1. Navigate to the frontend folder:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

### Running Tests

1. Navigate to the frontend folder:
   ```
   cd frontend
   ```

2. Run the tests:
   ```
   npm test
   ```

## Project Structure

```
anyware/
├── backend/             # Backend server code
│   ├── src/
│   │   ├── controllers/ # API controllers
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # Mongoose models
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Utility functions
│   │   └── server.ts    # Server entry point
│   └── package.json
│
└── frontend/            # Frontend React application
    ├── src/
    │   ├── components/  # Reusable components
    │   │   ├── auth/    # Authentication related components
    │   │   ├── dashboard/ # Dashboard components
    │   │   └── layout/  # Layout components
    │   ├── pages/       # Page components
    │   ├── services/    # API service functions
    │   ├── store/       # Redux store setup
    │   ├── hooks/       # Custom React hooks
    │   ├── locales/     # i18n translations
    │   └── utils/       # Utility functions
    ├── __tests__/       # Test files
    └── package.json
```

## Recent Improvements

- Enhanced mobile responsiveness for Announcements and Quizzes pages
- Modernized UI with gradients and improved typography
- Added form validation for empty submissions
- Fixed TypeScript type issues
- Implemented comprehensive testing suite
- Added "Coming Soon" pages for future features
- Fixed routing and navigation 