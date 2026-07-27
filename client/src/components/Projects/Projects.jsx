import { useState, useEffect } from 'react';
import api from '../../api/axiosInstance'
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import './Projects.css';

const fallbackProjects = [
  {
    _id: '1',
    title: 'Hirmata Mentina Kebele E-Commerce System',
    shortDesc:
      'Full-stack marketplace for a local kebele in Jimma, Ethiopia. Built with role-based auth (admin, seller, buyer), escrow wallet payments, deal negotiation chat, dispute resolution, and multilingual support.',
    fullDesc:
      'A production-grade community marketplace serving Hirmata Mentina Kebele in Jimma. The platform supports three user roles — admin, seller, and buyer — each with dedicated dashboards. Sellers go through a TIN + Seller ID verification process against a seeded trade office database before they can list products. Buyers can negotiate prices via real-time chat, add items to a wishlist, and pay through an escrow wallet system supporting Telebirr, CBE Birr, and Awash Bank. Disputes are handled through an evidence-upload and admin adjudication flow. The system also supports English, Amharic, and Oromo via i18n, and includes a full dark/light theme toggle.',
    tags: ['React 18', 'Node.js', 'Express.js', 'MySQL', 'JWT Auth', 'Cloudinary', 'Railway', 'Vercel', 'i18n'],
    status: 'active',
    featured: true,
    githubUrl: 'https://github.com/NaolDT/hirmata-ecommerce',
    liveUrl: 'https://hirmata-ecommerce.vercel.app/',
  },
  {
    _id: '2',
    title: 'Netflix Clone',
    shortDesc:
      'A pixel-perfect Netflix UI clone with real movie and TV show data fetched from the TMDb API. Features category rows, a hero banner with trailers, and a fully responsive layout.',
    fullDesc:
      'A frontend clone of Netflix built to practice real-world API integration and responsive UI design. The app pulls live movie and TV show data from The Movie Database (TMDb) API and organizes them into category rows — Trending, Top Rated, Action, Comedy, and more. The hero banner auto-rotates featured titles and links to YouTube trailers. Built with React and Material UI for component structure, and styled to closely match the Netflix aesthetic including dark backgrounds, hover effects on cards, and smooth transitions. Deployed on GitHub Pages.',
    tags: ['React.js', 'Material UI', 'TMDb API', 'Axios', 'CSS', 'GitHub Pages'],
    status: 'active',
    featured: false,
    githubUrl: 'https://github.com/NaolDT/Netflix-Clone',
    liveUrl: 'https://naoldt.github.io/Netflix-Clone/',
  },
  {
    _id: '3',
    title: 'Amazon Clone',
    shortDesc:
      'A full Amazon storefront clone with product listings, a working cart, and checkout flow. Focuses on component architecture and e-commerce UI patterns.',
    fullDesc:
      'An e-commerce UI clone of Amazon.com, built to practice React component architecture and state management. The app includes a homepage with product listings, individual product pages, a functional shopping cart with quantity controls, and a checkout page. State is managed across the app using React Context API, keeping cart data consistent across all pages. The UI closely mirrors Amazon\'s layout — including the top navigation bar, product cards, and sidebar filters. Deployed on Netlify.',
    tags: ['React.js', 'Context API', 'CSS', 'Firebase', 'Netlify'],
    status: 'active',
    featured: false,
    githubUrl: 'https://github.com/NaolDT/Amazon-Clone',
    liveUrl: 'https://amazon-clone-practice1.netlify.app/',
  },
  {
    _id: '4',
    title: 'Pizza Delivery App — OIBSIP Internship',
    shortDesc:
      'A full MERN stack pizza delivery app built as an Oasis Infobyte internship project. Features custom pizza building, Razorpay payments, order tracking, and automated email notifications.',
    fullDesc:
      'A production-deployed pizza delivery application built as the Level 3 task for the Oasis Infobyte (OIBSIP) internship program. Users can build custom pizzas by selecting base, sauce, cheese, and toppings, then checkout with Razorpay in test mode. The backend handles server-side pricing, stock validation, and order management. Automated emails are sent via the Brevo HTTP API for order confirmations and low-stock admin alerts using node-cron. Authentication includes register, email verification, JWT sessions, and forgot/reset password flows. The frontend is built with React + Vite and styled with Tailwind CSS v4. Deployed with the frontend on Vercel and backend on Render.',
    tags: ['React', 'Vite', 'Tailwind CSS v4', 'Node.js', 'Express', 'MongoDB', 'Razorpay', 'Brevo', 'node-cron', 'Vercel', 'Render'],
    status: 'active',
    featured: false,
    githubUrl: 'https://github.com/NaolDT/OIBSIP',
    liveUrl: 'https://oibsip-phi.vercel.app',
  },
];

function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api
      .get('/api/projects')
      .then((res) => { if (res.data.length > 0) setProjects(res.data); })
      .catch(() => {});
  }, []);

  return (
    <>
      <section id="projects">
        <div className="section-label">// 03 — projects</div>
        <h2 className="section-title">What I've built</h2>

        <div className="projects-grid">
          {projects.map((p) => (
            <ProjectCard
              key={p._id}
              project={p}
              onLearnMore={() => setSelected(p)}
            />
          ))}
        </div>
      </section>

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}

export default Projects;