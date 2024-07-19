import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import hero from './heroimg.png';
import { motion } from 'framer-motion';
import { useAuth } from '@clerk/clerk-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GridPattern from '@/components/magicui/grid-pattern'; 

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
    <div className="relative flex flex-col min-h-fit bg-gradient-to-r from-black to-purple-900 ">
      <ToastContainer />
      
      <GridPattern
        width={20}
        height={20}
        x={-1}
        y={-1}
        className="absolute inset-0"
      />
      
      <div className="relative flex items-center justify-center min-h-fit bg-gradient-to-r from-black to-purple-900 bg-opacity-60">
        <GridPattern
          width={20}
          height={20}
          x={0}
          y={0}
          className="absolute inset-0 z-0 opacity-30" 
        />
        <motion.div
          className="relative z-10 max-w-5xl mx-auto text-center text-white py-20 px-6 md:px-12"
          initial={{ opacity: 0, x: -800 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: 'linear' }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Welcome to Our Service</h1>
          <p className="text-lg lg:text-xl mb-8">
            Hey, Welcome to Our Email App 
          </p>
          <div className="flex justify-center space-x-4">
            <Button label="Get Started" icon="pi pi-arrow-right" className="p-button-primary p-button-lg" onClick={handleLogin} />
          </div>
        </motion.div>
      </div>
      
      <motion.div
        className="flex flex-col md:flex-row py-2 px-6 md:px-12 text-white"
        initial={{ opacity: 0, x: 800 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: 'linear' }}
      >
        <div className="md:w-1/2">
          <img src={hero} alt="Sunset" className="w-fit h-auto pb-2 rounded-lg border-4" />
        </div>
        <div className="md:w-1/2 md:ml-6 flex flex-col justify-center text-center md:text-left">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-6">
            At our core, we strive to empower individuals and businesses alike by providing innovative solutions that enhance productivity, creativity, and efficiency. We believe in leveraging technology to create impactful experiences and foster meaningful connections. Our mission is to continuously evolve and adapt, anticipating the needs of our community and exceeding expectations with every interaction.
          </p>
          <hr />
          <div className="text-center md:text-left mt-4 mb-5">
            <Button label="About Us" icon="pi pi-info-circle" className="p-button-primary p-button-lg mx-auto" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
