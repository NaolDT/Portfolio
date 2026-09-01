const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
  email:       { type: String, default: 'naoldera8@gmail.com' },
  githubUrl:   { type: String, default: 'https://github.com/NaolDT' },
  linkedinUrl: { type: String, default: 'https://www.linkedin.com/in/naol-dera-5959b9417' },
  cvPath:      { type: String, default: '/assets/NaolDera-CV.pdf' },
}, { timestamps: true });

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);