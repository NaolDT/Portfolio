const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const projectRoutes = require('./routes/projects');
const skillRoutes   = require('./routes/skills');
const contactRoutes = require('./routes/contact');
const adminRoutes   = require('./routes/admin');

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
    console.log('CORS blocked origin:', origin);
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
}));

app.options('/(.*)', cors());

app.use(express.json());

app.use('/api/projects', projectRoutes);
app.use('/api/skills',   skillRoutes);
app.use('/api/contact',  contactRoutes);
app.use('/api/admin',    adminRoutes);

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