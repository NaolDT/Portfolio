const Skill = require('../models/Skill');

const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ group: 1, order: 1 });
    res.json(skills);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!skill) return res.status(404).json({ message: 'Not found' });
    res.json(skill);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Skill deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };