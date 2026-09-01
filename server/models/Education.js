const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  org:    { type: String, required: true },
  year:   { type: String, default: '' },
  note:   { type: String, default: '' },
  status: { type: String, default: 'Earned' },
}, { _id: false });

const educationSchema = new mongoose.Schema({
  degree:         { type: String, default: 'BSc Software Engineering' },
  university:     { type: String, default: 'Jimma University — Institute of Technology' },
  faculty:        { type: String, default: 'Faculty of Computing and Informatics' },
  period:         { type: String, default: '2024 — 2028 (Expected)' },
  courses:        [String],
  certifications: [certificationSchema],
  certNote:       { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Education', educationSchema);