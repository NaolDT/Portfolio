import './About.css';

const facts = [
  { key: 'location',   val: 'Jimma, Ethiopia' },
  { key: 'degree',     val: 'BSc Software Eng.' },
  { key: 'university', val: 'Jimma University' },
  { key: 'focus',      val: 'MERN Stack' },
  { key: 'status',     val: 'open to work', highlight: true },
];

function About() {
  return (
    <section id="about">
      <div className="section-label">// 01 — about</div>
      <h2 className="section-title">Who I am</h2>

      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm a <strong>Software Engineering student</strong> at Jimma
            University Institute of Technology, specializing in full-stack web
            development. I love turning complex problems into elegant,
            user-friendly applications.
          </p>
          <p>
            My hands-on experience spans building{' '}
            <strong>e-commerce platforms</strong>, learning management systems,
            and hospital management tools — always with a focus on clean
            architecture and maintainable code.
          </p>
          <p>
            When I'm not coding, I'm exploring new technologies, reading about
            software design patterns, and sharpening my skills across the MERN
            stack ecosystem.
          </p>
        </div>

        <div className="about-card">
          <h3 className="card-title">// quick.info</h3>
          {facts.map((f) => (
            <div className="fact-row" key={f.key}>
              <span className="fact-key">{f.key}</span>
              <span className={`fact-val ${f.highlight ? 'highlight' : ''}`}>
                {f.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;