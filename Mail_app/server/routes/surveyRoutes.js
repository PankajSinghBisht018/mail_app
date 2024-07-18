const express = require('express');
const { createSurvey,getSurveys } = require('../controllers/surveyController');

const router = express.Router();

router.post('/surveys', createSurvey);
router.get('/surveys', getSurveys);

module.exports = router;
