import './Experience.css';
import useApi from '../../hooks/useApi';

const typeConfig = {
  education:   { label: 'Education',   color: 'cyan'   },
  internship:  { label: 'Internship',  color: 'purple' },
  independent: { label: 'Independent', color: 'yellow' },
  academic:    { label: 'Academic',    color: 'muted'  },
  freelance:   { label: 'Freelance',   color: 'green'  },
};

function Experience() {
  const { data: experiences } = useApi('/api/experience', []);
  const items = experiences || [];

  return (
    <section id="experience">
      <div className="section-label">// 02 — experience</div>
      <h2 className="section-title">Journey</h2>
      <p className="section-sub">
        How I have developed as a software engineer — through university,
        independent building, and real-world internship work.
      </p>

      <div className="timeline">
        {items.map((exp, i) => {
          const cfg = typeConfig[exp.type] || { label: exp.type, color: 'muted' };
          return (
            <div className="timeline-item" key={exp._id}>
              <div className="timeline-line">
                <div className={`timeline-dot dot-${cfg.color}`} />
                {i < items.length - 1 && <div className="timeline-connector" />}
              </div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <div>
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-org">{exp.org}</div>
                  </div>
                  <div className="exp-meta">
                    <span className="exp-period">{exp.period}</span>
                    <span className={`exp-type-badge badge-${cfg.color}`}>{cfg.label}</span>
                  </div>
                </div>
                <p className="exp-desc">{exp.description}</p>
                <ul className="exp-highlights">
                  {exp.highlights?.map((h) => (
                    <li key={h}><span className="highlight-dot">▸</span>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Experience;