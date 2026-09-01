import './Hero.css';
import profilePhoto from '../../assets/profile.jpg';
import useApi from '../../hooks/useApi';

const DEFAULT_HERO = {
  headline:    'Full Stack Developer building production-minded web applications.',
  subText:     'I design and build full-stack systems with modern frontend, backend API architecture, and database design — from concept to deployed product.',
  contextText: 'Software Engineering student at Jimma University, Ethiopia.',
  available:   true,
  cvPath:      '/assets/NaolDera-CV.pdf',
};

const DEFAULT_SETTINGS = {
  githubUrl:   'https://github.com/NaolDT',
  linkedinUrl: 'https://www.linkedin.com/in/naol-dera-5959b9417',
  email:       'naoldera8@gmail.com',
};

function Hero() {
  const { data: hero }     = useApi('/api/hero',     DEFAULT_HERO);
  const { data: settings } = useApi('/api/settings', DEFAULT_SETTINGS);

  const h = hero     || DEFAULT_HERO;
  const s = settings || DEFAULT_SETTINGS;

  return (
    <div className="hero" id="hero">
      <div className="hero-inner">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className={`eyebrow-dot ${h.available ? '' : 'dot-yellow'}`} />
            <span>{h.available ? 'Available for opportunities' : 'Currently busy'}</span>
          </div>

          <h1 className="hero-headline">{h.headline}</h1>
          <p className="hero-sub">{h.subText}</p>
          <p className="hero-context"><strong>{h.contextText}</strong></p>

          <div className="btn-group">
            <a href="#projects" className="btn-primary">
              View my work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17l9.2-9.2M17 17V7H7"/>
              </svg>
            </a>
            <a href="#contact" className="btn-ghost">Contact me</a>
            {h.cvPath && (
              <a href={h.cvPath} download="Naol_Dera_CV.pdf" className="btn-ghost">
                Download CV
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            )}
          </div>

          <div className="hero-links">
            {s.githubUrl   && <a href={s.githubUrl}           target="_blank" rel="noreferrer" className="hero-link">GitHub ↗</a>}
            {s.githubUrl   && s.linkedinUrl && <span className="hero-link-sep">·</span>}
            {s.linkedinUrl && <a href={s.linkedinUrl}         target="_blank" rel="noreferrer" className="hero-link">LinkedIn ↗</a>}
            {s.linkedinUrl && s.email       && <span className="hero-link-sep">·</span>}
            {s.email       && <a href={`mailto:${s.email}`}   className="hero-link">{s.email}</a>}
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo-ring">
            <img src={profilePhoto} alt="Naol Dera — Full Stack Developer" className="hero-photo" loading="eager" />
          </div>
          <div className="hero-photo-glow" />
          <div className="hero-terminal">
            <span className="terminal-prompt">~/naol-dera</span>
            <span className="terminal-cursor" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;