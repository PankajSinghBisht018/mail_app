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


const getLatestDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .sort({ createdAt: -1 }) 
      .limit(4);
    res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching latest donations:', error);
    res.status(500).json({ error: 'Error fetching latest donations' });
  }
};

module.exports = {
  saveDonation,getLatestDonations

};
