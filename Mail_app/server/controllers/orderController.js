const Razorpay = require('razorpay');
const Order = require('../models/Order'); 

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { amount, currency, items } = req.body; 
  
  try {
    const options = {
      amount: amount * 100, 
      currency,
      receipt: `receipt_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);

    const newOrder = new Order({
      order_id: order.id,
      amount: amount,
      currency: order.currency,
      items: items, 
    });

    await newOrder.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};