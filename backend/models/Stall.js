const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'Main' },
  isAvailable: { type: Boolean, default: true },
  image: { type: String, default: '' }
});

const stallSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  category: { type: String, default: 'General' },
  isOpen: { type: Boolean, default: true },
  rating: { type: Number, default: 4.0 },
  deliveryTime: { type: String, default: '30-45 min' },
  menu: [menuItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Stall', stallSchema);
