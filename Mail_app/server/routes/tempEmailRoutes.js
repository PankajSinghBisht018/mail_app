const express = require('express');
const { sendEmailTemplate,getEmailEvents,getTemplateUsageCounts  } = require('../controllers/templateEmailController');


const router = express.Router();

router.post('/temp-email', sendEmailTemplate);
router.get('/email-events', getEmailEvents);
router.get('/template-usage-counts', getTemplateUsageCounts);

module.exports = router;
