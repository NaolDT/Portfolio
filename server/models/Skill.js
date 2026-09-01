const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  group: { type: String, required: true },
  name:  { type: String, required: true },
  level: {
    type: String,
    enum: ['Advanced', 'Intermediate', 'Familiar', 'Learning'],
    default: 'Intermediate',
  },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);