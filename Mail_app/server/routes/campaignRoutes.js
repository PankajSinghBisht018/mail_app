const express = require('express');
const router = express.Router();
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');
const { getUserCampaigns, createCampaign, updateCampaign, deleteCampaign ,getAllCampaigns } = require('../controllers/campaignController');
require('dotenv').config();
const authMiddleware = ClerkExpressRequireAuth();
  
  router.get('/campaigns', authMiddleware, getUserCampaigns);
  router.post('/campaigns', authMiddleware, createCampaign);
  router.put('/campaigns/:id', authMiddleware, updateCampaign);
  router.delete('/campaigns/:id', authMiddleware, deleteCampaign);
  router.get('/all', getAllCampaigns);

module.exports = router;