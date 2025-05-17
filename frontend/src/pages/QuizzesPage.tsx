import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Snackbar,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
  Stack,
  Chip,
  Container,
  Avatar,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Event as EventIcon, School as SchoolIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { 
  fetchQuizzes,
  createQuiz,
  updateQuiz,
  deleteQuiz
} from '../store/slices/quizSlice';
import Layout from '../components/layout/Layout';
import { requireAuth } from '../components/auth/RequireAuth';
import type { Quiz } from '../services/quizService';
import { format } from 'date-fns';

interface QuizFormData {
  title: string;
  course: string;
  topic: string;
  dueDate: string;
}

const initialFormData: QuizFormData = {
  title: '',
  course: '',
  topic: '',
  dueDate: new Date().toISOString().split('T')[0]
};

const QuizzesPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { quizzes, loading, error } = useAppSelector((state) => state.quizzes);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<QuizFormData>(initialFormData);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formErrors, setFormErrors] = useState({
    title: '',
    course: '',
    topic: '',
    dueDate: ''
  });

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const handleOpenAddDialog = () => {
    setDialogMode('add');
    setFormData(initialFormData);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (quiz: Quiz) => {
    setDialogMode('edit');
    setFormData({
      title: quiz.title,
      course: quiz.course,
      topic: quiz.topic,
      dueDate: new Date(quiz.dueDate).toISOString().split('T')[0]
    });
    setCurrentId(quiz._id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {
      title: formData.title.trim() ? '' : 'Title is required',
      course: formData.course.trim() ? '' : 'Course is required',
      topic: formData.topic.trim() ? '' : 'Topic is required',
      dueDate: formData.dueDate.trim() ? '' : 'Due date is required',
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (dialogMode === 'add') {
      try {
        await dispatch(createQuiz(formData)).unwrap();
        setSnackbarMessage('Quiz created successfully');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to create quiz:', error);
        setSnackbarMessage('Failed to create quiz');
        setSnackbarOpen(true);
      }
    } else if (currentId) {
      try {
        await dispatch(updateQuiz({ id: currentId, data: formData })).unwrap();
        setSnackbarMessage('Quiz updated successfully');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to update quiz:', error);
        setSnackbarMessage('Failed to update quiz');
        setSnackbarOpen(true);
      }
    }
    setOpenDialog(false);
  };

  const handleOpenDeleteDialog = (id: string) => {
    setCurrentId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    if (currentId) {
      try {
        await dispatch(deleteQuiz(currentId)).unwrap();
        setSnackbarMessage('Quiz deleted successfully');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to delete quiz:', error);
        setSnackbarMessage('Failed to delete quiz');
        setSnackbarOpen(true);
      }
    }
    setDeleteDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const formatDate = (dateString: string | Date) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid date';
    }
  };

  const renderMobileView = () => (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {quizzes.map((quiz) => (
        <Card key={quiz._id} sx={{ width: '100%', mb: 2, borderRadius: '16px', boxShadow: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {quiz.title}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
              <Chip
                icon={<SchoolIcon fontSize="small" />}
                label={quiz.course}
                size="small"
                color="primary"
                sx={{ borderRadius: '16px', mb: 1 }}
              />
              <Chip
                label={quiz.topic}
                size="small"
                color="secondary"
                sx={{ borderRadius: '16px', mb: 1 }}
              />
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <EventIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Due: {formatDate(quiz.dueDate)}
              </Typography>
            </Stack>
          </CardContent>
          <CardActions>
            <Button 
              size="small" 
              onClick={() => handleOpenEditDialog(quiz)}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button 
              size="small" 
              color="error" 
              onClick={() => handleOpenDeleteDialog(quiz._id)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}
    </Stack>
  );

  const renderDesktopView = () => (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>{t('quizzes.title')}</TableCell>
            <TableCell>{t('quizzes.course')}</TableCell>
            <TableCell>{t('quizzes.topic')}</TableCell>
            <TableCell>{t('quizzes.dueDate')}</TableCell>
            <TableCell align="right">{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quizzes.map((quiz) => (
            <TableRow key={quiz._id}>
              <TableCell component="th" scope="row">
                {quiz.title}
              </TableCell>
              <TableCell>{quiz.course}</TableCell>
              <TableCell>{quiz.topic}</TableCell>
              <TableCell>{formatDate(quiz.dueDate)}</TableCell>
              <TableCell align="right">
                <IconButton 
                  aria-label="edit" 
                  onClick={() => handleOpenEditDialog(quiz)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  aria-label="delete" 
                  onClick={() => handleOpenDeleteDialog(quiz._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Layout>
      <Box sx={{ 
        minHeight: 'calc(100vh - 64px)',
        bgcolor: '#f5f7fa',
        pt: 3,
        pb: 5
      }}>
        <Container maxWidth={false} disableGutters={isMobile}>
          <Box sx={{ 
            py: isMobile ? 2 : 3,
            px: isMobile ? 2 : 6,
            width: '100%'
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: 'space-between', 
              alignItems: isMobile ? 'flex-start' : 'center', 
              mb: 4,
              width: '100%'
            }}>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                component="h1" 
                sx={{ 
                  fontWeight: 700, 
                  mb: isMobile ? 2.5 : 0,
                  color: theme.palette.text.primary
                }}
              >
                {t('quizzes.manage')}
              </Typography>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />} 
                onClick={handleOpenAddDialog}
                fullWidth={isMobile}
                sx={{ 
                  borderRadius: '12px',
                  height: isMobile ? '48px' : 'auto',
                  px: 3,
                  py: isMobile ? 1.5 : 1,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: 2
                }}
              >
                {t('quizzes.add')}
              </Button>
            </Box>

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
                <CircularProgress size={40} />
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {!loading && !error && quizzes.length === 0 && (
              <Paper 
                sx={{ 
                  p: 5, 
                  textAlign: 'center',
                  borderRadius: 4,
                  mt: 4,
                  bgcolor: 'white',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                }}
              >
                <Box sx={{ mb: 3 }}>
                  <Avatar 
                    sx={{ 
                      width: 70, 
                      height: 70, 
                      bgcolor: theme.palette.primary.light,
                      mx: 'auto',
                      mb: 2
                    }}
                  >
                    <SchoolIcon sx={{ fontSize: 35 }} />
                  </Avatar>
                </Box>
                <Typography variant="h6" color="text.primary" sx={{ mb: 1, fontWeight: 600 }}>
                  No quizzes found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 4 }}>
                  Create your first quiz by clicking the button below
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />} 
                  onClick={handleOpenAddDialog}
                  sx={{ 
                    borderRadius: '12px',
                    px: 3,
                    py: 1,
                    textTransform: 'none',
                    fontWeight: 600
                  }}
                >
                  {t('quizzes.add')}
                </Button>
              </Paper>
            )}

            {!loading && !error && quizzes.length > 0 && (
              <Box 
                sx={{ 
                  overflow: 'auto',
                  maxHeight: 'calc(100vh - 220px)',
                  width: '100%',
                  pb: 2
                }}
              >
                {isMobile ? renderMobileView() : renderDesktopView()}
              </Box>
            )}

            <Dialog 
              open={openDialog} 
              onClose={handleCloseDialog} 
              maxWidth="sm" 
              fullWidth
              fullScreen={isMobile}
              PaperProps={{
                sx: {
                  borderRadius: isMobile ? 0 : 3,
                  overflow: 'hidden'
                }
              }}
            >
              <DialogTitle sx={{ 
                bgcolor: theme.palette.primary.main,
                color: 'white',
                py: 2
              }}>
                {dialogMode === 'add' 
                  ? t('quizzes.addNew') 
                  : t('quizzes.editExisting')}
              </DialogTitle>
              <DialogContent sx={{ pt: 3 }}>
                <Box sx={{ pt: 1 }}>
                  <TextField
                    fullWidth
                    margin="dense"
                    name="title"
                    label={t('quizzes.title')}
                    value={formData.title}
                    onChange={handleInputChange}
                    sx={{ mb: 2.5 }}
                    error={!!formErrors.title}
                    helperText={formErrors.title}
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    name="course"
                    label={t('quizzes.course')}
                    value={formData.course}
                    onChange={handleInputChange}
                    sx={{ mb: 2.5 }}
                    error={!!formErrors.course}
                    helperText={formErrors.course}
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    name="topic"
                    label={t('quizzes.topic')}
                    value={formData.topic}
                    onChange={handleInputChange}
                    sx={{ mb: 2.5 }}
                    error={!!formErrors.topic}
                    helperText={formErrors.topic}
                  />
                  <TextField
                    fullWidth
                    margin="dense"
                    name="dueDate"
                    label={t('quizzes.dueDate')}
                    type="date"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{ mb: 1 }}
                    error={!!formErrors.dueDate}
                    helperText={formErrors.dueDate}
                  />
                </Box>
              </DialogContent>
              <DialogActions sx={{ 
                p: 3, 
                justifyContent: isMobile ? 'center' : 'flex-end',
                bgcolor: 'rgba(0,0,0,0.01)'
              }}>
                <Button 
                  onClick={handleCloseDialog}
                  variant={isMobile ? "outlined" : "text"}
                  sx={{ 
                    mr: 1,
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2
                  }}
                  fullWidth={isMobile}
                >
                  {t('common.cancel')}
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  variant="contained"
                  fullWidth={isMobile}
                  sx={{ 
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: 2
                  }}
                >
                  {dialogMode === 'add' ? t('common.add') : t('common.save')}
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog 
              open={deleteDialogOpen} 
              onClose={handleCloseDeleteDialog}
              fullWidth
              maxWidth="xs"
              PaperProps={{
                sx: {
                  borderRadius: 3,
                  overflow: 'hidden',
                  p: 2
                }
              }}
            >
              <DialogTitle>
                {t('quizzes.confirmDelete')}
              </DialogTitle>
              <DialogContent>
                <Typography>
                  {t('quizzes.deleteWarning')}
                </Typography>
              </DialogContent>
              <DialogActions sx={{ p: 2, justifyContent: isMobile ? 'center' : 'flex-end' }}>
                <Button 
                  onClick={handleCloseDeleteDialog}
                  variant={isMobile ? "outlined" : "text"}
                  sx={{ mr: 1 }}
                  fullWidth={isMobile}
                >
                  {t('common.cancel')}
                </Button>
                <Button 
                  onClick={handleDelete} 
                  color="error"
                  variant="contained"
                  fullWidth={isMobile}
                >
                  {t('common.delete')}
                </Button>
              </DialogActions>
            </Dialog>

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleCloseSnackbar}
              message={snackbarMessage}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            />
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default requireAuth(QuizzesPage); 