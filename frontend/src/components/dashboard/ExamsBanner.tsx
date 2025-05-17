import React from 'react';
import { 
  Paper, 
  Box, 
  Typography, 
  Button, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const ExamsBanner: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        borderRadius: 2, 
        p: 3, 
        mb: 4, 
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        backgroundImage: 'url(/exam-illustration.png)',
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      <Box sx={{ maxWidth: isMobile ? '100%' : '60%' }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
          {t('dashboard.examTime')}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t('dashboard.examDescription')}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            fontStyle: 'italic', 
            mb: 3, 
            color: 'text.secondary' 
          }}
        >
          "{t('dashboard.quote')}"
        </Typography>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: '#42c2d8',
            '&:hover': {
              backgroundColor: '#39aebf',
            }
          }}
        >
          {t('dashboard.viewExamsTips')}
        </Button>
      </Box>
    </Paper>
  );
};

export default ExamsBanner; 