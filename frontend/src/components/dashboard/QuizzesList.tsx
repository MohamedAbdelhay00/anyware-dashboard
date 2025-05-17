import React, { useEffect } from 'react';
import { 
  Paper, 
  Typography, 
  Box, 
  CircularProgress,
  Alert,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchQuizzes } from '../../store/slices/quizSlice';
import QuizCard from './QuizCard';

const QuizzesList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { quizzes, loading, error } = useAppSelector((state) => state.quizzes);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  return (
    <Paper 
      elevation={0} 
      sx={{ 
        borderRadius: 2, 
        p: { xs: 2, sm: 3 },
        height: '100%',
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ mb: { xs: 2, sm: 3 } }}>
        {t('dashboard.whatsDue')}
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

      {!loading && !error && quizzes.length === 0 && (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No upcoming quizzes or assignments.
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
        {!loading && !error && quizzes.length > 0 && (
          <Stack spacing={2}>
            {quizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
          </Stack>
        )}
      </Box>
    </Paper>
  );
};

export default QuizzesList; 