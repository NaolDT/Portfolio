const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    description: { type: String, required: true },
    tags:        [String],
    status:      { type: String, enum: ['active', 'completed'], default: 'completed' },
    featured:    { type: Boolean, default: false },
    githubUrl:   String,
    liveUrl:     String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);