const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  role:        { type: String, required: true },
  org:         { type: String, required: true },
  period:      { type: String, required: true },
  type:        {
    type: String,
    enum: ['education', 'internship', 'independent', 'academic', 'freelance'],
    default: 'independent',
  },
  description: { type: String, default: '' },
  highlights:  [String],
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Experience', experienceSchema);