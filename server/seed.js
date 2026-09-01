require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const Admin             = require('./models/Admin');
const Skill             = require('./models/Skill');
const Project           = require('./models/Project');
const HeroContent       = require('./models/HeroContent');
const AboutContent      = require('./models/AboutContent');
const QuickStat         = require('./models/QuickStat');
const Experience        = require('./models/Experience');
const CurrentlyBuilding = require('./models/CurrentlyBuilding');
const Education         = require('./models/Education');
const SiteSettings      = require('./models/SiteSettings');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected\n');

  const adminExists = await Admin.findOne({ username: 'naol' });
  if (!adminExists) {
    const passwordHash = await bcrypt.hash('dev-naol-1997', 12);
    await Admin.create({ username: 'naol', passwordHash });
    console.log('✅ Admin created: naol / dev-naol-1997');
  } else {
    console.log('ℹ️  Admin exists — skipping');
  }

  if ((await SiteSettings.countDocuments()) === 0) {
    await SiteSettings.create({
      email:       'naoldera8@gmail.com',
      githubUrl:   'https://github.com/NaolDT',
      linkedinUrl: 'https://www.linkedin.com/in/naol-dera-5959b9417',
      cvPath:      '/assets/NaolDera-CV.pdf',
    });
    console.log('✅ SiteSettings seeded');
  } else {
    console.log('ℹ️  SiteSettings exist — skipping');
  }

  if ((await HeroContent.countDocuments()) === 0) {
    await HeroContent.create({
      headline:    'Full Stack Developer building production-minded web applications.',
      subText:     'I design and build full-stack systems with modern frontend, backend API architecture, and database design — from concept to deployed product.',
      contextText: 'Software Engineering student at Jimma University, Ethiopia.',
      available:   true,
      cvPath:      '/assets/NaolDera-CV.pdf',
    });
    console.log('✅ HeroContent seeded');
  } else {
    console.log('ℹ️  HeroContent exists — skipping');
  }

  if ((await QuickStat.countDocuments()) === 0) {
    await QuickStat.insertMany([
      { value: '4+',         label: 'Projects Shipped',  sub: 'production deployed',              order: 1 },
      { value: 'MERN',       label: 'Primary Stack',     sub: 'MongoDB · Express · React · Node', order: 2 },
      { value: 'Full Stack', label: 'Development Focus', sub: 'frontend + backend + database',    order: 3 },
      { value: 'SE Student', label: 'Jimma University',  sub: 'BSc Software Engineering',         order: 4 },
    ]);
    console.log('✅ QuickStats seeded');
  } else {
    console.log('ℹ️  QuickStats exist — skipping');
  }

  if ((await AboutContent.countDocuments()) === 0) {
    await AboutContent.create({
      paragraphs: [
        'I am a Software Engineering student at Jimma University Institute of Technology, building full-stack web applications independently while studying software engineering principles, system design, and distributed systems.',
        'I do not just build interfaces — I design and implement the full system: REST APIs, database schemas, authentication, authorization, deployment pipelines, and the frontend that ties it all together.',
        'My work is driven by engineering discipline. I think about architecture, data flow, security, and maintainability from the start of every project.',
      ],
      valueTags: [
        'Clean architecture',
        'Real-world systems',
        'Engineering discipline',
        'Continuous learning',
      ],
      facts: [
        { key: 'location',   val: 'Jimma, Ethiopia',         highlight: false, order: 1 },
        { key: 'university', val: 'Jimma University',         highlight: false, order: 2 },
        { key: 'degree',     val: 'BSc Software Engineering', highlight: false, order: 3 },
        { key: 'year',       val: '2024 → 2028',             highlight: false, order: 4 },
        { key: 'focus',      val: 'MERN Stack',              highlight: false, order: 5 },
        { key: 'available',  val: 'Open to work',            highlight: true,  order: 6 },
      ],
    });
    console.log('✅ AboutContent seeded');
  } else {
    console.log('ℹ️  AboutContent exists — skipping');
  }

  if ((await Skill.countDocuments()) === 0) {
    await Skill.insertMany([
      { group: 'Frontend', name: 'React.js',       level: 'Advanced',     order: 1 },
      { group: 'Frontend', name: 'JavaScript',     level: 'Advanced',     order: 2 },
      { group: 'Frontend', name: 'HTML / CSS',     level: 'Advanced',     order: 3 },
      { group: 'Frontend', name: 'Tailwind CSS',   level: 'Intermediate', order: 4 },
      { group: 'Frontend', name: 'Responsive UI',  level: 'Advanced',     order: 5 },
      { group: 'Frontend', name: 'Vite',           level: 'Intermediate', order: 6 },
      { group: 'Backend', name: 'Node.js',         level: 'Intermediate', order: 1 },
      { group: 'Backend', name: 'Express.js',      level: 'Intermediate', order: 2 },
      { group: 'Backend', name: 'REST API Design', level: 'Intermediate', order: 3 },
      { group: 'Backend', name: 'JWT Auth',        level: 'Intermediate', order: 4 },
      { group: 'Backend', name: 'Middleware',      level: 'Intermediate', order: 5 },
      { group: 'Backend', name: 'Nodemailer',      level: 'Intermediate', order: 6 },
      { group: 'Databases', name: 'MongoDB',         level: 'Intermediate', order: 1 },
      { group: 'Databases', name: 'MySQL',           level: 'Intermediate', order: 2 },
      { group: 'Databases', name: 'SQL Server',      level: 'Familiar',     order: 3 },
      { group: 'Databases', name: 'Mongoose',        level: 'Intermediate', order: 4 },
      { group: 'Databases', name: 'Database Design', level: 'Intermediate', order: 5 },
      { group: 'Engineering', name: 'Git / GitHub',          level: 'Advanced',     order: 1 },
      { group: 'Engineering', name: 'Software Architecture', level: 'Familiar',     order: 2 },
      { group: 'Engineering', name: 'System Design',         level: 'Familiar',     order: 3 },
      { group: 'Engineering', name: 'UML / Diagrams',        level: 'Intermediate', order: 4 },
      { group: 'Engineering', name: 'API Design',            level: 'Intermediate', order: 5 },
      { group: 'Engineering', name: 'Postman / Thunder',     level: 'Intermediate', order: 6 },
      { group: 'Currently Learning', name: 'TypeScript',      level: 'Learning', order: 1 },
      { group: 'Currently Learning', name: 'Next.js',         level: 'Learning', order: 2 },
      { group: 'Currently Learning', name: 'NestJS',          level: 'Learning', order: 3 },
      { group: 'Currently Learning', name: 'Python',          level: 'Learning', order: 4 },
      { group: 'Currently Learning', name: 'AWS',             level: 'Learning', order: 5 },
      { group: 'Currently Learning', name: 'DevOps / Docker', level: 'Learning', order: 6 },
      { group: 'Currently Learning', name: 'AI / ML',         level: 'Learning', order: 7 },
      { group: 'Currently Learning', name: 'Cybersecurity',   level: 'Learning', order: 8 },
    ]);
    console.log('✅ Skills seeded (31 skills across 5 groups)');
  } else {
    console.log('ℹ️  Skills exist — skipping');
  }

  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      {
        title:        'Hirmata Mentina Kebele E-Commerce System',
        category:     'Full Stack',
        status:       'active',
        featured:     true,
        order:        1,
        tagline:      'A multi-role marketplace designed to support local digital commerce in Jimma, Ethiopia.',
        overview:     'A production-deployed full-stack marketplace serving Hirmata Mentina Kebele. The platform enables local sellers to register, list products, and transact with buyers through a structured, role-based system. Admin staff oversee seller verification, dispute resolution, and platform health.',
        contribution: 'Sole developer. Designed the full system architecture, implemented the backend REST API, database schema, authentication and authorization system, frontend UI, payment wallet logic, real-time chat, multilingual support, and deployment pipeline.',
        features: [
          'Three-role authentication — Admin, Seller, Buyer — with JWT and protected routes',
          'Seller verification against a seeded trade office database using TIN and Seller ID',
          'Product listing, search, and category management',
          'Price negotiation via real-time chat between buyers and sellers',
          'Escrow wallet system supporting Telebirr, CBE Birr, and Awash Bank',
          'Dispute resolution with evidence upload and admin adjudication',
          'Wishlist, order management, and notification system',
          'Multilingual support — English, Amharic, Oromo',
          'Dark and light theme toggle',
        ],
        challenges: [
          {
            problem:  'How to support multiple user roles with different access levels across the same application.',
            solution: 'Designed role-based authorization middleware that attaches to every protected route, checking the JWT payload role before allowing access. Admin, Seller, and Buyer routes are fully separated at the API level.',
          },
          {
            problem:  'Images uploaded by sellers needed to persist across server restarts on Railway.',
            solution: 'Migrated from local filesystem storage to Cloudinary with a dedicated upload middleware, ensuring all product images are cloud-persisted regardless of deployment state.',
          },
          {
            problem:  'Seller trust and fraud prevention in a local commerce context.',
            solution: 'Implemented a verification flow requiring sellers to submit TIN and Seller ID, validated server-side against a seeded official registry before seller status is activated.',
          },
        ],
        technologies: ['React 18', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'Cloudinary', 'REST API', 'i18n', 'Railway', 'Vercel'],
        architecture: {
          description: 'React SPA → Express REST API → MySQL database, with Cloudinary for media, JWT for stateless auth, and Railway + Vercel for deployment.',
          layers: [
            { label: 'Frontend', detail: 'React 18 + Vite, deployed on Vercel' },
            { label: 'REST API', detail: 'Express.js with role-based middleware' },
            { label: 'Database', detail: 'MySQL — Users, Products, Orders, Transactions, Disputes' },
            { label: 'Media',    detail: 'Cloudinary image storage' },
            { label: 'Auth',     detail: 'JWT — stateless, role-encoded tokens' },
          ],
        },
        apiEndpoints: [
          'POST /api/auth/login',
          'POST /api/auth/register',
          'GET  /api/products',
          'POST /api/products',
          'PUT  /api/products/:id',
          'POST /api/orders',
          'GET  /api/orders/:id',
          'POST /api/disputes',
          'PUT  /api/disputes/:id/resolve',
        ],
        githubUrl: 'https://github.com/NaolDT/hirmata-ecommerce',
        liveUrl:   'https://hirmata-ecommerce.vercel.app/',
        image:     null,
      },
      {
        title:        'Pizza Delivery App — OIBSIP Internship',
        category:     'Full Stack',
        status:       'active',
        featured:     false,
        order:        2,
        tagline:      'A full-stack pizza ordering platform with custom builder, Razorpay payments, and automated email notifications.',
        overview:     'Built as the Level 3 task for the Oasis Infobyte internship program. A complete pizza delivery system where users build custom orders, pay via Razorpay, and receive automated email confirmations. The backend manages inventory, order state, and scheduled low-stock alerts.',
        contribution: 'Sole developer. Built the full MERN stack system including the custom pizza builder UI, backend order and inventory management, Razorpay payment integration, email automation with Brevo, authentication with email verification, and deployment to Vercel and Render.',
        features: [
          'Custom pizza builder — select base, sauce, cheese, and toppings',
          'Server-side pricing and stock validation',
          'Razorpay payment integration with HMAC-SHA256 verification',
          'JWT authentication with email verification flow',
          'Forgot and reset password via email',
          'Automated order confirmation emails via Brevo HTTP API',
          'node-cron scheduled job for low-stock admin alerts',
          'Admin dashboard for order and inventory management',
        ],
        challenges: [
          {
            problem:  'Preventing price manipulation — clients should not be able to submit arbitrary prices.',
            solution: 'All pricing is calculated server-side based on submitted ingredient IDs. The frontend never sends a price — only a list of selected ingredients. The backend looks up and sums actual prices.',
          },
          {
            problem:  'Email delivery reliability across multiple providers.',
            solution: 'After testing SMTP and Brevo SMTP, migrated to Brevo HTTP API which provided consistent delivery without authentication issues in production.',
          },
        ],
        technologies: ['React', 'Vite', 'Tailwind CSS v4', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'Brevo', 'node-cron', 'JWT', 'Vercel', 'Render'],
        architecture: {
          description: 'React frontend → Express REST API → MongoDB, with Razorpay for payments and Brevo for transactional email.',
          layers: [
            { label: 'Frontend', detail: 'React + Vite + Tailwind CSS v4, Vercel' },
            { label: 'REST API', detail: 'Express.js with JWT middleware' },
            { label: 'Database', detail: 'MongoDB — Users, Orders, Products, Inventory' },
            { label: 'Payments', detail: 'Razorpay with HMAC-SHA256 verification' },
            { label: 'Email',    detail: 'Brevo HTTP API + node-cron scheduler' },
          ],
        },
        apiEndpoints: [
          'POST /api/auth/register',
          'POST /api/auth/login',
          'POST /api/auth/verify-email',
          'GET  /api/products',
          'POST /api/orders',
          'POST /api/payments/verify',
          'GET  /api/admin/orders',
          'GET  /api/admin/inventory',
        ],
        githubUrl: 'https://github.com/NaolDT/OIBSIP',
        liveUrl:   'https://oibsip-phi.vercel.app',
        image:     null,
      },
      {
        title:        'Netflix Clone',
        category:     'Frontend',
        status:       'active',
        featured:     false,
        order:        3,
        tagline:      'A pixel-accurate Netflix UI with live movie data from the TMDb API.',
        overview:     'A frontend learning project built to practice React component architecture, external API integration, and responsive UI design. Pulls live movie and TV data from TMDb and organizes it into category rows matching the Netflix layout.',
        contribution: 'Sole developer. Built as an independent learning exercise to practice React hooks, API integration, and responsive CSS.',
        features: [
          'Live movie and TV data from The Movie Database (TMDb) API',
          'Auto-rotating hero banner with featured titles',
          'Category rows — Trending, Top Rated, Action, Comedy, and more',
          'Responsive layout across mobile and desktop',
          'Hover effects and smooth card interactions',
        ],
        challenges: [
          {
            problem:  'Managing multiple simultaneous API requests without blocking the UI.',
            solution: 'Used parallel Promise.all requests for each category row, rendering available rows progressively as data arrives.',
          },
        ],
        technologies: ['React.js', 'Material UI', 'TMDb API', 'Axios', 'CSS', 'GitHub Pages'],
        architecture: {
          description: 'Static React SPA consuming the TMDb public API, deployed on GitHub Pages.',
          layers: [
            { label: 'Frontend',   detail: 'React.js + Material UI' },
            { label: 'Data',       detail: 'TMDb REST API (public, no backend required)' },
            { label: 'Deployment', detail: 'GitHub Pages' },
          ],
        },
        apiEndpoints: [],
        githubUrl: 'https://github.com/NaolDT/Netflix-Clone',
        liveUrl:   'https://naoldt.github.io/Netflix-Clone/',
        image:     null,
      },
      {
        title:        'Amazon Clone',
        category:     'Frontend',
        status:       'active',
        featured:     false,
        order:        4,
        tagline:      'An Amazon storefront clone practicing React state management and e-commerce UI patterns.',
        overview:     'A frontend learning project built to practice React Context API, component architecture, and e-commerce UI patterns. Implements a working shopping cart with state shared across all pages.',
        contribution: 'Sole developer. Built as an independent learning exercise focused on React state management patterns and responsive layout.',
        features: [
          'Product listing and individual product pages',
          'Shopping cart with quantity controls',
          'React Context API for global cart state',
          'Checkout page with order summary',
          'Responsive layout matching Amazon design patterns',
        ],
        challenges: [
          {
            problem:  'Sharing cart state across multiple pages without prop drilling.',
            solution: 'Implemented React Context API with a custom CartProvider, making cart state and dispatch functions accessible throughout the component tree.',
          },
        ],
        technologies: ['React.js', 'Context API', 'CSS', 'Firebase', 'Netlify'],
        architecture: {
          description: 'Static React SPA with client-side state management via Context API, deployed on Netlify.',
          layers: [
            { label: 'Frontend',   detail: 'React.js + Context API' },
            { label: 'Auth/DB',    detail: 'Firebase (authentication)' },
            { label: 'Deployment', detail: 'Netlify' },
          ],
        },
        apiEndpoints: [],
        githubUrl: 'https://github.com/NaolDT/Amazon-Clone',
        liveUrl:   'https://amazon-clone-practice1.netlify.app/',
        image:     null,
      },
    ]);
    console.log('✅ Projects seeded (4 projects)');
  } else {
    console.log('ℹ️  Projects exist — skipping');
  }

  if ((await Experience.countDocuments()) === 0) {
    await Experience.insertMany([
      {
        role:        'Software Engineering Student',
        org:         'Jimma University — Institute of Technology',
        period:      '2024 — Present',
        type:        'education',
        description: 'Pursuing a BSc in Software Engineering at Jimma University Institute of Technology. Coursework covers software architecture, distributed systems, algorithms, database systems, and software design.',
        highlights:  [
          'Software Architecture & Design',
          'Distributed Systems',
          'Database Systems',
          'Cloud Computing & IoT',
          'Linear Algebra & Mathematics',
        ],
        order: 1,
      },
      {
        role:        'Full Stack Developer Intern',
        org:         'Oasis Infobyte (OIBSIP)',
        period:      '2026',
        type:        'internship',
        description: 'Completed Level 3 internship task — designed and deployed a production-grade MERN stack pizza delivery application with payment integration, automated email workflows, and admin inventory management.',
        highlights:  [
          'Built complete MERN stack application independently',
          'Integrated Razorpay payment gateway',
          'Implemented automated email via Brevo HTTP API',
          'Deployed frontend to Vercel, backend to Render',
        ],
        order: 2,
      },
      {
        role:        'Independent Full Stack Developer',
        org:         'Self-directed',
        period:      '2024 — Present',
        type:        'independent',
        description: 'Built multiple full-stack applications independently to develop real-world engineering experience across frontend, backend, database design, API architecture, authentication, deployment, and system design.',
        highlights:  [
          'Hirmata Mentina Kebele E-Commerce System — sole developer',
          'Multi-role auth, REST APIs, MySQL, Cloudinary',
          'Production deployment on Vercel and Railway',
          'MERN stack development across multiple projects',
        ],
        order: 3,
      },
      {
        role:        'Academic Software Engineering Projects',
        org:         'Jimma University',
        period:      '2024 — Present',
        type:        'academic',
        description: 'Contributed to multiple academic team projects covering Hospital Management System (ASP.NET/C#), JIT E-Learning Management System (MERN), and Cloud-Based IoT Data Visualization.',
        highlights:  [
          'Hospital Management System — ASP.NET, SQL Server, C#',
          'JIT E-Learning System — MERN, Software Architecture',
          'IoT Data Visualization — Python, MongoDB Atlas, Plotly',
        ],
        order: 4,
      },
    ]);
    console.log('✅ Experience seeded (4 entries)');
  } else {
    console.log('ℹ️  Experience exists — skipping');
  }

  if ((await CurrentlyBuilding.countDocuments()) === 0) {
    await CurrentlyBuilding.insertMany([
      {
        title:       'Multi-Tenant Hospital Management Platform',
        status:      'Refinement',
        statusColor: 'yellow',
        description: 'A fully functional multi-tenant healthcare platform supporting isolated hospital instances on a shared infrastructure. Core features are implemented — currently in refinement and stability phase.',
        stack:       ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Multi-tenancy'],
        focus:       [
          'Multi-tenant architecture',
          'Role-based access control',
          'Patient management',
          'Appointment scheduling',
        ],
        order: 1,
      },
      {
        title:       'Multi-Tenant Bus Ticket Marketplace',
        status:      'In Development',
        statusColor: 'cyan',
        description: 'A zero-budget MERN stack marketplace for the Ethiopian bus transport market. Multiple bus companies operate as isolated tenants on shared infrastructure, with tenant-scoped data isolation at the database level.',
        stack:       ['React', 'Node.js', 'Express', 'MongoDB', 'AsyncLocalStorage', 'Jest'],
        focus:       [
          'Tenant isolation middleware',
          'Mongoose plugin architecture',
          'Ethiopian payment integration (planned)',
          'Free-tier deployment strategy',
        ],
        order: 2,
      },
    ]);
    console.log('✅ CurrentlyBuilding seeded (2 projects)');
  } else {
    console.log('ℹ️  CurrentlyBuilding exists — skipping');
  }

  if ((await Education.countDocuments()) === 0) {
    await Education.create({
      degree:     'BSc Software Engineering',
      university: 'Jimma University — Institute of Technology',
      faculty:    'Faculty of Computing and Informatics',
      period:     '2024 — 2028 (Expected)',
      courses: [
        'Software Architecture & Design',
        'Distributed Systems',
        'Database Systems',
        'Cloud Computing & IoT',
        'Algorithms & Data Structures',
        'Software Engineering Principles',
        'Linear Algebra',
        'Operating Systems',
      ],
      certifications: [
        {
          name:   'Full Stack Developer Internship Certificate',
          org:    'Oasis Infobyte (OIBSIP)',
          year:   '2026',
          note:   'Level 3 completion — Pizza Delivery Application',
          status: 'Earned',
        },
      ],
      certNote: 'More certifications in progress — TypeScript, AWS, and system design courses currently being studied.',
    });
    console.log('✅ Education seeded');
  } else {
    console.log('ℹ️  Education exists — skipping');
  }

  await mongoose.disconnect();
  console.log('\n✅ All done. Run: node index.js');
}

seed().catch((err) => { console.error(err); process.exit(1); });