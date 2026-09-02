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
    let imageUrl = null;
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file);
        console.log('Cloudinary URL:', imageUrl);
      } catch (uploadErr) {
        console.log('Upload failed:', uploadErr.message);
        return res.status(500).json({ message: 'Image upload failed', error: uploadErr.message });
      }
    }

    const data = parseProjectBody(req.body);

    if (imageUrl) {
      data.image = imageUrl;
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
    let imageUrl = null;
    if (req.file) {
      try {
        imageUrl = await uploadToCloudinary(req.file);
        console.log('Cloudinary URL:', imageUrl);
      } catch (uploadErr) {
        console.log('Upload failed:', uploadErr.message);
        return res.status(500).json({ message: 'Image upload failed', error: uploadErr.message });
      }
    }

    const data = parseProjectBody(req.body);

    if (imageUrl) {
      data.image = imageUrl;
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

  delete data.image;

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

  return data;
}

async function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder:        'portfolio/projects',
        resource_type: 'image',
        timeout:       60000,
      },
      (error, result) => {
        if (error) {
          console.log('Cloudinary error:', error.message);
          return reject(new Error(`Cloudinary upload failed: ${error.message}`));
        }
        if (!result || !result.secure_url) {
          return reject(new Error('Cloudinary returned no URL'));
        }
        resolve(result.secure_url);
      }
    );

    stream.on('error', (err) => reject(new Error(`Stream error: ${err.message}`)));
    stream.end(file.buffer);
  });
}

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };