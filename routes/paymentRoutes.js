const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// GET all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find().populate('driver', 'name phone vehiclePlate');
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET payments by driver
router.get('/driver/:driverId', async (req, res) => {
  try {
    const payments = await Payment.find({ driver: req.params.driverId })
      .populate('driver', 'name phone vehiclePlate');
    res.json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST create payment
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT update payment status
router.put('/:id', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: payment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;