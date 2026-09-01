import { useState } from 'react';
import useApi from '../../hooks/useApi';
import ProjectCard  from './ProjectCard';
import ProjectModal from './ProjectModal';
import './Projects.css';

const CATEGORIES = ['All', 'Full Stack', 'Frontend', 'Backend', 'Academic'];

function Projects() {
  const { data: projects }      = useApi('/api/projects', []);
  const [filter, setFilter]     = useState('All');
  const [selected, setSelected] = useState(null);

  const items    = projects || [];
  const filtered = filter === 'All'
    ? items
    : items.filter((p) => p.category === filter);

  return (
    <>
      <section id="projects">
        <div className="section-label">// 04 — projects</div>
        <h2 className="section-title">What I have built</h2>
        <p className="section-sub">
          Full-stack systems and frontend applications — each built independently
          from design through deployment.
        </p>

        <div className="project-filters" role="tablist" aria-label="Filter projects">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filtered.map((p) => (
            <ProjectCard
              key={p._id}
              project={p}
              onLearnMore={() => setSelected(p)}
            />
          ))}
        </div>
      </section>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

export default Projects;