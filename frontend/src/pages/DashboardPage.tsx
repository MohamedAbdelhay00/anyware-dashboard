import React from 'react';
import { Stack, Box } from '@mui/material';
import Layout from '../components/layout/Layout';
import ExamsBanner from '../components/dashboard/ExamsBanner';
import AnnouncementsList from '../components/dashboard/AnnouncementsList';
import QuizzesList from '../components/dashboard/QuizzesList';
import { requireAuth } from '../components/auth/RequireAuth';

const DashboardPage: React.FC = () => {
  return (
    <Layout>
      <ExamsBanner />
      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={3} 
        sx={{ width: '100%' }}
      >
        <Box sx={{ width: { xs: '100%', md: '66.67%' } }}>
          <AnnouncementsList />
        </Box>
        <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
          <QuizzesList />
        </Box>
      </Stack>
    </Layout>
  );
};

export default requireAuth(DashboardPage); 