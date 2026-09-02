const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://portfolio-naol1.vercel.app',
  'https://portfolio-oh1bpv01e-naol1.vercel.app',
  'https://portfolio-dev-naol.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

app.options(/.*/, cors());

app.use((req, res, next) => {
  if (req.headers['content-type']?.startsWith('multipart/form-data')) {
    return next();
  }
  express.json()(req, res, next);
});

// ── Debug routes ──
app.get('/api/debug-env', (req, res) => {
  res.json({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'MISSING',
    api_key:    process.env.CLOUDINARY_API_KEY    ? 'SET' : 'MISSING',
    api_secret: process.env.CLOUDINARY_API_SECRET ? 'SET' : 'MISSING',
    node_env:   process.env.NODE_ENV,
    client_url: process.env.CLIENT_URL || 'MISSING',
  });
});

app.post('/api/debug-upload', require('./middleware/upload').single('image'), async (req, res) => {
  try {
    console.log('debug-upload hit');
    console.log('file:', req.file ? `${req.file.originalname} (${req.file.size} bytes)` : 'NO FILE');

    if (!req.file) {
      return res.status(400).json({ message: 'No file received by multer' });
    }

    const cloudinary = require('./utils/cloudinary');

    const url = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio/test', resource_type: 'image' },
        (err, result) => {
          if (err) {
            console.log('Cloudinary error:', err.message);
            return reject(err);
          }
          resolve(result.secure_url);
        }
      );
      stream.on('error', (e) => reject(e));
      stream.end(req.file.buffer);
    });

    console.log('Upload success:', url);
    res.json({ success: true, url });
  } catch (err) {
    console.log('Debug upload error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Main routes ──
app.use('/api/projects',   require('./routes/projects'));
app.use('/api/skills',     require('./routes/skills'));
app.use('/api/hero',       require('./routes/hero'));
app.use('/api/about',      require('./routes/about'));
app.use('/api/quickstats', require('./routes/quickstats'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/building',   require('./routes/building'));
app.use('/api/education',  require('./routes/education'));
app.use('/api/settings',   require('./routes/settings'));
app.use('/api/contact',    require('./routes/contact'));
app.use('/api/admin',      require('./routes/admin'));

app.get('/', (req, res) =>
  res.json({ message: 'Portfolio API running', env: process.env.NODE_ENV })
);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));