const Project    = require('../models/Project');
const cloudinary = require('../utils/cloudinary');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const createProject = async (req, res) => {
  try {
    const data = parseProjectBody(req.body);
    if (req.file) {
      data.image = await uploadToCloudinary(req.file);
    } else {
      delete data.image;
    }
    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (err) {
    console.log('CREATE ERROR:', err.message);
    res.status(400).json({ message: 'Validation error', error: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const data = parseProjectBody(req.body);
    if (req.file) {
      data.image = await uploadToCloudinary(req.file);
    } else {
      delete data.image;
    }
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    console.log('UPDATE ERROR:', err.message);
    res.status(400).json({ message: 'Validation error', error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

function parseProjectBody(body) {
  const data = { ...body };

  const jsonFields = ['technologies', 'features', 'apiEndpoints', 'challenges', 'architecture'];

  jsonFields.forEach((field) => {
    if (!data[field] || data[field] === '' || data[field] === 'undefined' || data[field] === 'null') {
      data[field] = field === 'architecture' ? { description: '', layers: [] } : [];
      return;
    }
    if (typeof data[field] === 'string') {
      try {
        data[field] = JSON.parse(data[field]);
      } catch {
        data[field] = field === 'architecture' ? { description: '', layers: [] } : [];
      }
    }
  });

  if (data.featured !== undefined)
    data.featured = data.featured === 'true' || data.featured === true;
  if (data.order !== undefined)
    data.order = Number(data.order) || 0;

  if (data.image !== undefined && typeof data.image !== 'string') {
    delete data.image;
  }
  if (data.image === '' || data.image === 'null' || data.image === 'undefined') {
    delete data.image;
  }

  return data;
}

async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: 'portfolio/projects', resource_type: 'image' },
        (err, result) => {
          if (err) return reject(err);
          resolve(result.secure_url);
        }
      )
      .end(file.buffer);
  });
}

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };