import React, { useState } from 'react';
import { Box, Toolbar, useMediaQuery, useTheme, Drawer } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Sidebar />
        </Drawer>
      ) : (
        <Sidebar />
      )}

      <Box
        component="main"
        sx={{ 
          flexGrow: 1, 
          p: { xs: 2, sm: 3 },
          width: { sm: `calc(100% - ${drawerWidth}px)` },

          backgroundColor: '#f5f7fb'
        }}
      >
        <Header 
          isMobile={isMobile} 
          onMenuClick={handleDrawerToggle}
        />
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout; 