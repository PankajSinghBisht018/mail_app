const Survey = require('../models/Survey');

exports.createSurvey = async (req, res) => {
  const { name, subject, email, message } = req.body;
  const newSurvey = new Survey({ name, subject, email, message });

  try {
    await newSurvey.save();
    res.status(201).json(newSurvey);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
