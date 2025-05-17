import React, { useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchAnnouncements } from '../../store/slices/announcementSlice';
import AnnouncementCard from './AnnouncementCard';

const AnnouncementsList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { announcements, loading, error } = useAppSelector((state) => state.announcements);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        borderRadius: 2, 
        p: { xs: 2, sm: 3 },
        mb: { xs: 2, md: 4 },
        height: '100%',
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: { xs: 2, sm: 3 } }}>
        {t('dashboard.announcements')}
      </Typography>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && announcements.length === 0 && (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No announcements found.
          </Typography>
        </Box>
      )}

      <Box sx={{ 
        maxHeight: isMobile ? '300px' : '600px', 
        overflowY: 'auto',
        pr: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#c1c1c1',
          borderRadius: '10px'
        }
      }}>
        {!loading && !error && announcements.map((announcement) => (
          <AnnouncementCard key={announcement._id} announcement={announcement} />
        ))}
      </Box>
    </Paper>
  );
};

export default AnnouncementsList; 