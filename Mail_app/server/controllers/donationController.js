const Donation = require('../models/Donation');

const saveDonation = async (req, res) => {
  const { donationAmount, donorName, donorEmail, message, currency } = req.body;

  try {
    const newDonation = new Donation({
      donationAmount,
      donorName,
      donorEmail,
      message,
      currency,
    });

    const savedDonation = await newDonation.save();

    res.status(201).json(savedDonation);
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ error: 'Error saving donation' });
  }
};

module.exports = {
  saveDonation,
};
