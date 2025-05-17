 import React from 'react';
 import Layout from '../components/layout/Layout';
 import { Typography, Box } from '@mui/material';
 
 const CoursesPage: React.FC = () => (
   <Layout>
     <Box sx={{ py: 2, textAlign: 'center' }}>
       <Typography variant="h4" fontWeight={700} gutterBottom>
         Courses
       </Typography>
       <Typography variant="h6" color="text.secondary">
         Coming Soon
       </Typography>
     </Box>
   </Layout>
 );
 
 export default CoursesPage;