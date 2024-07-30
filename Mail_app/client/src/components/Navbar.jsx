import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, styled } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { SignedIn, SignedOut, UserButton, SignInButton, useAuth, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { checkRole } from '../utils/roles';

const NavLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  margin: '0 16px',
  fontSize: '1rem', 
  '&:hover': {
    color: theme.palette.warning.main,
  },
}));

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = isLoaded && isSignedIn && checkRole(user, 'admin');
  const isDeveloper = isLoaded && isSignedIn && checkRole(user, 'developer');

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <AppBar
        position={isSticky ? 'fixed' : 'relative'}
        sx={{
          backdropFilter: isSticky ? 'blur(10px)' : 'none',
          backgroundColor: isSticky ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
          boxShadow: isSticky ? 3 : 'none',
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.appBar,
          transition: 'all 0.3s ease-in-out',
          borderRadius: isSticky ? '50px' : '0', 
          marginTop: isSticky ? 1 : 0, 
          padding: isSticky ? '8px 16px' : '16px 32px', 
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src='https://cdn-icons-png.flaticon.com/512/666/666162.png' alt="Logo" style={{ height: 40, marginLeft: isSticky ? 0 : '16px' }} />
            </Link>
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: isMobile ? 'none' : 'flex', color: 'black', alignItems: 'center' }}>
              <SignedIn>
                <NavLink to="/" sx={{ fontSize: isSticky ? '0.875rem' : '1rem' }}>Home</NavLink>
                <NavLink to="/campaign" sx={{ fontSize: isSticky ? '0.875rem' : '1rem' }}>Campaign</NavLink>
                <NavLink to="/pricing" sx={{ fontSize: isSticky ? '0.875rem' : '1rem' }}>Pricing</NavLink>
                <NavLink to="/cart" sx={{ fontSize: isSticky ? '0.875rem' : '1rem' }}>Cart</NavLink>
                <NavLink to="/contact" sx={{ fontSize: isSticky ? '0.875rem' : '1rem' }}>Contact</NavLink>
                <NavLink to="/donate" sx={{ fontSize: isSticky ? '0.875rem' : '1rem' }}>Donate</NavLink>
                {isAdmin && <NavLink to="/admin" sx={{ fontSize: isSticky ? '0.875rem' : '1rem' }}>Admin</NavLink>}
                {isDeveloper && <NavLink to="/developer" sx={{ fontSize: isSticky ? '0.875rem' : '1rem' }}>Developer</NavLink>}
                <UserButton sx={{ ml: 2 }} />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="contained" color="secondary" sx={{ ml: 2, fontSize: isSticky ? '0.75rem' : '1rem' }}>Login</Button>
                </SignInButton>
              </SignedOut>
            </div>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ 
                display: isMobile ? 'block' : 'none',
                color: 'black',
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ '& .MuiDrawer-paper': { width: 250, backgroundColor: 'white', boxShadow: 3 } }}
      >
        <List>
          <SignedIn>
            <ListItem component={NavLink} to="/" onClick={handleDrawerToggle}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem component={NavLink} to="/campaign" onClick={handleDrawerToggle}>
              <ListItemText primary="Campaign" />
            </ListItem>
            <ListItem component={NavLink} to="/pricing" onClick={handleDrawerToggle}>
              <ListItemText primary="Pricing" />
            </ListItem>
            <ListItem component={NavLink} to="/cart" onClick={handleDrawerToggle}>
              <ListItemText primary="Cart" />
            </ListItem>
            <ListItem component={NavLink} to="/contact" onClick={handleDrawerToggle}>
              <ListItemText primary="Contact" />
            </ListItem>
            {isAdmin && (
              <ListItem component={NavLink} to="/admin" onClick={handleDrawerToggle}>
                <ListItemText primary="Admin" />
              </ListItem>
            )}
            {isDeveloper && (
              <ListItem component={NavLink} to="/developer" onClick={handleDrawerToggle}>
                <ListItemText primary="Developer" />
              </ListItem>
            )}
            <ListItem>
              <UserButton />
            </ListItem>
          </SignedIn>
          <SignedOut>
            <ListItem>
              <SignInButton mode="modal">
                <Button variant="contained" color="secondary" fullWidth>Login</Button>
              </SignInButton>
            </ListItem>
          </SignedOut>
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
