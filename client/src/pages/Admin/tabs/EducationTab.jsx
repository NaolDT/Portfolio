import { useState, useEffect, useRef } from 'react';
import api from '../../../api/axiosInstance';
import { useAdmin } from '../../../context/AdminContext';

const EMPTY_CERT = {
  name: '', org: '', year: '', note: '', status: 'Earned',
  fileUrl: '', fileType: '',
};

function EducationTab() {
  const { token }               = useAdmin();
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg]           = useState(null);

  const [deg, setDeg] = useState({
    degree: '', university: '', faculty: '', period: '',
  });

  const [coursesText, setCoursesText] = useState('');

  const [certNote, setCertNote] = useState('');

  const [certs, setCerts] = useState([]);

  const fileRefs    = useRef([]);
  const [certFiles, setCertFiles] = useState([]); 

  const headers = { Authorization: `Bearer ${token}` };
  const flash   = (text, error = false) => {
    setMsg({ text, error });
    setTimeout(() => setMsg(null), 3500);
  };

  useEffect(() => {
    api.get('/api/education').then((r) => {
      const d = r.data;
      setDeg({
        degree:     d.degree     || '',
        university: d.university || '',
        faculty:    d.faculty    || '',
        period:     d.period     || '',
      });
      setCoursesText((d.courses || []).join('\n'));
      setCertNote(d.certNote || '');
      const loaded = (d.certifications || []).map((c) => ({ ...c }));
      setCerts(loaded);
      setCertFiles(new Array(loaded.length).fill(null));
      setFetching(false);
    }).catch(() => setFetching(false));
  }, []);

  const updateCert = (i, field, value) =>
    setCerts((prev) => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));

  const addCert = () => {
    setCerts((p) => [...p, { ...EMPTY_CERT }]);
    setCertFiles((p) => [...p, null]);
  };

  const removeCert = (i) => {
    setCerts((p) => p.filter((_, idx) => idx !== i));
    setCertFiles((p) => p.filter((_, idx) => idx !== i));
    if (fileRefs.current[i]) fileRefs.current[i].value = '';
  };

  const handleFileSelect = (i, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCertFiles((prev) => {
      const updated = [...prev];
      updated[i] = file;
      return updated;
    });
  };

  const removeFile = (i) => {
    setCertFiles((prev) => {
      const updated = [...prev];
      updated[i] = null;
      return updated;
    });
    updateCert(i, 'fileUrl', '');
    updateCert(i, 'fileType', '');
    if (fileRefs.current[i]) fileRefs.current[i].value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      fd.append('degree',     deg.degree);
      fd.append('university', deg.university);
      fd.append('faculty',    deg.faculty);
      fd.append('period',     deg.period);
      fd.append('certNote',   certNote);

      const courses = coursesText
        .split('\n').map((c) => c.trim()).filter(Boolean);
      fd.append('courses', JSON.stringify(courses));

      const certsPayload = certs.map((c) => ({
        name:     c.name     || '',
        org:      c.org      || '',
        year:     c.year     || '',
        note:     c.note     || '',
        status:   c.status   || 'Earned',
        fileUrl:  c.fileUrl  || '',
        fileType: c.fileType || '',
      }));
      fd.append('certifications', JSON.stringify(certsPayload));

      certFiles.forEach((file, i) => {
        if (file) fd.append(`certFile_${i}`, file);
      });

      await api.put('/api/education', fd, { headers });
      flash('Education saved ✓');

      const refreshed = await api.get('/api/education');
      const d = refreshed.data;
      const reloaded = (d.certifications || []).map((c) => ({ ...c }));
      setCerts(reloaded);
      setCertFiles(new Array(reloaded.length).fill(null));
    } catch (err) {
      flash(err.response?.data?.message || 'Save failed', true);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="adm-loading">Loading...</div>;

  return (
    <div className="adm-tab">
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">Education</h3>
          <p className="adm-card-desc">
            Degree info, coursework, and certifications.
            Upload certificates as PDF or image — they open in a viewer on the portfolio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="adm-form">

          <div className="adm-section-divider">Degree</div>

          <div className="adm-form-grid-2">
            <div className="adm-field">
              <label>Degree *</label>
              <input
                value={deg.degree}
                onChange={(e) => setDeg((p) => ({ ...p, degree: e.target.value }))}
                placeholder="BSc Software Engineering"
                required
              />
            </div>
            <div className="adm-field">
              <label>Period</label>
              <input
                value={deg.period}
                onChange={(e) => setDeg((p) => ({ ...p, period: e.target.value }))}
                placeholder="2024 — 2028 (Expected)"
              />
            </div>
          </div>

          <div className="adm-field">
            <label>University</label>
            <input
              value={deg.university}
              onChange={(e) => setDeg((p) => ({ ...p, university: e.target.value }))}
              placeholder="Jimma University — Institute of Technology"
            />
          </div>

          <div className="adm-field">
            <label>Faculty</label>
            <input
              value={deg.faculty}
              onChange={(e) => setDeg((p) => ({ ...p, faculty: e.target.value }))}
              placeholder="Faculty of Computing and Informatics"
            />
          </div>

          <div className="adm-section-divider">Coursework</div>

          <div className="adm-field">
            <label>Courses</label>
            <textarea
              value={coursesText}
              onChange={(e) => setCoursesText(e.target.value)}
              rows={6}
              placeholder={"Software Architecture & Design\nDistributed Systems\nDatabase Systems"}
            />
            <span className="adm-hint">One course per line.</span>
          </div>

          <div className="adm-section-divider">Certifications</div>

          <div className="adm-certs-list">
            {certs.map((cert, i) => (
              <div className="adm-cert-block" key={i}>

                <div className="adm-cert-block-header">
                  <span className="adm-cert-block-num">Certificate {i + 1}</span>
                  <button
                    type="button"
                    className="adm-btn-delete"
                    onClick={() => removeCert(i)}
                  >
                    Remove
                  </button>
                </div>

                <div className="adm-form-grid-2">
                  <div className="adm-field">
                    <label>Certificate Name *</label>
                    <input
                      value={cert.name}
                      onChange={(e) => updateCert(i, 'name', e.target.value)}
                      placeholder="Full Stack Developer Certificate"
                    />
                  </div>
                  <div className="adm-field">
                    <label>Organization *</label>
                    <input
                      value={cert.org}
                      onChange={(e) => updateCert(i, 'org', e.target.value)}
                      placeholder="Oasis Infobyte (OIBSIP)"
                    />
                  </div>
                </div>

                <div className="adm-form-grid-2">
                  <div className="adm-field">
                    <label>Year</label>
                    <input
                      value={cert.year}
                      onChange={(e) => updateCert(i, 'year', e.target.value)}
                      placeholder="2026"
                    />
                  </div>
                  <div className="adm-field">
                    <label>Status Badge</label>
                    <input
                      value={cert.status}
                      onChange={(e) => updateCert(i, 'status', e.target.value)}
                      placeholder="Earned"
                    />
                  </div>
                </div>

                <div className="adm-field">
                  <label>Note</label>
                  <input
                    value={cert.note}
                    onChange={(e) => updateCert(i, 'note', e.target.value)}
                    placeholder="Level 3 completion — Pizza Delivery Application"
                  />
                </div>

                <div className="adm-field">
                  <label>Certificate File (PDF or image)</label>

                  {cert.fileUrl && !certFiles[i] && (
                    <div className="adm-cert-file-preview">
                      {cert.fileType === 'pdf' ? (
                        <div className="adm-cert-file-info">
                          <span className="adm-cert-file-icon">📄</span>
                          <div>
                            <div className="adm-cert-file-label">PDF uploaded</div>
                            <a
                              href={cert.fileUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="adm-cert-file-link"
                            >
                              View PDF ↗
                            </a>
                          </div>
                          <button
                            type="button"
                            className="adm-btn-row-delete"
                            onClick={() => removeFile(i)}
                            title="Remove file"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="adm-cert-img-preview">
                          <img src={cert.fileUrl} alt="Certificate" />
                          <button
                            type="button"
                            className="adm-image-remove"
                            onClick={() => removeFile(i)}
                          >
                            ✕ Remove
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {certFiles[i] && (
                    <div className="adm-cert-file-preview">
                      <div className="adm-cert-file-info">
                        <span className="adm-cert-file-icon">
                          {certFiles[i].type === 'application/pdf' ? '📄' : '🖼'}
                        </span>
                        <div>
                          <div className="adm-cert-file-label">{certFiles[i].name}</div>
                          <div className="adm-cert-file-size">
                            {(certFiles[i].size / 1024).toFixed(0)} KB — will upload on save
                          </div>
                        </div>
                        <button
                          type="button"
                          className="adm-btn-row-delete"
                          onClick={() => {
                            setCertFiles((prev) => {
                              const u = [...prev]; u[i] = null; return u;
                            });
                            if (fileRefs.current[i]) fileRefs.current[i].value = '';
                          }}
                          title="Remove selected file"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  )}

                  {!cert.fileUrl && !certFiles[i] && (
                    <label className="adm-upload-btn">
                      <input
                        ref={(el) => { fileRefs.current[i] = el; }}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        onChange={(e) => handleFileSelect(i, e)}
                        style={{ display: 'none' }}
                      />
                      📎 Upload certificate (PDF or image)
                    </label>
                  )}

                  {(cert.fileUrl || certFiles[i]) && (
                    <label className="adm-upload-btn" style={{ marginTop: '8px' }}>
                      <input
                        ref={(el) => { fileRefs.current[i] = el; }}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        onChange={(e) => handleFileSelect(i, e)}
                        style={{ display: 'none' }}
                      />
                      🔄 Change file
                    </label>
                  )}

                  <span className="adm-hint">
                    PDF opens in a new tab. Images open in a lightbox. Max 10MB.
                  </span>
                </div>

                {i < certs.length - 1 && <div className="adm-cert-separator" />}
              </div>
            ))}

            <button type="button" className="adm-btn-add-row" onClick={addCert}>
              + Add certification
            </button>
          </div>

          <div className="adm-field" style={{ marginTop: '1rem' }}>
            <label>Certification Note</label>
            <input
              value={certNote}
              onChange={(e) => setCertNote(e.target.value)}
              placeholder="More certifications in progress — TypeScript, AWS..."
            />
            <span className="adm-hint">Small text shown below the certifications list.</span>
          </div>

          {msg && (
            <div className={`adm-flash ${msg.error ? 'adm-flash-error' : ''}`}>
              {msg.text}
            </div>
          )}

          <div className="adm-form-actions">
            <button className="adm-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save education'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EducationTab;