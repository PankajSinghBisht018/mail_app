const mongoose = require('mongoose');

const emailEventSchema = new mongoose.Schema({
    emailId: String,
    recipient: String,
    openedAt: Date,
    deviceType: { type: String, enum: ['mobile', 'desktop', 'unknown'] },
  });

module.exports = mongoose.model('EmailEvent', emailEventSchema);
