const mongoose = require('mongoose');

const quickStatSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true },
  sub:   { type: String, default: '' },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('QuickStat', quickStatSchema);