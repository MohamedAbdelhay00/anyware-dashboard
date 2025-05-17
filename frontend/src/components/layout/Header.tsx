import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Badge, 
  Avatar, 
  InputBase, 
  alpha, 
  styled,
  Menu,
  MenuItem
} from '@mui/material';
import { 
  Search as SearchIcon, 
  Mail as MailIcon, 
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Event as EventIcon,
  Book as BookIcon,
  School as SchoolIcon,
  BarChart as BarChartIcon,
  Announcement as AnnouncementIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout } from '../../store/slices/authSlice';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isMobile: boolean;
  onMenuClick: () => void;
}

const drawerWidth = 240;

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header: React.FC<HeaderProps> = ({ isMobile, onMenuClick }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // Avatar dropdown for mobile
  const [avatarMenuAnchorEl, setAvatarMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const isAvatarMenuOpen = Boolean(avatarMenuAnchorEl);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // Avatar menu handlers (mobile only)
  const handleAvatarMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAvatarMenuAnchorEl(event.currentTarget);
  };
  const handleAvatarMenuClose = () => {
    setAvatarMenuAnchorEl(null);
  };

  const mobileMenuItems = [
    { text: t('sidebar.dashboard'), icon: <DashboardIcon />, path: '/dashboard' },
    { text: t('sidebar.schedule'), icon: <EventIcon />, path: '/schedule' },
    { text: t('sidebar.courses'), icon: <BookIcon />, path: '/courses' },
    { text: t('sidebar.gradebook'), icon: <SchoolIcon />, path: '/gradebook' },
    { text: t('sidebar.performance'), icon: <BarChartIcon />, path: '/performance' },
    { text: t('sidebar.announcement'), icon: <AnnouncementIcon />, path: '/announcements' },
  ];

  const mobileMenuId = 'mobile-menu';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {mobileMenuItems.map((item) => (
        <MenuItem 
          key={item.text} 
          component={Link} 
          to={item.path}
          onClick={handleMobileMenuClose}
        >
          <IconButton size="large" color="inherit">
            {item.icon}
          </IconButton>
          <p>{item.text}</p>
        </MenuItem>
      ))}
      <MenuItem onClick={handleLogout}>
        <IconButton size="large" color="inherit">
          <BarChartIcon />
        </IconButton>
        <p>{t('app.logout')}</p>
      </MenuItem>
    </Menu>
  );

  const renderAvatarMenu = (
    <Menu
      anchorEl={avatarMenuAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isAvatarMenuOpen}
      onClose={handleAvatarMenuClose}
    >
      <MenuItem onClick={() => { handleAvatarMenuClose(); handleLogout(); }}>
        {t('app.logout')}
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` },
          bgcolor: { xs: '#f8fafc', md: 'white' },
          color: 'black',
          boxShadow: { xs: '0 2px 8px rgba(20,61,103,0.04)', md: 'none' },
          borderBottom: '1px solid #eaeaea',
          borderRadius: '0px'
        }}
      >
        <Toolbar
          sx={{ minHeight: { xs: 52, sm: 64 }, px: { xs: 1, sm: 2 }, position: 'relative' }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={onMenuClick}
              sx={{ mr: 1, zIndex: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {isMobile && (
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#143d67',
                textAlign: 'center',
                letterSpacing: '-0.5px',
                pointerEvents: 'none',
                zIndex: 1
              }}
            >
              {user ? `Welcome ${user.name},` : t('app.dashboard')}
            </Typography>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            {user ? `Welcome ${user.name},` : t('app.dashboard')}
          </Typography>

          {!isMobile && (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          )}

          <Box sx={{ flexGrow: { xs: 1, sm: 1 } }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!isMobile && (
              <>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </>
            )}

            {isMobile ? (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 0 }}>
                <IconButton 
                  onClick={handleAvatarMenuOpen} 
                  color="inherit" 
                  sx={{ p: 0, display: 'flex', alignItems: 'center', outline: 'none', boxShadow: 'none' }}
                  disableRipple
                  disableFocusRipple
                >
                  <Avatar 
                    alt={user?.name} 
                    src="/static/images/avatar/1.jpg" 
                    sx={{ width: 36, height: 36, boxShadow: '0 2px 8px rgba(20,61,103,0.08)', border: '2px solid #e0e7ff' }}
                  />
                  <ExpandMoreIcon sx={{ ml: 0.5, color: '#143d67', fontSize: 24 }} />
                </IconButton>
                {renderAvatarMenu}
              </Box>
            ) : (
              <>
                <Avatar sx={{ ml: 2 }} alt={user?.name} src="/static/images/avatar/1.jpg" />
                <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
                  {t('app.logout')}
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </>
  );
};

export default Header; 