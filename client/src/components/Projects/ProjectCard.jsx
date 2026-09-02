import { useState, useEffect, useRef } from 'react';
import './ProjectCard.css';

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

function ProjectCard({ project, onLearnMore }) {
  const {
    title, tagline, technologies, status,
    featured, category, githubUrl, liveUrl, images,
  } = project;

  const imgs = images?.length > 0 ? images : [];

  const [current, setCurrent]   = useState(0);
  const [hovered, setHovered]   = useState(false);
  const [fading, setFading]     = useState(false);
  const intervalRef             = useRef(null);

  useEffect(() => {
    if (hovered && imgs.length > 1) {
      intervalRef.current = setInterval(() => {
        setFading(true);
        setTimeout(() => {
          setCurrent((prev) => (prev + 1) % imgs.length);
          setFading(false);
        }, 300);
      }, 3000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [hovered, imgs.length]);

  useEffect(() => {
    if (!hovered) {
      setFading(true);
      const t = setTimeout(() => {
        setCurrent(0);
        setFading(false);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [hovered]);

  return (
    <article
      className={`proj-card ${featured ? 'featured' : ''}`}
      aria-label={title}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="proj-image" aria-hidden="true">
        {imgs.length > 0 ? (
          <>
            <img
              src={imgs[current]}
              alt={`${title} screenshot ${current + 1}`}
              loading="lazy"
              className={`proj-carousel-img ${fading ? 'fading' : ''}`}
            />
            {/* Dot indicators — only if multiple images */}
            {imgs.length > 1 && (
              <div className="proj-carousel-dots">
                {imgs.map((_, i) => (
                  <span
                    key={i}
                    className={`proj-carousel-dot ${i === current ? 'active' : ''}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="proj-image-placeholder">
            <span className="placeholder-label">Screenshot coming soon</span>
          </div>
        )}
        <div className="proj-image-overlay" />
      </div>

      <div className="proj-body">
        <div className="proj-top">
          <span className={`proj-status ${status === 'active' ? 'status-active' : 'status-done'}`}>
            {status}
          </span>
          <span className="proj-category">{category}</span>
        </div>

        <h3 className="proj-name">{title}</h3>
        <p className="proj-tagline">{tagline}</p>

        <div className="tag-list proj-tags">
          {(technologies || []).slice(0, 5).map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
          {(technologies || []).length > 5 && (
            <span className="tag tag-more">+{technologies.length - 5}</span>
          )}
        </div>

        <div className="proj-actions">
          <button
            className="proj-btn-learn"
            onClick={onLearnMore}
            aria-label={`Learn more about ${title}`}
          >
            Learn more →
          </button>
          <div className="proj-links">
            {githubUrl && (
              <a className="btn-icon cyan" href={githubUrl} target="_blank" rel="noreferrer" aria-label="View on GitHub" title="GitHub">
                <GitHubIcon />
              </a>
            )}
            {liveUrl && (
              <a className="btn-icon cyan" href={liveUrl} target="_blank" rel="noreferrer" aria-label="View live demo" title="Live demo">
                <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;