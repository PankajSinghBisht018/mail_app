const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  htmlContent: { type: String, required: true },
  recipient: { type: String, required: true },
  sender: { type: String, required: true },
  messageId: { type: String },
  sentAt: { type: Date },
  scheduledDate: { type: Date },
  isScheduled: { type: Boolean, default: false },
  sent: { type: Boolean, default: false },
  canceled: { type: Boolean, default: false },
  userId: { type:String , required: true }
});

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);
