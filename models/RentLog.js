const mongoose = require('mongoose');

const rentLogSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['paid', 'pending'],
    default: 'pending'
  },
  note: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('RentLog', rentLogSchema);