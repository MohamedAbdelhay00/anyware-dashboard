# Anyware Frontend

This is the frontend part It's built with React, TypeScript, Redux, and Material UI.

## Features

- User authentication with JWT
- Dashboard with announcements and quizzes
- Responsive design
- Internationalization support (i18n)
- Material UI components
- React Router for navigation
- Redux state management
- Comprehensive test suite

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Backend API running on port 5001

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Start development server:
   ```
   npm run dev
   ```
   This will start the frontend on port 3000 with a proxy to the backend on port 5001.

### Build for Production

```
npm run build
```

### Running Tests

The project includes a comprehensive test suite using Jest and React Testing Library:

```
npm test
```

## Project Structure

- `src/components`: Reusable UI components
  - `auth`: Authentication related components
  - `dashboard`: Dashboard specific components
  - `layout`: Layout components like Sidebar and Header
- `src/pages`: Page components
- `src/services`: API service functions
- `src/store`: Redux store setup and slices
- `src/hooks`: Custom React hooks
- `src/locales`: Internationalization files
- `src/utils`: Utility functions
- `src/__mocks__`: Mock files for testing

## Main Features Explained

### Authentication Flow

- Simple login/logout without username/password (demo purpose)
- Authentication state stored in Redux
- Protected routes with Higher Order Component

### Dashboard

- Announcements display
- Upcoming quizzes and assignments
- Exams preparation banner
- Responsive layout for all screen sizes

### Internationalization

- Support for English (default) and Arabic
- Translations stored in JSON files
- Easy to add more languages

## Testing Implementation

The project contains various tests to ensure the reliability of the application:

### Component Tests

- **AnnouncementCard.test.tsx**: Tests proper rendering of announcement content and author information
- **QuizCard.test.tsx**: Tests both quiz and assignment display with correct information and button text
- **Header.test.tsx**: Tests desktop and mobile layouts, interactions, and conditional rendering
- **RequireAuth.test.tsx**: Tests the authentication HOC for both authenticated and unauthenticated states

### Page Tests

- **AnnouncementPage.test.tsx**: Tests page structure, layout and component embedding

The tests verify:
- Basic rendering functions correctly
- Component interactions work (clicks, state changes)
- Responsive design patterns function correctly
- Authentication and authorization flows work as expected

## Recent Improvements

- Enhanced mobile responsiveness for Announcements and Quizzes pages
- Modernized UI with gradients and improved typography
- Added form validation for empty submissions
- Fixed TypeScript type issues
- Implemented comprehensive testing suite
- Added "Coming Soon" pages for future features
