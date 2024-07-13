const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  sender: { type: String, required: true },
  recipient: { type: String, required: true },
  cc: { type: String },
  bcc: { type: String },
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Email', emailSchema);
