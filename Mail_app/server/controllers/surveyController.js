const Survey = require('../models/Survey');

exports.createSurvey = async (req, res) => {
  const { name, subject, email, message, rating } = req.body;
  const newSurvey = new Survey({ name, subject, email, message, rating });

  try {
    await newSurvey.save();
    res.status(201).json(newSurvey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
