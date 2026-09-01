export const projects = [
  {
    id: 'hirmata-ecommerce',
    title: 'Hirmata Mentina Kebele E-Commerce System',
    category: 'Full Stack',
    status: 'active',
    featured: true,
    tagline: 'A multi-role marketplace designed to support local digital commerce in Jimma, Ethiopia.',
    overview:
      'A production-deployed full-stack marketplace serving Hirmata Mentina Kebele. The platform enables local sellers to register, list products, and transact with buyers through a structured, role-based system. Admin staff oversee seller verification, dispute resolution, and platform health.',
    contribution:
      'Sole developer. Designed the full system architecture, implemented the backend REST API, database schema, authentication and authorization system, frontend UI, payment wallet logic, real-time chat, multilingual support, and deployment pipeline.',
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
      'Admin dashboard with SVG analytics charts',
    ],
    challenges: [
      {
        problem: 'How to support multiple user roles with different access levels across the same application.',
        solution: 'Designed role-based authorization middleware that attaches to every protected route, checking the JWT payload role before allowing access. Admin, Seller, and Buyer routes are fully separated at the API level.',
      },
      {
        problem: 'Images uploaded by sellers needed to persist across server restarts on Railway.',
        solution: 'Migrated from local filesystem storage to Cloudinary with a dedicated upload middleware, ensuring all product images are cloud-persisted regardless of deployment state.',
      },
      {
        problem: 'Seller trust and fraud prevention in a local commerce context.',
        solution: 'Implemented a verification flow requiring sellers to submit TIN and Seller ID, validated server-side against a seeded official registry before seller status is activated.',
      },
    ],
    technologies: ['React 18', 'Node.js', 'Express.js', 'MySQL', 'JWT', 'Cloudinary', 'REST API', 'i18n', 'Railway', 'Vercel'],
    architecture: {
      description: 'React SPA → Express REST API → MySQL database, with Cloudinary for media, JWT for stateless auth, and Railway + Vercel for deployment.',
      layers: [
        { label: 'Frontend',  detail: 'React 18 + Vite, deployed on Vercel' },
        { label: 'REST API',  detail: 'Express.js with role-based middleware' },
        { label: 'Database',  detail: 'MySQL — Users, Products, Orders, Transactions, Disputes' },
        { label: 'Media',     detail: 'Cloudinary image storage' },
        { label: 'Auth',      detail: 'JWT — stateless, role-encoded tokens' },
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
    links: {
      github: 'https://github.com/NaolDT/hirmata-ecommerce',
      demo:   'https://hirmata-ecommerce.vercel.app/',
    },
    image: null,
  },
  {
    id: 'pizza-delivery',
    title: 'Pizza Delivery App — OIBSIP Internship',
    category: 'Full Stack',
    status: 'active',
    featured: false,
    tagline: 'A full-stack pizza ordering platform with custom builder, payments, and automated notifications.',
    overview:
      'Built as the Level 3 task for the Oasis Infobyte internship program. A complete pizza delivery system where users build custom orders, pay via Razorpay, and receive automated email confirmations. The backend manages inventory, order state, and scheduled low-stock alerts.',
    contribution:
      'Sole developer. Built the full MERN stack system including the custom pizza builder UI, backend order and inventory management, Razorpay payment integration, email automation with Brevo, authentication with email verification, and deployment to Vercel and Render.',
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
        problem: 'Preventing price manipulation — clients should not be able to submit arbitrary prices.',
        solution: 'All pricing is calculated server-side based on submitted ingredient IDs. The frontend never sends a price — only a list of selected ingredients. The backend looks up and sums actual prices.',
      },
      {
        problem: 'Email delivery reliability across multiple providers.',
        solution: 'After testing SMTP and Brevo SMTP, migrated to Brevo HTTP API which provided consistent delivery without authentication issues in production.',
      },
    ],
    technologies: ['React', 'Vite', 'Tailwind CSS v4', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'Brevo', 'node-cron', 'JWT', 'Vercel', 'Render'],
    architecture: {
      description: 'React frontend → Express REST API → MongoDB, with Razorpay for payments and Brevo for transactional email.',
      layers: [
        { label: 'Frontend',  detail: 'React + Vite + Tailwind CSS v4, Vercel' },
        { label: 'REST API',  detail: 'Express.js with JWT middleware' },
        { label: 'Database',  detail: 'MongoDB — Users, Orders, Products, Inventory' },
        { label: 'Payments',  detail: 'Razorpay with HMAC-SHA256 verification' },
        { label: 'Email',     detail: 'Brevo HTTP API + node-cron scheduler' },
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
    links: {
      github: 'https://github.com/NaolDT/OIBSIP',
      demo:   'https://oibsip-phi.vercel.app',
    },
    image: null,
  },
  {
    id: 'netflix-clone',
    title: 'Netflix Clone',
    category: 'Frontend',
    status: 'active',
    featured: false,
    tagline: 'A pixel-accurate Netflix UI with live movie data from the TMDb API.',
    overview:
      'A frontend learning project built to practice React component architecture, external API integration, and responsive UI design. Pulls live movie and TV data from TMDb and organizes it into category rows matching the Netflix layout.',
    contribution:
      'Sole developer. Built as an independent learning exercise to practice React hooks, API integration, and responsive CSS.',
    features: [
      'Live movie and TV data from The Movie Database (TMDb) API',
      'Auto-rotating hero banner with featured titles',
      'Category rows — Trending, Top Rated, Action, Comedy, and more',
      'Responsive layout across mobile and desktop',
      'Hover effects and smooth card interactions',
    ],
    challenges: [
      {
        problem: 'Managing multiple simultaneous API requests without blocking the UI.',
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
    links: {
      github: 'https://github.com/NaolDT/Netflix-Clone',
      demo:   'https://naoldt.github.io/Netflix-Clone/',
    },
    image: null,
  },
  {
    id: 'amazon-clone',
    title: 'Amazon Clone',
    category: 'Frontend',
    status: 'active',
    featured: false,
    tagline: 'An Amazon storefront clone practicing React state management and e-commerce UI patterns.',
    overview:
      'A frontend learning project built to practice React Context API, component architecture, and e-commerce UI patterns. Implements a working shopping cart with state shared across all pages.',
    contribution:
      'Sole developer. Built as an independent learning exercise focused on React state management patterns and responsive layout.',
    features: [
      'Product listing and individual product pages',
      'Shopping cart with quantity controls',
      'React Context API for global cart state',
      'Checkout page with order summary',
      'Responsive layout matching Amazon design patterns',
    ],
    challenges: [
      {
        problem: 'Sharing cart state across multiple pages without prop drilling.',
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
    links: {
      github: 'https://github.com/NaolDT/Amazon-Clone',
      demo:   'https://amazon-clone-practice1.netlify.app/',
    },
    image: null,
  },
];

export const categories = ['All', 'Full Stack', 'Frontend'];