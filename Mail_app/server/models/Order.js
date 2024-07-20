const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  order_id: String,
  amount: Number,
  currency: String,
  items: [{ id: String, title: String, price: Number }],
});

module.exports = mongoose.model('Order', OrderSchema);
