import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { toast, ToastContainer } from 'react-toastify';
import DonateUs from '../DonateUs';
import {motion} from 'framer-motion'

const Campaign = () => {
  const navigate = useNavigate();

  const handleCreateCampaign = () => {
    navigate('/campaign-form');
  };

  const handleViewCampaigns = () => {
    navigate('/all-campaigns');
  };

  const handleViewAnalytics = () => {
    navigate('/analytics');
  };

  const handleStart = () => {
    toast.info('Click On Create Button');
  };

  return (
    <div className="flex">
      <motion.div className="min-h-screen w-64 flex flex-col items-center bg-white text-black shadow-lg"
         initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
        <Button className="p-button-text p-button-plain p-0 m-4 text-lg font-bold">Dashboard</Button>
        <ul className="p-2 w-full">
          <li className="p-4 cursor-pointer hover:bg-gray-200 flex items-center" onClick={handleCreateCampaign}>
            <i className="pi pi-plus text-2xl"></i>
            <span className="ml-2">Create Campaign</span>
          </li>
          <li className="p-4 cursor-pointer hover:bg-gray-200 flex items-center" onClick={handleViewCampaigns}>
            <i className="pi pi-list text-2xl"></i>
            <span className="ml-2">Campaigns</span>
          </li>
          <li className="p-4 cursor-pointer hover:bg-gray-200 flex items-center" onClick={handleViewAnalytics}>
            <i className="pi pi-chart-line text-2xl"></i>
            <span className="ml-2">Analytics</span>
          </li>
        </ul>
      </motion.div>
      <motion.div className="flex-1 bg-gradient-to-r from-black to-purple-900 text-white min-h-screen"
      initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}>
        <div className="text-center p-4">
          <h1 className="text-4xl font-bold mb-8">Our Campaign</h1>
          <p className="text-lg mb-8">
            Our Campaign To Donate the Money to the needy ones and help to improve their life. Your small contribution will help them fulfill their needs.
          </p>
          <ToastContainer position="bottom-right" />
          <Button onClick={handleStart} className="bg-blue-500 text-white px-4 py-2 rounded mb-4 bg-gradient-to-r from-blue-500 to-purple-600">
            Start a Campaign
          </Button>
        </div>
        <DonateUs />
      </motion.div>
    </div>
  );
};

export default Campaign;
