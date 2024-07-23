import React from 'react';
import { Box, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Api } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { checkRole } from '../utils/roles';

const drawerWidth = 240;

const Developer = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn || !checkRole('developer')) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
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
            <ListItemText primary="Api Intregation" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <h1>This page is under process</h1>
      </Box>
    </Box>
  );
};

export default Developer;
