const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');

router.post('/donate', donationController.saveDonation);
router.get('/latest-donations', donationController.getLatestDonations);

module.exports = router;