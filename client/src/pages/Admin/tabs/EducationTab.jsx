import { useState, useEffect } from 'react';
import api from '../../../api/axiosInstance';
import { useAdmin } from '../../../context/AdminContext';

function EducationTab() {
  const { token }               = useAdmin();
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg]           = useState(null);
  const [deg, setDeg]           = useState({ degree: '', university: '', faculty: '', period: '' });
  const [coursesText, setCoursesText]   = useState('');
  const [certNote, setCertNote]         = useState('');
  const [certifications, setCertifications] = useState([]);
  const headers = { Authorization: `Bearer ${token}` };

  const flash = (text, error = false) => { setMsg({ text, error }); setTimeout(() => setMsg(null), 3500); };

  useEffect(() => {
    api.get('/api/education').then((r) => {
      const d = r.data;
      setDeg({ degree: d.degree || '', university: d.university || '', faculty: d.faculty || '', period: d.period || '' });
      setCoursesText((d.courses || []).join('\n'));
      setCertNote(d.certNote || '');
      setCertifications(d.certifications || []);
      setFetching(false);
    }).catch(() => setFetching(false));
  }, []);

  const updateCert = (i, field, value) =>
    setCertifications((prev) => prev.map((c, idx) => idx === i ? { ...c, [field]: value } : c));
  const addCert    = () => setCertifications((p) => [...p, { name: '', org: '', year: '', note: '', status: 'Earned' }]);
  const removeCert = (i) => setCertifications((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const courses = coursesText.split('\n').map((c) => c.trim()).filter(Boolean);
      await api.put('/api/education', { ...deg, courses, certifications, certNote }, { headers });
      flash('Education saved ✓');
    } catch { flash('Save failed', true); }
    finally { setLoading(false); }
  };

  if (fetching) return <div className="adm-loading">Loading...</div>;

  return (
    <div className="adm-tab">
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">Education</h3>
          <p className="adm-card-desc">Your degree info, coursework, and certifications shown at the bottom of the portfolio.</p>
        </div>
        <form onSubmit={handleSubmit} className="adm-form">

          <div className="adm-section-divider">Degree</div>
          <div className="adm-form-grid-2">
            <div className="adm-field">
              <label>Degree *</label>
              <input value={deg.degree} onChange={(e) => setDeg((p) => ({ ...p, degree: e.target.value }))} placeholder="BSc Software Engineering" required />
            </div>
            <div className="adm-field">
              <label>Period</label>
              <input value={deg.period} onChange={(e) => setDeg((p) => ({ ...p, period: e.target.value }))} placeholder="2024 — 2028 (Expected)" />
            </div>
          </div>
          <div className="adm-field">
            <label>University</label>
            <input value={deg.university} onChange={(e) => setDeg((p) => ({ ...p, university: e.target.value }))} placeholder="Jimma University — Institute of Technology" />
          </div>
          <div className="adm-field">
            <label>Faculty</label>
            <input value={deg.faculty} onChange={(e) => setDeg((p) => ({ ...p, faculty: e.target.value }))} placeholder="Faculty of Computing and Informatics" />
          </div>

          <div className="adm-section-divider">Coursework</div>
          <div className="adm-field">
            <label>Courses</label>
            <textarea value={coursesText} onChange={(e) => setCoursesText(e.target.value)} rows={6} placeholder={"Software Architecture & Design\nDistributed Systems\nDatabase Systems"} />
            <span className="adm-hint">One course per line.</span>
          </div>

          <div className="adm-section-divider">Certifications</div>
          <div className="adm-list-editor">
            {certifications.map((cert, i) => (
              <div className="adm-cert-row" key={i}>
                <div className="adm-form-grid-2">
                  <div className="adm-field">
                    <label>Certificate Name</label>
                    <input value={cert.name} onChange={(e) => updateCert(i, 'name', e.target.value)} placeholder="Full Stack Developer Certificate" />
                  </div>
                  <div className="adm-field">
                    <label>Organization</label>
                    <input value={cert.org} onChange={(e) => updateCert(i, 'org', e.target.value)} placeholder="Oasis Infobyte (OIBSIP)" />
                  </div>
                </div>
                <div className="adm-form-grid-3">
                  <div className="adm-field">
                    <label>Year</label>
                    <input value={cert.year} onChange={(e) => updateCert(i, 'year', e.target.value)} placeholder="2026" />
                  </div>
                  <div className="adm-field">
                    <label>Status</label>
                    <input value={cert.status} onChange={(e) => updateCert(i, 'status', e.target.value)} placeholder="Earned" />
                  </div>
                  <div className="adm-field adm-field-end">
                    <label>&nbsp;</label>
                    <button type="button" className="adm-btn-delete" onClick={() => removeCert(i)}>Remove</button>
                  </div>
                </div>
                <div className="adm-field">
                  <label>Note</label>
                  <input value={cert.note} onChange={(e) => updateCert(i, 'note', e.target.value)} placeholder="Level 3 completion — Pizza Delivery Application" />
                </div>
                {i < certifications.length - 1 && <hr className="adm-cert-divider" />}
              </div>
            ))}
            <button type="button" className="adm-btn-add-row" onClick={addCert}>+ Add certification</button>
          </div>

          <div className="adm-field" style={{ marginTop: '1rem' }}>
            <label>Certification Note</label>
            <input value={certNote} onChange={(e) => setCertNote(e.target.value)} placeholder="More certifications in progress — TypeScript, AWS..." />
            <span className="adm-hint">Small text shown below the certifications list.</span>
          </div>

          {msg && <div className={`adm-flash ${msg.error ? 'adm-flash-error' : ''}`}>{msg.text}</div>}
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