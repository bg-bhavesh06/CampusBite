const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const XLSX = require('xlsx');
const { adminAuth } = require('../middleware/auth');

// Get all orders
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const { date, hostel } = req.query;
    let query = {};
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.createdAt = { $gte: start, $lte: end };
    }
    if (hostel) query.hostel = hostel;
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get today's orders
router.get('/orders/today', adminAuth, async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const orders = await Order.find({ createdAt: { $gte: start, $lte: end } }).sort({ hostel: 1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Download Excel - Today's Orders
router.get('/orders/export', adminAuth, async (req, res) => {
  try {
    const { date } = req.query;
    let start, end;
    if (date) {
      start = new Date(date); start.setHours(0, 0, 0, 0);
      end = new Date(date); end.setHours(23, 59, 59, 999);
    } else {
      start = new Date(); start.setHours(0, 0, 0, 0);
      end = new Date(); end.setHours(23, 59, 59, 999);
    }
    const orders = await Order.find({ createdAt: { $gte: start, $lte: end } }).sort({ hostel: 1 });

    const data = orders.map((order, idx) => ({
      'Sr.No': idx + 1,
      'Order ID': order._id.toString().slice(-6).toUpperCase(),
      'Student Name': order.studentName,
      'Mobile': order.mobile,
      'Hostel': order.hostel,
      'Room No': order.roomNumber,
      'Items Ordered': order.items.map(i => `${i.itemName} x${i.quantity} (₹${i.itemPrice})`).join(' | '),
      'Subtotal': `₹${order.subtotal}`,
      'Delivery Charge': `₹${order.deliveryCharge}`,
      'Total Amount': `₹${order.totalAmount}`,
      'Payment Status': order.paymentStatus,
      'Order Time': new Date(order.createdAt).toLocaleTimeString('en-IN')
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = [
      { wch: 6 }, { wch: 12 }, { wch: 20 }, { wch: 14 }, { wch: 15 },
      { wch: 10 }, { wch: 50 }, { wch: 12 }, { wch: 16 }, { wch: 14 }, { wch: 14 }, { wch: 12 }
    ];
    XLSX.utils.book_append_sheet(wb, ws, 'Orders');
    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    const fileName = `orders_${(date || new Date().toISOString().split('T')[0])}.xlsx`;

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false }).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Dashboard stats
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end = new Date(); end.setHours(23, 59, 59, 999);
    const todayOrders = await Order.find({ createdAt: { $gte: start, $lte: end } });
    const totalUsers = await User.countDocuments({ isAdmin: false });
    const totalOrders = await Order.countDocuments();
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const hostels = [...new Set(todayOrders.map(o => o.hostel))];

    res.json({
      todayOrders: todayOrders.length,
      todayRevenue,
      totalUsers,
      totalOrders,
      activeHostels: hostels.length
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
