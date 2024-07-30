import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import DashboardIcon from '@mui/icons-material/Dashboard'; 
import GridPattern from '@/components/magicui/grid-pattern'; 

const Campaign = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleCreateCampaign = () => {
    navigate('/campaign/campaign-form');
  };

  const handleViewCampaigns = () => {
    navigate('/campaign/all-campaigns');
  };

  const handleViewAnalytics = () => {
    navigate('/analytics');
  };

  const handleViewScheduleMails = () => {
    navigate('/campaign/schedulemails');
  };

  const handleViewDeviceAnalytics = () => {
    navigate('/campaign/Deviceanalytics');
  };

  const handleStart = () => {
    toast.info("Click on create button");
  };

  const isRootPath = location.pathname === '/campaign';

  return (
    <div className="relative">
      
      <div className="flex relative z-10">
        <motion.div
          className="min-h-screen flex flex-col items-center bg-white text-black shadow-lg w-16 md:w-64 transition-width duration-300 ease-in-out"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <IconButton
            className="p-2 m-2 text-lg hover:bg-yellow-100"
            onClick={() => navigate('/campaign')}
          >
            <DashboardIcon />
          </IconButton>
          <ul className="p-2 w-full">
            <li
              className="p-4 cursor-pointer hover:bg-yellow-100 flex flex-col md:flex-row items-center text-yellow-500"
              onClick={handleCreateCampaign}
            >
              <i className="pi pi-plus text-2xl"></i>
              <span className="ml-2 hidden md:inline">Create Campaign</span>
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-yellow-100 flex flex-col md:flex-row items-center text-yellow-500"
              onClick={handleViewCampaigns}
            >
              <i className="pi pi-list text-2xl"></i>
              <span className="ml-2 hidden md:inline">Campaigns</span>
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-yellow-100 flex flex-col md:flex-row items-center text-yellow-500"
              onClick={handleViewAnalytics}
            >
              <i className="pi pi-chart-line text-2xl"></i>
              <span className="ml-2 hidden md:inline">Analytics</span>
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-yellow-100 flex flex-col md:flex-row items-center text-yellow-500"
              onClick={handleViewDeviceAnalytics}
            >
              <i className="pi pi-mobile text-2xl"></i>
              <span className="ml-2 hidden md:inline">Device Analytics</span>
            </li>
            <li
              className="p-4 cursor-pointer hover:bg-yellow-100 flex flex-col md:flex-row items-center text-yellow-500"
              onClick={handleViewScheduleMails}
            >
              <i className="pi pi-history text-2xl"></i>
              <span className="ml-2 hidden md:inline">Schedule Mails</span>
            </li>
          </ul>
        </motion.div>
       
        <motion.div
          className="flex-1 bg-white text-black min-h-screen p-8 relative z-10"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >

        <GridPattern/>
          {isRootPath && (
            <div className="relative bg-white rounded-lg shadow-lg p-8"> 
              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-4xl font-bold mb-4">Our Campaign</h1>
                <img
                  src="https://entail-assets.com/mayple/652d244c071454dd38b36de7_3011200x675mayplefp166520_16142353a323f05233cbfeea7e63540f_2000-1699518382491.jpg" 
                  alt="Campaign"
                  className="mx-auto mb-8 rounded-lg"
                />
                <p className="text-lg mb-8">
                  Start your campaign to help the needy and improve their lives. Your small contribution can make a big difference.
                </p>
                <Button
                  onClick={handleStart}
                  variant='contained'
                  className="text-white px-4 py-2 rounded bg-gradient-to-r from-yellow-500 to-orange-600"
                >
                  Start a Campaign
                </Button>
              </motion.div>
            </div>
          )}
          <Outlet />
          <ToastContainer position="bottom-right" />
        </motion.div>
      </div>
    </div>
  );
};

export default Campaign;
