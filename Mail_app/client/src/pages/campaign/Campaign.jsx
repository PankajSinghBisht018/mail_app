import React from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import DonateUs from '../DonateUs';
import DashboardIcon from '@mui/icons-material/Dashboard'; 

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
    <div className="flex">
      <motion.div
        className="min-h-screen flex flex-col items-center bg-white text-black shadow-lg 
                   w-16 md:w-64 transition-width duration-300 ease-in-out"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <IconButton
          className="p-2 m-2 text-lg "
          onClick={() => navigate('/campaign')}
        >
          <DashboardIcon />
        </IconButton>
        <ul className="p-2 w-full">
          <li className="p-4 cursor-pointer hover:bg-gray-200 flex flex-col md:flex-row items-center" onClick={handleCreateCampaign}>
            <i className="pi pi-plus text-2xl"></i>
            <span className="ml-2 hidden md:inline">Create Campaign</span>
          </li>
          <li className="p-4 cursor-pointer hover:bg-gray-200 flex flex-col md:flex-row items-center" onClick={handleViewCampaigns}>
            <i className="pi pi-list text-2xl"></i>
            <span className="ml-2 hidden md:inline">Campaigns</span>
          </li>
          <li className="p-4 cursor-pointer hover:bg-gray-200 flex flex-col md:flex-row items-center" onClick={handleViewAnalytics}>
            <i className="pi pi-chart-line text-2xl"></i>
            <span className="ml-2 hidden md:inline">Analytics</span>
          </li>
          <li className="p-4 cursor-pointer hover:bg-gray-200 flex flex-col md:flex-row items-center" onClick={handleViewDeviceAnalytics}>
            <i className="pi pi-mobile text-2xl"></i>
            <span className="ml-2 hidden md:inline">Device Analytics</span>
          </li>
          <li className="p-4 cursor-pointer hover:bg-gray-200 flex flex-col md:flex-row items-center" onClick={handleViewScheduleMails}>
            <i className="pi pi-history text-2xl"></i>
            <span className="ml-2 hidden md:inline">Schedule Mails</span>
          </li>
        </ul>
      </motion.div>
      <motion.div
        className="flex-1 bg-gradient-to-r from-black to-purple-900 text-white min-h-screen"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Outlet />
        {isRootPath && (
          <motion.div
            className="text-center p-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl font-bold mb-8">Our Campaign</h1>
            <p className="text-lg mb-8">
              Our Campaign To Donate the Money to the needy ones and help to improve their life. Your small contribution will help them fulfill their needs.
            </p>
            <ToastContainer position="bottom-right" />
            <Button
              onClick={handleStart}
              variant='contained'
              className="text-white  px-4 py-2 rounded mb-4 bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Start a Campaign
            </Button>
            <DonateUs />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Campaign;
