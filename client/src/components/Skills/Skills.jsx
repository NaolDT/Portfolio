import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './Skills.css';

const fallbackGroups = [
  {
    title: 'Frontend',
    skills: [
      { _id: 'f1', name: 'React.js',          pct: 88 },
      { _id: 'f2', name: 'JavaScript (ES6+)', pct: 85 },
      { _id: 'f3', name: 'HTML / CSS',         pct: 90 },
      { _id: 'f4', name: 'Tailwind CSS',       pct: 78 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { _id: 'b1', name: 'Node.js',         pct: 82 },
      { _id: 'b2', name: 'Express.js',      pct: 80 },
      { _id: 'b3', name: 'REST API Design', pct: 83 },
      { _id: 'b4', name: 'JWT / Auth',      pct: 75 },
    ],
  },
  {
    title: 'Database & Tools',
    skills: [
      { _id: 'd1', name: 'MongoDB',      pct: 79 },
      { _id: 'd2', name: 'MySQL',        pct: 82 },
      { _id: 'd3', name: 'Git / GitHub', pct: 85 },
      { _id: 'd4', name: 'Postman',      pct: 77 },
    ],
  },
  {
    title: 'Architecture',
    skills: [
      { _id: 'a1', name: 'Software Architecture', pct: 74 },
      { _id: 'a2', name: 'System Design',         pct: 72 },
      { _id: 'a3', name: 'UML / Diagrams',        pct: 80 },
      { _id: 'a4', name: 'Agile / Scrum',         pct: 70 },
    ],
  },
];

function groupSkills(skills) {
  const map = {};
  skills.forEach((s) => {
    if (!map[s.group]) map[s.group] = [];
    map[s.group].push(s);
  });
  return Object.entries(map).map(([title, skills]) => ({ title, skills }));
}

function animateBars(container) {
  if (!container) return;
  container.querySelectorAll('.skill-bar').forEach((bar) => {
    bar.style.width = '0%';
  });
  setTimeout(() => {
    container.querySelectorAll('.skill-bar').forEach((bar) => {
      bar.style.width = bar.dataset.w + '%';
    });
  }, 100);
}

function Skills() {
  const [groups, setGroups]     = useState(fallbackGroups);
  const [loaded, setLoaded]     = useState(false);
  const gridRef                 = useRef(null);
  const observerRef             = useRef(null);

  useEffect(() => {
    axios.get('/api/skills')
      .then((res) => {
        if (res.data.length > 0) {
          setGroups(groupSkills(res.data));
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    if (!loaded) return;

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateBars(gridRef.current);
        }
      },
      { threshold: 0.15 }
    );

    if (gridRef.current) {
      observerRef.current.observe(gridRef.current);
    }

    return () => observerRef.current?.disconnect();
  }, [loaded, groups]); 

  return (
    <section id="skills">
      <div className="section-label">// 02 — skills</div>
      <h2 className="section-title">Tech stack</h2>

      <div className="skills-grid" ref={gridRef}>
        {groups.map((group) => (
          <div className="skill-group" key={group.title}>
            <div className="skill-group-title">{group.title}</div>
            {group.skills.map((s) => (
              <div className="skill-item" key={s._id || s.name}>
                <div className="skill-row">
                  <span>{s.name}</span>
                  <span className="skill-pct">{s.pct}%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-bar" data-w={s.pct} style={{ width: '0%' }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;