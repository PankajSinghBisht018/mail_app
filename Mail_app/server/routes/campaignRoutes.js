const express = require('express');
const router = express.Router();
const campaignController = require('../controllers/campaignController');

router.get('/campaigns', campaignController.getAllCampaigns);
router.post('/campaigns', campaignController.createCampaign);
router.put('/campaigns/:id', campaignController.updateCampaign);
router.delete('/campaigns/:id', campaignController.deleteCampaign);

module.exports = router;
