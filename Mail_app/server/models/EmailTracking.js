const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailTrackingSchema = new Schema({
  emailId: { type: Schema.Types.ObjectId, ref: 'EmailTemplate', required: true },
  openedAt: { type: Date },
  recipient: { type: String, required: true },
  userId: { type: String, required: true },
  openCount: { type: Number, default: 1 }, 
});

module.exports = mongoose.model('EmailTracking', EmailTrackingSchema);
