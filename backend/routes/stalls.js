const express = require('express');
const router = express.Router();
const Stall = require('../models/Stall');
const { adminAuth } = require('../middleware/auth');

// Get all stalls
router.get('/', async (req, res) => {
  try {
    const stalls = await Stall.find().sort({ name: 1 });
    res.json(stalls);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single stall
router.get('/:id', async (req, res) => {
  try {
    const stall = await Stall.findById(req.params.id);
    if (!stall) return res.status(404).json({ message: 'Stall not found' });
    res.json(stall);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Add new stall
router.post('/', adminAuth, async (req, res) => {
  try {
    const stall = new Stall(req.body);
    await stall.save();
    res.status(201).json(stall);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin: Update stall details (name, image, category, etc.)
// FIX: Use $set so only provided fields update — menu is NOT touched
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { menu, ...stallFields } = req.body; // separate menu from other fields

    let updateQuery;
    if (menu) {
      // If menu is included (e.g. when editing menu items), update everything
      updateQuery = { $set: { ...stallFields, menu } };
    } else {
      // Only update stall details — DO NOT touch menu
      updateQuery = { $set: stallFields };
    }

    const stall = await Stall.findByIdAndUpdate(
      req.params.id,
      updateQuery,
      { new: true, runValidators: false }
    );
    res.json(stall);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Admin: Toggle open/close
router.patch('/:id/toggle', adminAuth, async (req, res) => {
  try {
    const stall = await Stall.findById(req.params.id);
    stall.isOpen = !stall.isOpen;
    await stall.save();
    res.json(stall);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Delete stall
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Stall.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Add menu item
router.post('/:id/menu', adminAuth, async (req, res) => {
  try {
    const stall = await Stall.findById(req.params.id);
    stall.menu.push(req.body);
    await stall.save();
    res.json(stall);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Delete menu item
router.delete('/:stallId/menu/:itemId', adminAuth, async (req, res) => {
  try {
    const stall = await Stall.findById(req.params.stallId);
    stall.menu = stall.menu.filter(i => i._id.toString() !== req.params.itemId);
    await stall.save();
    res.json(stall);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin: Update single menu item
router.put('/:stallId/menu/:itemId', adminAuth, async (req, res) => {
  try {
    const stall = await Stall.findById(req.params.stallId);
    const itemIndex = stall.menu.findIndex(i => i._id.toString() === req.params.itemId);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found' });
    // Update only the changed fields
    stall.menu[itemIndex] = { ...stall.menu[itemIndex].toObject(), ...req.body };
    await stall.save();
    res.json(stall);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
