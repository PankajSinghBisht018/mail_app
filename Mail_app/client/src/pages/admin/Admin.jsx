import React, { useState } from 'react';
import { Box, Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Home, People, Feedback, Menu, Campaign, LibraryBooks } from '@mui/icons-material';
import { Navigate, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { checkRole } from '../../utils/roles';
import GridPattern from '@/components/magicui/grid-pattern';

const drawerWidth = 240;

const Admin = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn || !checkRole('admin')) {
    return <Navigate to="/" />;
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleItemClick = (path) => {
    navigate(path);
  };

  const drawer = (
    <div>
      <Toolbar />
      <List>
        <ListItem
          className="hover:bg-yellow-100"
          component='button'
          onClick={() => navigate('/')}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem
          className="hover:bg-yellow-100"
          component='button'
          onClick={() => handleItemClick('/admin/usermanagement')}
        >
          <ListItemIcon>
            <People />
          </ListItemIcon>
          <ListItemText primary="User Management" />
        </ListItem>
        <ListItem
          className="hover:bg-yellow-100"
          component='button'
          onClick={() => handleItemClick('/admin/campaignadmin')}
        >
          <ListItemIcon>
            <Campaign />
          </ListItemIcon>
          <ListItemText primary="Campaign" />
        </ListItem>
        <ListItem
          className="hover:bg-yellow-100"
          component='button'
          onClick={() => handleItemClick('/admin/feedbacklist')}
        >
          <ListItemIcon>
            <Feedback />
          </ListItemIcon>
          <ListItemText primary="Feedback" />
        </ListItem>
        <ListItem
          className="hover:bg-yellow-100"
          component='button'
          onClick={() => handleItemClick('/admin/template')}
        >
          <ListItemIcon>
            <LibraryBooks />
          </ListItemIcon>
          <ListItemText primary="Template Library" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', position: 'relative' }}>
    <GridPattern />
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      </Box>
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
        <Outlet />
      </Box>
    </Box>
  );
};

export default Admin;
