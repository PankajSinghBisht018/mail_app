const express = require('express');
const {sendEmailTemplate,getEmailEvents,getEmailEventsForGraph,getTemplateUsageCounts,cancelEmailSchedule,sendEmailNow} = require('../controllers/templateEmailController');
const trackingController = require('../controllers/emailTrackingController');
const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

require('dotenv').config();

const authMiddleware = ClerkExpressRequireAuth();

const router = express.Router();

router.post('/temp-email', authMiddleware, sendEmailTemplate);
router.get('/email-events', authMiddleware, getEmailEvents);
router.get('/email-graph', getEmailEventsForGraph);
router.get('/template-usage-counts',getTemplateUsageCounts);
router.post('/cancel-email/:id', authMiddleware, cancelEmailSchedule);
router.post('/send-now/:id', authMiddleware, sendEmailNow);
router.get('/track-email/:trackingId', trackingController.trackEmail);
router.get('/email-open-stats', authMiddleware,trackingController.getEmailOpenStats);

module.exports = router;
