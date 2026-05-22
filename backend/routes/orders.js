const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { auth } = require('../middleware/auth');

// Place order
router.post('/', auth, async (req, res) => {
  try {
    // Order window: 9AM to 5PM (IST)
    const now = new Date();
    // Convert to IST by adding 5 hours and 30 minutes to UTC
    const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
    const hour = istTime.getUTCHours();
    
    if (hour < 9 || hour >= 17) {
      return res.status(400).json({ message: 'Orders are only accepted from 9:00 AM to 5:00 PM' });
    }

    const { items, hostel, roomNumber } = req.body;
    const deliveryCharge = items.length * 5;
    const subtotal = items.reduce((sum, item) => sum + (item.itemPrice * item.quantity), 0);
    const totalAmount = subtotal + deliveryCharge;

    const order = new Order({
      user: req.user._id,
      studentName: req.user.name,
      mobile: req.user.mobile,
      hostel: hostel || req.user.hostel,
      roomNumber: roomNumber || req.user.roomNumber,
      items,
      subtotal,
      deliveryCharge,
      totalAmount,
      paymentStatus: 'paid',
      orderStatus: 'confirmed'
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
