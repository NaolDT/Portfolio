export const skillGroups = [
  {
    group: 'Frontend',
    skills: [
      { name: 'React.js',       level: 'Advanced'      },
      { name: 'JavaScript',     level: 'Advanced'      },
      { name: 'HTML / CSS',     level: 'Advanced'      },
      { name: 'Tailwind CSS',   level: 'Intermediate'  },
      { name: 'Responsive UI',  level: 'Advanced'      },
      { name: 'Vite',           level: 'Intermediate'  },
    ],
  },
  {
    group: 'Backend',
    skills: [
      { name: 'Node.js',        level: 'Intermediate'  },
      { name: 'Express.js',     level: 'Intermediate'  },
      { name: 'REST API Design',level: 'Intermediate'  },
      { name: 'JWT Auth',       level: 'Intermediate'  },
      { name: 'Middleware',     level: 'Intermediate'  },
      { name: 'Nodemailer',     level: 'Intermediate'  },
    ],
  },
  {
    group: 'Databases',
    skills: [
      { name: 'MongoDB',        level: 'Intermediate'  },
      { name: 'MySQL',          level: 'Intermediate'  },
      { name: 'SQL Server',     level: 'Familiar'      },
      { name: 'Mongoose',       level: 'Intermediate'  },
      { name: 'Database Design',level: 'Intermediate'  },
    ],
  },
  {
    group: 'Engineering',
    skills: [
      { name: 'Git / GitHub',          level: 'Advanced'     },
      { name: 'Software Architecture', level: 'Familiar'     },
      { name: 'System Design',         level: 'Familiar'     },
      { name: 'UML / Diagrams',        level: 'Intermediate' },
      { name: 'API Design',            level: 'Intermediate' },
      { name: 'Postman / Thunder',     level: 'Intermediate' },
    ],
  },
  {
    group: 'Currently Learning',
    skills: [
      { name: 'TypeScript',      level: 'Learning' },
      { name: 'Next.js',         level: 'Learning' },
      { name: 'NestJS',          level: 'Learning' },
      { name: 'Python',          level: 'Learning' },
      { name: 'AWS',             level: 'Learning' },
      { name: 'DevOps / Docker', level: 'Learning' },
      { name: 'AI / ML',         level: 'Learning' },
      { name: 'Cybersecurity',   level: 'Learning' },
    ],
  },
];

export const levelColors = {
  Advanced:     { bg: 'rgba(0,212,255,0.1)',   color: '#00D4FF', border: 'rgba(0,212,255,0.3)'   },
  Intermediate: { bg: 'rgba(123,47,255,0.1)',  color: '#A78BFA', border: 'rgba(123,47,255,0.3)'  },
  Familiar:     { bg: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: 'rgba(148,163,184,0.3)' },
  Learning:     { bg: 'rgba(251,191,36,0.1)',  color: '#FBBF24', border: 'rgba(251,191,36,0.3)'  },
};