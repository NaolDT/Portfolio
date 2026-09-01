import { useState, useEffect } from 'react';
import api from '../../../api/axiosInstance';
import { useAdmin } from '../../../context/AdminContext';

const DEFAULTS = {
  headline: '', subText: '', contextText: '', available: true, cvPath: '/assets/NaolDera-CV.pdf',
};

function HeroTab() {
  const { token }               = useAdmin();
  const [form, setForm]         = useState(DEFAULTS);
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg]           = useState(null);
  const headers = { Authorization: `Bearer ${token}` };

  const flash = (text, error = false) => { setMsg({ text, error }); setTimeout(() => setMsg(null), 3500); };

  useEffect(() => {
    api.get('/api/hero')
      .then((r) => { setForm(r.data); setFetching(false); })
      .catch(() => setFetching(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await api.put('/api/hero', form, { headers });
      flash('Hero section saved ✓');
    } catch { flash('Save failed', true); }
    finally { setLoading(false); }
  };

  if (fetching) return <div className="adm-loading">Loading...</div>;

  return (
    <div className="adm-tab">
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">Hero Section</h3>
          <p className="adm-card-desc">Controls the main headline, sub text, availability badge, and CV download link in your portfolio hero.</p>
        </div>
        <form onSubmit={handleSubmit} className="adm-form">
          <div className="adm-field">
            <label>Main Headline *</label>
            <textarea name="headline" value={form.headline} onChange={handleChange} rows={2} required placeholder="Full Stack Developer building production-minded web applications." />
            <span className="adm-hint">The large bold text at the top of your portfolio.</span>
          </div>
          <div className="adm-field">
            <label>Sub Text *</label>
            <textarea name="subText" value={form.subText} onChange={handleChange} rows={3} required placeholder="I design and build full-stack systems..." />
            <span className="adm-hint">The paragraph shown below the headline.</span>
          </div>
          <div className="adm-field">
            <label>Context Text *</label>
            <input type="text" name="contextText" value={form.contextText} onChange={handleChange} required placeholder="Software Engineering student at Jimma University, Ethiopia." />
            <span className="adm-hint">Small monospace line shown below sub text.</span>
          </div>
          <div className="adm-field">
            <label>CV File Path</label>
            <input type="text" name="cvPath" value={form.cvPath} onChange={handleChange} placeholder="/assets/NaolDera-CV.pdf" />
            <span className="adm-hint">Path to your CV PDF in the public/assets folder. Leave empty to hide the Download CV button.</span>
          </div>
          <div className="adm-checkbox-group">
            <label className="adm-checkbox-label">
              <input type="checkbox" name="available" checked={form.available} onChange={handleChange} />
              <span>Show "Available for opportunities" badge</span>
            </label>
            <span className="adm-hint">When checked shows a green dot. When unchecked shows "Currently busy" with a yellow dot.</span>
          </div>
          {msg && <div className={`adm-flash ${msg.error ? 'adm-flash-error' : ''}`}>{msg.text}</div>}
          <div className="adm-form-actions">
            <button className="adm-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save hero section'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HeroTab;