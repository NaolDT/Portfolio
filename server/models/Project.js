const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  problem:  { type: String, required: true },
  solution: { type: String, required: true },
}, { _id: false });

const archLayerSchema = new mongoose.Schema({
  label:  { type: String, required: true },
  detail: { type: String, required: true },
}, { _id: false });

const architectureSchema = new mongoose.Schema({
  description: String,
  layers:      [archLayerSchema],
}, { _id: false });

const projectSchema = new mongoose.Schema({
  title:        { type: String, required: true, trim: true },
  category:     { type: String, enum: ['Full Stack', 'Frontend', 'Backend', 'Academic'], default: 'Full Stack' },
  status:       { type: String, enum: ['active', 'completed'], default: 'active' },
  featured:     { type: Boolean, default: false },
  tagline:      { type: String, default: '' },
  overview:     { type: String, default: '' },
  contribution: { type: String, default: '' },
  features:     [String],
  challenges:   [challengeSchema],
  technologies: [String],
  architecture: architectureSchema,
  apiEndpoints: [String],
  images:       { type: [String], default: [] },
  githubUrl:    { type: String, default: '' },
  liveUrl:      { type: String, default: '' },
  order:        { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);