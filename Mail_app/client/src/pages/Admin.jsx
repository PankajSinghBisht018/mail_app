import React, { useState } from 'react';
import { Box, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, People, Feedback } from '@mui/icons-material';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { checkRole } from '../utils/roles';
import FeedbackList from './FeedbackList'; 


const drawerWidth = 240;

const Admin = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState(null);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn || !checkRole('admin')) {
    return <Navigate to="/" />;
  }

  const handleItemClick = (item) => {
    switch (item) {
      case 'feedback':
        setCurrentComponent(<FeedbackList />);
        break;
      default:
        setCurrentComponent(null);
        break;
    }
  };

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
          <ListItem component='button' onClick={() => navigate('/')} >
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component='button' >
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="User Management" />
          </ListItem>
          <ListItem component='button' onClick={() => handleItemClick('feedback')}>
            <ListItemIcon>
              <Feedback />
            </ListItemIcon>
            <ListItemText primary="Feedback" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {currentComponent}
      </Box>
    </Box>
  );
};

export default Admin;
