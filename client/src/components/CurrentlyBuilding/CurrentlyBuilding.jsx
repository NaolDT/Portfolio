import './CurrentlyBuilding.css';
import useApi from '../../hooks/useApi';

const statusColors = {
  cyan:   { bg: 'rgba(0,212,255,0.1)',  color: '#00D4FF', border: 'rgba(0,212,255,0.25)'  },
  yellow: { bg: 'rgba(251,191,36,0.1)', color: '#FBBF24', border: 'rgba(251,191,36,0.25)' },
  purple: { bg: 'rgba(123,47,255,0.1)', color: '#A78BFA', border: 'rgba(123,47,255,0.25)' },
  green:  { bg: 'rgba(74,222,128,0.1)', color: '#4ADE80', border: 'rgba(74,222,128,0.25)' },
};

function CurrentlyBuilding() {
  const { data: building } = useApi('/api/building', []);
  const items = building || [];

  return (
    <section id="building">
      <div className="section-label">// 06 — currently building</div>
      <h2 className="section-title">Active projects</h2>
      <p className="section-sub">
        What I am working on right now — ongoing systems not yet in the projects showcase.
      </p>

      <div className="building-grid">
        {items.map((item) => {
          const sc = statusColors[item.statusColor] || statusColors.cyan;
          return (
            <div className="building-card" key={item._id}>
              <div className="building-top">
                <span
                  className="building-status"
                  style={{ background: sc.bg, color: sc.color, border: `0.5px solid ${sc.border}` }}
                >
                  {item.status}
                </span>
              </div>
              <h3 className="building-title">{item.title}</h3>
              <p className="building-desc">{item.description}</p>

              {item.stack?.length > 0 && (
                <>
                  <div className="building-section-label">Stack</div>
                  <div className="tag-list building-tags">
                    {item.stack.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </>
              )}

              {item.focus?.length > 0 && (
                <>
                  <div className="building-section-label">Current focus</div>
                  <ul className="building-focus">
                    {item.focus.map((f) => (
                      <li key={f}><span className="focus-arrow">→</span>{f}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CurrentlyBuilding;