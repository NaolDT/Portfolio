import './QuickStats.css';
import useApi from '../../hooks/useApi';

const FALLBACK = [
  { _id: '1', value: '4+',         label: 'Projects Shipped',  sub: 'production deployed'              },
  { _id: '2', value: 'MERN',       label: 'Primary Stack',     sub: 'MongoDB · Express · React · Node' },
  { _id: '3', value: 'Full Stack', label: 'Development Focus', sub: 'frontend + backend + database'    },
  { _id: '4', value: 'SE Student', label: 'Jimma University',  sub: 'BSc Software Engineering'         },
];

function QuickStats() {
  const { data: stats } = useApi('/api/quickstats', FALLBACK);
  const items = (stats && stats.length > 0) ? stats : FALLBACK;

  return (
    <div className="quickstats">
      <div className="quickstats-inner">
        {items.map((s) => (
          <div className="stat-item" key={s._id || s.label}>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuickStats;