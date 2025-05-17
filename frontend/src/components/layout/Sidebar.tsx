import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, Typography } from '@mui/material';
import { 
  Home as HomeIcon, 
  CalendarMonth as CalendarIcon,
  Book as BookIcon,
  School as SchoolIcon,
  BarChart as BarChartIcon,
  Announcement as AnnouncementIcon,
  Quiz as QuizIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';

const drawerWidth = 240;

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { text: t('sidebar.dashboard'), icon: <HomeIcon />, path: '/dashboard' },
    { text: t('sidebar.schedule'), icon: <CalendarIcon />, path: '/schedule' },
    { text: t('sidebar.courses'), icon: <BookIcon />, path: '/courses' },
    { text: t('sidebar.gradebook'), icon: <SchoolIcon />, path: '/gradebook' },
    { text: t('sidebar.performance'), icon: <BarChartIcon />, path: '/performance' },
    { text: t('sidebar.announcement'), icon: <AnnouncementIcon />, path: '/announcement' },
  ];

  const adminItems = [
    { text: t('sidebar.manageAnnouncements'), icon: <AnnouncementIcon />, path: '/announcements' },
    { text: t('sidebar.manageQuizzes'), icon: <QuizIcon />, path: '/quizzes' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#143d67',
          color: 'white',
          borderRadius: '0px 10px 10px 0px',
        },
      }}
    >
      <Box
        sx={{
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1e5180',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '24px',
          height: '60px',
        }}
      >
        Coligo
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            key={item.text}
            component={Link}
            to={item.path}
            sx={{ 
              color: 'white',
              backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
                '& .MuiListItemText-primary': {
                  color: 'white',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', my: 2 }} />
      <Typography variant="subtitle2" sx={{ color: 'rgba(255, 255, 255, 0.7)', px: 2, py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AdminIcon fontSize="small" sx={{ mr: 1 }} />
          {t('sidebar.adminSection')}
        </Box>
      </Typography>
      <List>
        {adminItems.map((item) => (
          <ListItem 
            key={item.text}
            component={Link}
            to={item.path}
            sx={{ 
              color: 'white',
              backgroundColor: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                '& .MuiListItemIcon-root': {
                  color: 'white',
                },
                '& .MuiListItemText-primary': {
                  color: 'white',
                },
              },
            }}
          >
            <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar; 