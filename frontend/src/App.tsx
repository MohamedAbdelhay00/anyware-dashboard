import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './i18n';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import SchedulePage from './pages/SchedulePage';
import CoursesPage from './pages/CoursesPage';
import GradebookPage from './pages/GradebookPage';
import PerformancePage from './pages/PerformancePage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import AnnouncementPage from './pages/AnnouncementPage';
import QuizzesPage from './pages/QuizzesPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#143d67',
    },
    secondary: {
      main: '#42c2d8',
    },
    background: {
      default: '#f5f7fb',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/gradebook" element={<GradebookPage />} />
            <Route path="/performance" element={<PerformancePage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/announcement" element={<AnnouncementPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
