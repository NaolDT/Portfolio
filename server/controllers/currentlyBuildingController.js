const CurrentlyBuilding = require('../models/CurrentlyBuilding');

const getBuilding = async (req, res) => {
  try { res.json(await CurrentlyBuilding.find().sort({ order: 1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

const createBuilding = async (req, res) => {
  try {
    const data = buildData(req.body);
    res.status(201).json(await CurrentlyBuilding.create(data));
  } catch (err) { res.status(400).json({ message: err.message }); }
};

const updateBuilding = async (req, res) => {
  try {
    const data = buildData(req.body);
    const doc  = await CurrentlyBuilding.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json(doc);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

const deleteBuilding = async (req, res) => {
  try {
    const doc = await CurrentlyBuilding.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

function buildData(body) {
  const data = { ...body, order: Number(body.order || 0) };
  if (typeof data.stack === 'string')
    data.stack = data.stack.split(',').map((s) => s.trim()).filter(Boolean);
  if (typeof data.focus === 'string')
    data.focus = data.focus.split('\n').map((f) => f.trim()).filter(Boolean);
  return data;
}

module.exports = { getBuilding, createBuilding, updateBuilding, deleteBuilding };