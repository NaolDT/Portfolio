const mongoose = require('mongoose');

const heroContentSchema = new mongoose.Schema({
  headline:    { type: String, default: 'Full Stack Developer building production-minded web applications.' },
  subText:     { type: String, default: 'I design and build full-stack systems with modern frontend, backend API architecture, and database design — from concept to deployed product.' },
  contextText: { type: String, default: 'Software Engineering student at Jimma University, Ethiopia.' },
  available:   { type: Boolean, default: true },
  cvPath:      { type: String, default: '/assets/NaolDera-CV.pdf' },
}, { timestamps: true });

module.exports = mongoose.model('HeroContent', heroContentSchema);