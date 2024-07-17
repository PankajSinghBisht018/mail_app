const express = require('express');
const { createSurvey } = require('../controllers/surveyController');

const router = express.Router();

router.post('/surveys', createSurvey);

module.exports = router;
