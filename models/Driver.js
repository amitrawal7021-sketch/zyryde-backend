const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  licenseNumber: {
    type: String,
    required: true
  },
  vehiclePlate: {
    type: String,
    required: true
  },
  weeklyRent: {
    type: Number,
    default: 0
  },
  totalDue: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'approved', 'rejected']
  },
  registeredBy: {
    type: String,
    default: 'Direct'
  },
  area: {
    type: String,
    default: ''
  },
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);