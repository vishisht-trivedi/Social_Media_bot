const mongoose = require('mongoose');

const trendSchema = new mongoose.Schema({
  hashtag: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trend', trendSchema); 