import React, { useState } from 'react';
import { Box, Toolbar, Drawer, List, ListItem, ListItemText, IconButton, Typography } from '@mui/material';
import { Home, Api, Menu } from '@mui/icons-material';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { checkRole } from '../utils/roles';
import GridPattern from '@/components/magicui/grid-pattern';

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
        <ListItem
          className="hover:bg-yellow-100"
          component='button'
          onClick={() => window.location.href = '/'}
        >
          <IconButton className="text-yellow-500">
            <Home />
          </IconButton>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          className="hover:bg-yellow-100"
          component='button'
        >
          <IconButton className="text-yellow-500">
            <Api />
          </IconButton>
          <ListItemText primary="API Integration" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
      <GridPattern />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          display: { xs: 'none', sm: 'block' },
          backgroundColor: 'white',
          borderRight: '1px solid #ccc',
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
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          zIndex: 1,
        }}
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
        <GridPattern />
        <Typography variant="h4" gutterBottom>
          Developer Dashboard
        </Typography>
        <Typography variant="body1">
          This page is under process
        </Typography>
      </Box>
    </Box>
  );
};

export default Developer;
