const mongoose = require('mongoose');

const factSchema = new mongoose.Schema({
  key:       { type: String, required: true },
  val:       { type: String, required: true },
  highlight: { type: Boolean, default: false },
  order:     { type: Number, default: 0 },
}, { _id: false });

const aboutContentSchema = new mongoose.Schema({
  paragraphs: [String],
  valueTags:  [String],
  facts:      [factSchema],
}, { timestamps: true });

module.exports = mongoose.model('AboutContent', aboutContentSchema);