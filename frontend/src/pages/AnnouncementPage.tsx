import React from 'react';
import Layout from '../components/layout/Layout';
import { Typography, Container } from '@mui/material';
import AnnouncementsList from '../components/dashboard/AnnouncementsList';

const AnnouncementPage: React.FC = () => (
  <Layout>
    <Container sx={{ py: 4, width: '100%', px: 0 }}>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
        sx={{ mb: 3, color: 'primary.main' }}
      >
        Announcements
      </Typography>
      <AnnouncementsList />
    </Container>
  </Layout>
);

export default AnnouncementPage; 