import { useState } from 'react';
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

function CertLightbox({ cert, onClose }) {
  return (
    <div
      className="cert-lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${cert.name}`}
    >
      <button
        className="cert-lightbox-close"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>
      <div
        className="cert-lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cert-lightbox-header">
          <div>
            <div className="cert-lightbox-title">{cert.name}</div>
            <div className="cert-lightbox-org">
              {cert.org}{cert.year ? ` — ${cert.year}` : ''}
            </div>
          </div>
          <a
            href={cert.fileUrl}
            download
            target="_blank"
            rel="noreferrer"
            className="cert-lightbox-download"
          >
            ↓ Download
          </a>
        </div>
        <img
          src={cert.fileUrl}
          alt={`${cert.name} certificate`}
          className="cert-lightbox-img"
        />
      </div>
    </div>
  );
}

function CertCard({ cert }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const hasFile  = !!cert.fileUrl;
  const isPdf    = cert.fileType === 'pdf';
  const isImage  = cert.fileType === 'image';

  const handleView = (e) => {
  if (isPdf) {
    e.preventDefault();
    window.open(cert.fileUrl, '_blank');
  } else if (isImage) {
    setLightboxOpen(true);
  }
};
  return (
    <>
      <div className={`cert-card ${hasFile ? 'cert-card-clickable' : ''}`}>
        <div className="cert-card-left">
          <div className="cert-icon-wrap">
            {isPdf   && <span className="cert-file-icon cert-pdf-icon">PDF</span>}
            {isImage && <span className="cert-file-icon cert-img-icon">IMG</span>}
            {!hasFile && <span className="cert-emoji">📜</span>}
          </div>
        </div>

        <div className="cert-card-body">
          <div className="cert-card-name">{cert.name}</div>
          <div className="cert-card-org">
            {cert.org}{cert.year ? ` — ${cert.year}` : ''}
          </div>
          {cert.note && <div className="cert-card-note">{cert.note}</div>}
        </div>

        <div className="cert-card-right">
          <span className="cert-badge">{cert.status || 'Earned'}</span>
         {hasFile && (
  isPdf ? (
    <a
      href={cert.fileUrl}
      target="_blank"
      rel="noreferrer"
      className="cert-view-btn"
      aria-label={`Open ${cert.name} PDF`}
    > 
      View PDF ↗
    </a>
  ) : (
    <button
      className="cert-view-btn"
      onClick={handleView}
      aria-label={`View ${cert.name} certificate`}
    >
      View ↗
    </button>
  )
)}
        </div>
      </div>

      {lightboxOpen && isImage && (
        <CertLightbox cert={cert} onClose={() => setLightboxOpen(false)} />
      )}
    </>
  );
}

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
          <div className="cert-list">
            {d.certifications.map((cert, i) => (
              <CertCard key={i} cert={cert} />
            ))}
          </div>
          {d.certNote && <p className="cert-coming">{d.certNote}</p>}
        </div>
      )}
    </section>
  );
}

export default Education;