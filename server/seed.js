require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const Admin    = require('./models/Admin');
const Skill    = require('./models/Skill');

const defaultSkills = [
  { group: 'Frontend',         name: 'React.js',               pct: 88, order: 1 },
  { group: 'Frontend',         name: 'JavaScript (ES6+)',       pct: 85, order: 2 },
  { group: 'Frontend',         name: 'HTML / CSS',              pct: 90, order: 3 },
  { group: 'Frontend',         name: 'Tailwind CSS',            pct: 78, order: 4 },
  { group: 'Backend',          name: 'Node.js',                 pct: 82, order: 1 },
  { group: 'Backend',          name: 'Express.js',              pct: 80, order: 2 },
  { group: 'Backend',          name: 'REST API Design',         pct: 83, order: 3 },
  { group: 'Backend',          name: 'JWT / Auth',              pct: 75, order: 4 },
  { group: 'Database & Tools', name: 'MongoDB',                 pct: 79, order: 1 },
  { group: 'Database & Tools', name: 'MySQL',                   pct: 82, order: 2 },
  { group: 'Database & Tools', name: 'Git / GitHub',            pct: 85, order: 3 },
  { group: 'Database & Tools', name: 'Postman',                 pct: 77, order: 4 },
  { group: 'Architecture',     name: 'Software Architecture',   pct: 74, order: 1 },
  { group: 'Architecture',     name: 'System Design',           pct: 72, order: 2 },
  { group: 'Architecture',     name: 'UML / Diagrams',          pct: 80, order: 3 },
  { group: 'Architecture',     name: 'Agile / Scrum',           pct: 70, order: 4 },
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');

  const exists = await Admin.findOne({ username: 'naol' });
  if (!exists) {
    const passwordHash = await bcrypt.hash('dev-naol-1997', 12);
    await Admin.create({ username: 'naol', passwordHash });
    console.log('✅ Admin created: naol / dev-naol-1997');
  } else {
    console.log('ℹ️  Admin already exists — skipping');
  }

  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.insertMany(defaultSkills);
    console.log(`✅ ${defaultSkills.length} skills seeded`);
  } else {
    console.log('ℹ️  Skills already exist — skipping');
  }

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch((err) => { console.error(err); process.exit(1); });