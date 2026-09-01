import { useState, useEffect } from 'react';
import api from '../../../api/axiosInstance';
import { useAdmin } from '../../../context/AdminContext';

const DEFAULTS = { email: '', githubUrl: '', linkedinUrl: '', cvPath: '' };

function SettingsTab() {
  const { token }               = useAdmin();
  const [form, setForm]         = useState(DEFAULTS);
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg]           = useState(null);
  const headers = { Authorization: `Bearer ${token}` };

  const flash = (text, error = false) => { setMsg({ text, error }); setTimeout(() => setMsg(null), 3500); };

  useEffect(() => {
    api.get('/api/settings')
      .then((r) => { setForm(r.data); setFetching(false); })
      .catch(() => setFetching(false));
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await api.put('/api/settings', form, { headers });
      flash('Settings saved ✓');
    } catch { flash('Save failed', true); }
    finally { setLoading(false); }
  };

  if (fetching) return <div className="adm-loading">Loading...</div>;

  return (
    <div className="adm-tab">
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">Site Settings</h3>
          <p className="adm-card-desc">
            Contact links used across the portfolio — hero social links, contact section, and footer.
            Changes here update everywhere at once.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="adm-form">
          <div className="adm-field">
            <label>Contact Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="naoldera8@gmail.com" required />
            <span className="adm-hint">Shown in the contact section and footer. Also receives contact form messages.</span>
          </div>
          <div className="adm-field">
            <label>GitHub URL</label>
            <input type="url" name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/NaolDT" />
            <span className="adm-hint">Shown in the hero, navbar, contact section, and footer.</span>
          </div>
          <div className="adm-field">
            <label>LinkedIn URL</label>
            <input type="url" name="linkedinUrl" value={form.linkedinUrl} onChange={handleChange} placeholder="https://www.linkedin.com/in/naol-dera-5959b9417" />
            <span className="adm-hint">Shown in the hero, contact section, and footer.</span>
          </div>
          <div className="adm-field">
            <label>CV File Path</label>
            <input type="text" name="cvPath" value={form.cvPath} onChange={handleChange} placeholder="/assets/NaolDera-CV.pdf" />
            <span className="adm-hint">
              Path to your CV in the public/assets folder. Update this here AND in the Hero tab when you upload a new CV.
            </span>
          </div>

          <div className="adm-info-box">
            <strong>How to update your CV:</strong>
            <ol>
              <li>Place the new PDF in <code>client/public/assets/</code></li>
              <li>Update the path here (e.g. <code>/assets/NaolDera-CV-2026.pdf</code>)</li>
              <li>Push to GitHub — Vercel redeploys automatically</li>
            </ol>
          </div>

          {msg && <div className={`adm-flash ${msg.error ? 'adm-flash-error' : ''}`}>{msg.text}</div>}
          <div className="adm-form-actions">
            <button className="adm-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsTab;