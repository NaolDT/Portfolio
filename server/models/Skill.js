const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    group: { type: String, required: true },
    name:  { type: String, required: true },
    pct:   { type: Number, required: true, min: 0, max: 100 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);