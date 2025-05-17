import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button
} from '@mui/material';
import { AccessTime as ClockIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import type { Quiz } from '../../services/quizService';

interface QuizCardProps {
  quiz: Quiz;
}

const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const { t } = useTranslation();

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day} ${month} ${year} - ${hours}:${minutes} PM`;
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 'none', borderRadius: 2, height: '100%' }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            {quiz.title}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Course: {quiz.course}
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Topic: {quiz.topic}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <ClockIcon sx={{ fontSize: '1rem', mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Due To: {formatDueDate(quiz.dueDate)}
            </Typography>
          </Box>
        </Box>
        
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            mt: 2, 
            backgroundColor: '#42c2d8',
            '&:hover': {
              backgroundColor: '#39aebf',
            }
          }}
        >
          {quiz.title.includes('Assignment') ? t('dashboard.solveAssignment') : t('dashboard.startQuiz')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizCard; 