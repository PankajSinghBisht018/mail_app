import React from 'react';
import { Box,Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home, People, Settings } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { checkRole } from '../utils/roles'; 

const drawerWidth = 240;

const Admin = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn || !checkRole('admin')) {
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
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem component="button" >
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem component="button" >
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="User Management" />
            </ListItem>
            <ListItem component="button" >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          Hey Welcome to DashBoard
        </Typography>
      </Box>
    </Box>
  );
};

export default Admin;
