const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  topics: [String],
  totalMinutes: Number,
  days: Number,
  schedule: [{
    day: Number,
    minutes: Number,
    topics: [String],
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PlaylistPlan', planSchema);
