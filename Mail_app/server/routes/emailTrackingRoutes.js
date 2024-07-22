const express = require('express');
const router = express.Router();
const { trackEmailOpen, getEmailEvents } = require('../controllers/emailTrackingController');

router.get('/track-email-open', trackEmailOpen);
router.get('/get-email-events', getEmailEvents);

module.exports = router;
