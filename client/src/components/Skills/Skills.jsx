import './Skills.css';
import useApi from '../../hooks/useApi';

const levelColors = {
  Advanced:     { bg: 'rgba(0,212,255,0.1)',   color: '#00D4FF', border: 'rgba(0,212,255,0.3)'   },
  Intermediate: { bg: 'rgba(123,47,255,0.1)',  color: '#A78BFA', border: 'rgba(123,47,255,0.3)'  },
  Familiar:     { bg: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: 'rgba(148,163,184,0.3)' },
  Learning:     { bg: 'rgba(251,191,36,0.1)',  color: '#FBBF24', border: 'rgba(251,191,36,0.3)'  },
};

function groupSkills(skills) {
  const map = {};
  skills.forEach((s) => {
    if (!map[s.group]) map[s.group] = [];
    map[s.group].push(s);
  });
  return Object.entries(map).map(([group, items]) => ({ group, items }));
}

function Skills() {
  const { data: skills } = useApi('/api/skills', []);
  const groups = groupSkills(skills || []);

  return (
    <section id="skills">
      <div className="section-label">// 03 — skills</div>
      <h2 className="section-title">Tech stack</h2>
      <p className="section-sub">
        Technologies I work with across the full stack — from UI to API to database.
      </p>

      <div className="skills-legend">
        {Object.entries(levelColors).map(([level, style]) => (
          <span key={level} className="legend-item" style={{ color: style.color }}>
            <span className="legend-dot" style={{ background: style.color }} />
            {level}
          </span>
        ))}
      </div>

      <div className="skills-grid">
        {groups.map(({ group, items }) => (
          <div className="skill-group" key={group}>
            <div className="skill-group-title">{group}</div>
            <div className="skill-pills">
              {[...items]
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((s) => {
                  const style = levelColors[s.level] || levelColors['Intermediate'];
                  return (
                    <span
                      key={s._id}
                      className="skill-pill"
                      style={{ background: style.bg, color: style.color, border: `0.5px solid ${style.border}` }}
                      title={s.level}
                    >
                      {s.name}
                    </span>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;