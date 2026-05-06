const express = require('express');
const router = express.Router();
const RentLog = require('../models/RentLog');

// Get all rent logs (optionally filter by driver)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.driver ? { driver: req.query.driver } : {};
    const logs = await RentLog.find(filter).populate('driver', 'name vehiclePlate').sort({ date: -1 });
    res.json({ success: true, data: logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add a rent log entry
router.post('/', async (req, res) => {
  try {
    const log = await RentLog.create(req.body);
    const populated = await log.populate('driver', 'name vehiclePlate');
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Update a rent log (mark paid/pending)
router.put('/:id', async (req, res) => {
  try {
    const log = await RentLog.findByIdAndUpdate(req.id, req.body, { new: true });
    res.json({ success: true, data: log });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// Delete a rent log
router.delete('/:id', async (req, res) => {
  try {
    await RentLog.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

module.exports = router;