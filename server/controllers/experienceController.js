const Experience = require('../models/Experience');

const getExperiences = async (req, res) => {
  try { res.json(await Experience.find().sort({ order: 1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

const createExperience = async (req, res) => {
  try {
    const data = buildExperienceData(req.body);
    res.status(201).json(await Experience.create(data));
  } catch (err) { res.status(400).json({ message: err.message }); }
};

const updateExperience = async (req, res) => {
  try {
    const data = buildExperienceData(req.body);
    const doc  = await Experience.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

const deleteExperience = async (req, res) => {
  try {
    const doc = await Experience.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

function buildExperienceData(body) {
  const data = { ...body, order: Number(body.order || 0) };
  if (typeof data.highlights === 'string') {
    data.highlights = data.highlights.split('\n').map((h) => h.trim()).filter(Boolean);
  }
  return data;
}

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };