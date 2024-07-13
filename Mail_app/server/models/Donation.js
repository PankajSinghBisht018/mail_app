const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donationAmount: {
    type: Number,
    required: true,
  },
  donorName: {
    type: String,
    required: true,
  },
  donorEmail: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    default: '',
  },
  currency: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
