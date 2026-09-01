import { useEffect } from 'react';
import './ProjectModal.css';

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const ExternalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

function ProjectModal({ project, onClose }) {
  const {
    title, overview, contribution, features, challenges,
    technologies, architecture, apiEndpoints,
    status, githubUrl, liveUrl, image,
  } = project;

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={`Case study: ${title}`}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <CloseIcon />
        </button>

        <div className="modal-header">
          <span className={`proj-status ${status === 'active' ? 'status-active' : 'status-done'}`}>
            {status}
          </span>
          <h2 className="modal-title">{title}</h2>
        </div>

        <div className="modal-image">
          {image ? (
            <img src={image} alt={`${title} screenshot`} loading="lazy" />
          ) : (
            <div className="modal-image-placeholder">
              <span className="modal-placeholder-icon">🖼</span>
              <span>Screenshot will be added soon</span>
            </div>
          )}
        </div>

        {overview && (
          <div className="modal-section">
            <div className="modal-section-label">// overview</div>
            <p className="modal-text">{overview}</p>
          </div>
        )}

        {contribution && (
          <div className="modal-section">
            <div className="modal-section-label">// my contribution</div>
            <p className="modal-text contribution-text">{contribution}</p>
          </div>
        )}

        {features?.length > 0 && (
          <div className="modal-section">
            <div className="modal-section-label">// key features</div>
            <ul className="modal-features">
              {features.map((f) => (
                <li key={f}><span className="feature-check">✓</span>{f}</li>
              ))}
            </ul>
          </div>
        )}

        {challenges?.length > 0 && (
          <div className="modal-section">
            <div className="modal-section-label">// engineering challenges</div>
            <div className="modal-challenges">
              {challenges.map((c, i) => (
                <div className="challenge-item" key={i}>
                  <div className="challenge-problem">
                    <span className="challenge-label problem-label">Challenge</span>
                    <p>{c.problem}</p>
                  </div>
                  <div className="challenge-solution">
                    <span className="challenge-label solution-label">Solution</span>
                    <p>{c.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {architecture?.layers?.length > 0 && (
          <div className="modal-section">
            <div className="modal-section-label">// architecture</div>
            {architecture.description && <p className="modal-text" style={{ marginBottom: '0.75rem' }}>{architecture.description}</p>}
            <div className="arch-layers">
              {architecture.layers.map((layer) => (
                <div className="arch-layer" key={layer.label}>
                  <span className="arch-layer-label">{layer.label}</span>
                  <span className="arch-layer-detail">{layer.detail}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {apiEndpoints?.length > 0 && (
          <div className="modal-section">
            <div className="modal-section-label">// api design</div>
            <div className="api-endpoints">
              {apiEndpoints.map((ep) => {
                const [method, ...rest] = ep.trim().split(/\s+/);
                return (
                  <div className="api-endpoint" key={ep}>
                    <span className={`api-method method-${method.toLowerCase()}`}>{method}</span>
                    <span className="api-path">{rest.join(' ')}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {technologies?.length > 0 && (
          <div className="modal-section">
            <div className="modal-section-label">// tech stack</div>
            <div className="tag-list modal-tags">
              {technologies.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
          </div>
        )}

        <div className="modal-actions">
          {liveUrl && (
            <a className="btn-primary" href={liveUrl} target="_blank" rel="noreferrer">
              <ExternalIcon /> Live demo
            </a>
          )}
          {githubUrl && (
            <a className="btn-ghost" href={githubUrl} target="_blank" rel="noreferrer">
              <GitHubIcon /> View on GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;