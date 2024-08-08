import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItem, ListItemText, styled, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { SignedIn, SignedOut, UserButton, SignInButton, useAuth, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { checkRole } from '../utils/roles';
import { Moon, Sun } from "lucide-react";
import { useTheme } from '@/components/ThemeProvider'; 

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { theme, setTheme } = useTheme(); 
  const isMobile = useMediaQuery('(max-width: 960px)');

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

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark'); 
  };

  const NavLink = styled(Link)({
    textDecoration: 'none',
    margin: '0 16px',
    fontSize: '1rem',
    '&:hover': {
      color: 'orange',
    },
  });

  return (
    <>
      <AppBar
        position={isSticky ? 'fixed' : 'relative'}
        sx={{
          backdropFilter: isSticky ? 'blur(10px)' : 'none',
          backgroundColor: theme === 'dark' ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.1)', 
          boxShadow: isSticky ? 3 : 'none',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          transition: 'all 0.3s ease-in-out',
          borderRadius: isSticky ? '50px' : '0',
          marginTop: isSticky ? 1 : 0,
          padding: isSticky ? '8px 16px' : '16px 32px',
        }}
      >
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <img src='https://cdn-icons-png.flaticon.com/512/666/666162.png' alt="Logo" style={{ height: 40, marginLeft: isSticky ? 0 : '16px' }} />
          </Link>

          <div style={{ display: 'flex', alignItems: 'center',color: theme === 'dark' ? 'white' : 'black' }}>
            <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', }}>

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
              aria-label="theme"
              onClick={handleThemeToggle}
              sx={{ ml: 2 ,mt:1}}
            >
              {theme === 'dark' ? <Sun /> : <Moon />} 
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{
                display: isMobile ? 'block' : 'none',
                marginLeft: '16px', 
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
        sx={{ '& .MuiDrawer-paper': { width: 250, boxShadow: 3, backgroundColor: theme === 'dark' ? '#111827' : 'white', color: theme === 'dark' ? 'white' : 'black' }, zIndex: 21 }}
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
            <ListItem component={NavLink} to="/donate" onClick={handleDrawerToggle}>
              <ListItemText primary="Donate" />
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
