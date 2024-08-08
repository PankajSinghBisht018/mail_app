import React, { useState, useEffect } from 'react';
import { Button, Typography, Box, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GridPattern from '@/components/magicui/grid-pattern'; 
import hero from '../images/heroimg.png';
import Meteors from '@/components/magicui/meteors'; 
import TestimonialPage from '@/components/TestimonialPage';
import { Helmet } from 'react-helmet-async';

function Home() {
  const { isSignedIn } = useAuth();
  const [isLogged, setIsLogged] = useState(isSignedIn);

  useEffect(() => {
    setIsLogged(isSignedIn);
  }, [isSignedIn]);

  const handleLogin = () => {
    if (isLogged) {
      toast.info('User already logged in');
    } else {
      toast.info('Please log in now');
    }
  };

  return (
  <> 
    <div style={{ minHeight: '100vh', position: 'relative' , }}>
    <Helmet>
        <title>Mail Vista - Home  </title>
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/666/666162.png" type="image/png" />
      </Helmet>
      <ToastContainer />
      <GridPattern />
      <Box
        sx={{
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <GridPattern/>
        <Meteors number={30} />
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, x: -800 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'linear' }}
        >
          <Typography variant="h2" gutterBottom>
            Welcome to Our Service
          </Typography>
          <Typography variant="body1" paragraph>
            Hey, Welcome to Our Email App
          </Typography>
          <Button
            variant="contained"
            color="warning"
            onClick={handleLogin}
            sx={{ mt: 2, borderRadius: '20px' }}
          >
            Get Started
          </Button>
        </motion.div>
      </Box>
      <motion.div
        className="flex flex-col md:flex-row py-4 px-6 md:px-12"
        initial={{ opacity: 0, x: 800 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: 'linear' }} 
      >
        <Paper elevation={3} sx={{ flex: 1, margin: 2, padding: 2 }}>
          <img
            src={hero} 
            alt="Hero"
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Paper>
        <Box sx={{ flex: 1, margin: 2 }}>
          <Typography variant="h4" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            At our core, we strive to empower individuals and businesses alike by providing innovative solutions that enhance productivity, creativity, and efficiency. We believe in leveraging technology to create impactful experiences and foster meaningful connections. Our mission is to continuously evolve and adapt, anticipating the needs of our community and exceeding expectations with every interaction.
          </Typography>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {}}
            sx={{ mt: 2, borderRadius: '20px' }}
          >
            About Us
          </Button>
        </Box>
      </motion.div>
      
    </div>

    <TestimonialPage/>
    </>
  );
}

export default Home;
