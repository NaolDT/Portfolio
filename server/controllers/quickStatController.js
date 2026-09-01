const QuickStat = require('../models/QuickStat');

const getStats = async (req, res) => {
  try { res.json(await QuickStat.find().sort({ order: 1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

const createStat = async (req, res) => {
  try {
    const payload = { ...req.body, order: Number(req.body.order || 0) };
    res.status(201).json(await QuickStat.create(payload));
  } catch (err) { res.status(400).json({ message: err.message }); }
};

const updateStat = async (req, res) => {
  try {
    const doc = await QuickStat.findByIdAndUpdate(
      req.params.id,
      { ...req.body, order: Number(req.body.order || 0) },
      { new: true }
    );
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

const deleteStat = async (req, res) => {
  try {
    const doc = await QuickStat.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getStats, createStat, updateStat, deleteStat };