const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  stallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Stall' },
  stallName: String,
  itemName: String,
  itemPrice: Number,
  quantity: { type: Number, default: 1 }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  studentName: String,
  mobile: String,
  hostel: String,
  roomNumber: String,
  items: [orderItemSchema],
  subtotal: Number,
  deliveryCharge: Number,
  totalAmount: Number,
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  orderStatus: { type: String, enum: ['confirmed', 'preparing', 'out_for_delivery', 'delivered'], default: 'confirmed' },
  orderDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
