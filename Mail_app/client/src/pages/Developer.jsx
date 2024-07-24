import React, { useState } from 'react';
import { Box, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home, Api, Menu } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { checkRole } from '../utils/roles';

const drawerWidth = 240;

const Developer = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn || !checkRole('developer')) {
    return <Navigate to="/" />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem component='button' onClick={() => window.location.href = '/'}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component='button'>
          <ListItemIcon>
            <Api />
          </ListItemIcon>
          <ListItemText primary="API Integration" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' ,minHeight:'100vh'}}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          display: { xs: 'none', sm: 'block' }, 
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          sx={{ display: { xs: 'block', sm: 'none' }, mb: 2 }}
          onClick={handleDrawerToggle}
        >
          <Menu />
        </IconButton>
        <h1>This page is under process</h1>
      </Box>
    </Box>
  );
};

export default Developer;
