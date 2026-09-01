import './Education.css';
import useApi from '../../hooks/useApi';

const FALLBACK = {
  degree:         'BSc Software Engineering',
  university:     'Jimma University — Institute of Technology',
  faculty:        'Faculty of Computing and Informatics',
  period:         '2024 — 2028 (Expected)',
  courses:        [],
  certifications: [],
  certNote:       '',
};

function Education() {
  const { data: edu } = useApi('/api/education', FALLBACK);
  const d = edu || FALLBACK;

  return (
    <section id="education">
      <div className="section-label">// 07 — education</div>
      <h2 className="section-title">Education</h2>

      <div className="edu-card">
        <div className="edu-icon">🎓</div>
        <div className="edu-right">
          <h3 className="edu-degree">{d.degree}</h3>
          <div className="edu-org">{d.university}</div>
          <div className="edu-faculty">{d.faculty}</div>
          <div className="edu-period">{d.period}</div>
          {d.courses?.length > 0 && (
            <>
              <div className="edu-courses-label">Key coursework</div>
              <div className="edu-courses">
                {d.courses.map((c) => (
                  <span className="edu-course" key={c}>{c}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {d.certifications?.length > 0 && (
        <div className="cert-section">
          <h3 className="cert-title">Certifications</h3>
          {d.certifications.map((cert, i) => (
            <div className="cert-card" key={i}>
              <span className="cert-icon">📜</span>
              <div className="cert-right">
                <div className="cert-name">{cert.name}</div>
                <div className="cert-org">{cert.org}{cert.year ? ` — ${cert.year}` : ''}</div>
                {cert.note && <div className="cert-note">{cert.note}</div>}
              </div>
              <span className="cert-badge">{cert.status || 'Earned'}</span>
            </div>
          ))}
          {d.certNote && <p className="cert-coming">{d.certNote}</p>}
        </div>
      )}
    </section>
  );
}

export default Education;