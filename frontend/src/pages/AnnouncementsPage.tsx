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
  Container
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { 
  fetchAnnouncements, 
  createAnnouncement, 
  updateAnnouncement, 
  deleteAnnouncement 
} from '../store/slices/announcementSlice';
import Layout from '../components/layout/Layout';
import { requireAuth } from '../components/auth/RequireAuth';
import type { Announcement } from '../services/announcementService';

interface AnnouncementFormData {
  title: string;
  content: string;
  author: {
    name: string;
    subject: string;
  };
}

const initialFormData: AnnouncementFormData = {
  title: '',
  content: '',
  author: {
    name: '',
    subject: ''
  }
};

const AnnouncementsPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { announcements, loading, error } = useAppSelector((state) => state.announcements);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<AnnouncementFormData>(initialFormData);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formErrors, setFormErrors] = useState({
    title: '',
    content: '',
    authorName: '',
    authorSubject: ''
  });

  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  const handleOpenAddDialog = () => {
    setDialogMode('add');
    setFormData(initialFormData);
    setOpenDialog(true);
  };

  const handleOpenEditDialog = (announcement: Announcement) => {
    setDialogMode('edit');
    setFormData({
      title: announcement.title,
      content: announcement.content,
      author: {
        name: announcement.author.name,
        subject: announcement.author.subject
      }
    });
    setCurrentId(announcement._id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent as keyof AnnouncementFormData] as Record<string, string>,
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const errors = {
      title: formData.title.trim() ? '' : 'Title is required',
      content: formData.content.trim() ? '' : 'Content is required',
      authorName: formData.author.name.trim() ? '' : 'Author name is required',
      authorSubject: formData.author.subject.trim() ? '' : 'Subject is required',
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    if (dialogMode === 'add') {
      try {
        await dispatch(createAnnouncement(formData)).unwrap();
        setSnackbarMessage('Announcement created successfully');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to create announcement:', error);
        setSnackbarMessage('Failed to create announcement');
        setSnackbarOpen(true);
      }
    } else if (currentId) {
      try {
        await dispatch(updateAnnouncement({ id: currentId, data: formData })).unwrap();
        setSnackbarMessage('Announcement updated successfully');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to update announcement:', error);
        setSnackbarMessage('Failed to update announcement');
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
        await dispatch(deleteAnnouncement(currentId)).unwrap();
        setSnackbarMessage('Announcement deleted successfully');
        setSnackbarOpen(true);
      } catch (error) {
        console.error('Failed to delete announcement:', error);
        setSnackbarMessage('Failed to delete announcement');
        setSnackbarOpen(true);
      }
    }
    setDeleteDialogOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const renderMobileView = () => (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {announcements.map((announcement) => (
        <Card key={announcement._id} sx={{ width: '100%', mb: 2, borderRadius: '16px', boxShadow: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {announcement.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {announcement.content.length > 100 
                ? `${announcement.content.substring(0, 100)}...` 
                : announcement.content}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
              <Chip
                label={announcement.author.name}
                size="small"
                color="primary"
                sx={{ borderRadius: '16px', mb: 1 }}
              />
              <Chip
                label={announcement.author.subject}
                size="small"
                color="secondary"
                sx={{ borderRadius: '16px', mb: 1 }}
              />
            </Stack>
          </CardContent>
          <CardActions>
            <Button 
              size="small" 
              onClick={() => handleOpenEditDialog(announcement)}
              startIcon={<EditIcon />}
            >
              Edit
            </Button>
            <Button 
              size="small" 
              color="error" 
              onClick={() => handleOpenDeleteDialog(announcement._id)}
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
            <TableCell>{t('announcements.title')}</TableCell>
            <TableCell>{t('announcements.content')}</TableCell>
            <TableCell>{t('announcements.author')}</TableCell>
            <TableCell>{t('announcements.subject')}</TableCell>
            <TableCell align="right">{t('common.actions')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {announcements.map((announcement) => (
            <TableRow key={announcement._id}>
              <TableCell component="th" scope="row">
                {announcement.title}
              </TableCell>
              <TableCell>
                {announcement.content.length > 50 
                  ? `${announcement.content.substring(0, 50)}...` 
                  : announcement.content}
              </TableCell>
              <TableCell>{announcement.author.name}</TableCell>
              <TableCell>{announcement.author.subject}</TableCell>
              <TableCell align="right">
                <IconButton 
                  aria-label="edit" 
                  onClick={() => handleOpenEditDialog(announcement)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton 
                  aria-label="delete" 
                  onClick={() => handleOpenDeleteDialog(announcement._id)}
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
      <Container maxWidth="lg" disableGutters={isMobile}>
        <Box sx={{ 
          py: 2,
          px: isMobile ? 2 : 6,
          width: '100%'
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between', 
            alignItems: isMobile ? 'flex-start' : 'center', 
            mb: 3,
            width: '100%'
          }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              component="h1" 
              fontWeight="bold"
              sx={{ mb: isMobile ? 2 : 0 }}
            >
              {t('announcements.manage')}
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={handleOpenAddDialog}
              fullWidth={isMobile}
              sx={{ 
                borderRadius: isMobile ? '8px' : 'default',
                height: isMobile ? '48px' : 'auto'
              }}
            >
              {t('announcements.add')}
            </Button>
          </Box>

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
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No announcements found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
                Create your first announcement by clicking the button above
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<AddIcon />} 
                onClick={handleOpenAddDialog}
              >
                {t('announcements.add')}
              </Button>
            </Paper>
          )}

          {!loading && !error && announcements.length > 0 && (
            <Box 
              sx={{ 
                overflow: 'auto',
                maxHeight: 'calc(100vh - 220px)',
                width: '100%'
              }}
            >
              {isMobile ? renderMobileView() : renderDesktopView()}
            </Box>
          )}

          {/* Add/Edit Dialog */}
          <Dialog 
            open={openDialog} 
            onClose={handleCloseDialog} 
            maxWidth="sm" 
            fullWidth
            fullScreen={isMobile}
          >
            <DialogTitle>
              {dialogMode === 'add' 
                ? t('announcements.addNew') 
                : t('announcements.editExisting')}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  margin="dense"
                  name="title"
                  label={t('announcements.title')}
                  value={formData.title}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                  error={!!formErrors.title}
                  helperText={formErrors.title}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  name="content"
                  label={t('announcements.content')}
                  value={formData.content}
                  onChange={handleInputChange}
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                  error={!!formErrors.content}
                  helperText={formErrors.content}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  name="author.name"
                  label={t('announcements.author')}
                  value={formData.author.name}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                  error={!!formErrors.authorName}
                  helperText={formErrors.authorName}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  name="author.subject"
                  label={t('announcements.subject')}
                  value={formData.author.subject}
                  onChange={handleInputChange}
                  sx={{ mb: 2 }}
                  error={!!formErrors.authorSubject}
                  helperText={formErrors.authorSubject}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, justifyContent: isMobile ? 'center' : 'flex-end' }}>
              <Button 
                onClick={handleCloseDialog}
                variant={isMobile ? "outlined" : "text"}
                sx={{ mr: 1 }}
                fullWidth={isMobile}
              >
                {t('common.cancel')}
              </Button>
              <Button 
                onClick={handleSubmit} 
                variant="contained"
                fullWidth={isMobile}
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
              {t('announcements.confirmDelete')}
            </DialogTitle>
            <DialogContent>
              <Typography>
                {t('announcements.deleteWarning')}
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
    </Layout>
  );
};

export default requireAuth(AnnouncementsPage); 