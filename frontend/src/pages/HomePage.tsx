import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  Paper,
  Avatar
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { login } from '../store/slices/authSlice';
import SchoolIcon from '@mui/icons-material/School';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isLoggedIn } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async () => {
    await dispatch(login());
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={6} 
          sx={{ 
            p: { xs: 3, sm: 5 }, 
            borderRadius: 4, 
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255,0.95)',
            boxShadow: '0 8px 32px rgba(20,61,103,0.10)',
            backdropFilter: 'blur(2px)'
          }}
        >
          <Avatar 
            sx={{ 
              width: 72, 
              height: 72, 
              bgcolor: '#143d67',
              mx: 'auto',
              mb: 2,
              boxShadow: 3
            }}
          >
            <SchoolIcon sx={{ fontSize: 40, color: 'white' }} />
          </Avatar>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              mb: 2, 
              fontWeight: 800,
              color: '#143d67',
              letterSpacing: '-1px',
              fontSize: { xs: '2rem', sm: '2.5rem' }
            }}
          >
            {t('home.welcome')}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: '#4b5c6b', fontWeight: 400 }}>
            {t('home.description')}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary', fontSize: '1.1rem' }}>
            {t('home.loginToAccess')}
          </Typography>
          <Button 
            variant="contained" 
            size="large"
            onClick={handleLogin}
            disabled={loading}
            sx={{ 
              minWidth: 220,
              borderRadius: 99,
              background: 'linear-gradient(90deg, #143d67 0%, #3b82f6 100%)',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.1rem',
              boxShadow: '0 4px 24px rgba(20,61,103,0.10)',
              py: 1.5,
              '&:hover': {
                background: 'linear-gradient(90deg, #0f2d4e 0%, #2563eb 100%)',
              }
            }}
          >
            {loading ? 'Loading...' : t('app.login')}
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage; 