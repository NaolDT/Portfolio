const mongoose = require('mongoose');

const currentlyBuildingSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  status:      { type: String, required: true },
  statusColor: { type: String, enum: ['cyan', 'yellow', 'purple', 'green'], default: 'cyan' },
  description: { type: String, default: '' },
  stack:       [String],
  focus:       [String],
  order:       { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('CurrentlyBuilding', currentlyBuildingSchema);