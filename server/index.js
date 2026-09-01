const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://portfolio-naol1.vercel.app',
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