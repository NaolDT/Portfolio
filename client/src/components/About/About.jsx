import './About.css';
import useApi from '../../hooks/useApi';

const FALLBACK = {
  paragraphs: [
    'I am a Software Engineering student at Jimma University Institute of Technology, building full-stack web applications independently while studying software engineering principles, system design, and distributed systems.',
    'I do not just build interfaces — I design and implement the full system: REST APIs, database schemas, authentication, authorization, deployment pipelines, and the frontend that ties it all together.',
    'My work is driven by engineering discipline. I think about architecture, data flow, security, and maintainability from the start of every project.',
  ],
  valueTags: ['Clean architecture', 'Real-world systems', 'Engineering discipline', 'Continuous learning'],
  facts: [
    { key: 'location',   val: 'Jimma, Ethiopia',         highlight: false },
    { key: 'university', val: 'Jimma University',         highlight: false },
    { key: 'degree',     val: 'BSc Software Engineering', highlight: false },
    { key: 'year',       val: '2024 → 2028',             highlight: false },
    { key: 'focus',      val: 'MERN Stack',              highlight: false },
    { key: 'available',  val: 'Open to work',            highlight: true  },
  ],
};

function About() {
  const { data: about } = useApi('/api/about', FALLBACK);
  const d = about || FALLBACK;

  return (
    <section id="about">
      <div className="section-label">// 01 — about</div>
      <h2 className="section-title">Who I am</h2>

      <div className="about-grid">
        <div className="about-text">
          {d.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
          {d.valueTags?.length > 0 && (
            <div className="about-values">
              {d.valueTags.map((v) => (
                <span key={v} className="about-value-tag">{v}</span>
              ))}
            </div>
          )}
        </div>

        <div className="about-card">
          <h3 className="card-title">// quick.info</h3>
          {[...(d.facts || [])]
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map((f) => (
              <div className="fact-row" key={f.key}>
                <span className="fact-key">{f.key}</span>
                <span className={`fact-val ${f.highlight ? 'highlight' : ''}`}>{f.val}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default About;