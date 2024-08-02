const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true }, 
  design: { type: String, required: true }
});

module.exports = mongoose.model('Template', templateSchema);
