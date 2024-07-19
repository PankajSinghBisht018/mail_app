const express = require('express');
const { sendEmailTemplate, getEmailEvents, getTemplateUsageCounts, cancelEmailSchedule, sendEmailNow } = require('../controllers/templateEmailController');

const router = express.Router();

router.post('/temp-email', sendEmailTemplate);
router.get('/email-events', getEmailEvents);
router.get('/template-usage-counts', getTemplateUsageCounts);
router.post('/cancel-email/:id', cancelEmailSchedule);
router.post('/send-now/:id', sendEmailNow);

module.exports = router;
