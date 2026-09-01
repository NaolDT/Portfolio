import { useState, useEffect } from 'react';
import api from '../../../api/axiosInstance';
import { useAdmin } from '../../../context/AdminContext';

const EMPTY = { role: '', org: '', period: '', type: 'independent', description: '', highlights: '', order: 0 };
const TYPES = ['education', 'internship', 'independent', 'academic', 'freelance'];
const TYPE_COLORS = { education: 'cyan', internship: 'purple', independent: 'yellow', academic: 'muted', freelance: 'green' };

function ExperienceTab() {
  const { token }             = useAdmin();
  const [items, setItems]     = useState([]);
  const [form, setForm]       = useState(EMPTY);
  const [editId, setEditId]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState(null);
  const headers = { Authorization: `Bearer ${token}` };

  const flash = (text, error = false) => { setMsg({ text, error }); setTimeout(() => setMsg(null), 3500); };
  const fetch  = () => api.get('/api/experience').then((r) => setItems(r.data));
  useEffect(() => { fetch(); }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editId) { await api.put(`/api/experience/${editId}`, form, { headers }); flash('Experience updated ✓'); }
      else        { await api.post('/api/experience', form, { headers }); flash('Experience added ✓'); }
      setForm(EMPTY); setEditId(null); fetch();
    } catch { flash('Save failed', true); }
    finally { setLoading(false); }
  };

  const handleEdit = (exp) => {
    setEditId(exp._id);
    setForm({
      role: exp.role, org: exp.org, period: exp.period, type: exp.type,
      description: exp.description || '',
      highlights: (exp.highlights || []).join('\n'),
      order: exp.order || 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, role) => {
    if (!window.confirm(`Delete "${role}"?`)) return;
    await api.delete(`/api/experience/${id}`, { headers }); flash('Deleted'); fetch();
  };

  return (
    <div className="adm-tab">
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">{editId ? 'Edit Experience' : 'Add Experience'}</h3>
          <p className="adm-card-desc">Timeline entries shown in the Experience section of the portfolio.</p>
        </div>
        <form onSubmit={handleSubmit} className="adm-form">
          <div className="adm-form-grid-2">
            <div className="adm-field">
              <label>Role *</label>
              <input name="role" value={form.role} onChange={handleChange} placeholder="Full Stack Developer Intern" required />
            </div>
            <div className="adm-field">
              <label>Organization *</label>
              <input name="org" value={form.org} onChange={handleChange} placeholder="Oasis Infobyte (OIBSIP)" required />
            </div>
          </div>
          <div className="adm-form-grid-3">
            <div className="adm-field">
              <label>Period *</label>
              <input name="period" value={form.period} onChange={handleChange} placeholder="2024 — Present" required />
            </div>
            <div className="adm-field">
              <label>Type</label>
              <select name="type" value={form.type} onChange={handleChange}>
                {TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="adm-field">
              <label>Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} min={0} />
            </div>
          </div>
          <div className="adm-field">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="What you did here..." />
          </div>
          <div className="adm-field">
            <label>Highlights</label>
            <textarea name="highlights" value={form.highlights} onChange={handleChange} rows={5} placeholder={"Built complete MERN stack application\nIntegrated Razorpay payment gateway\nDeployed to Vercel and Render"} />
            <span className="adm-hint">One bullet per line. Each becomes a ▸ item in the timeline.</span>
          </div>
          {msg && <div className={`adm-flash ${msg.error ? 'adm-flash-error' : ''}`}>{msg.text}</div>}
          <div className="adm-form-actions">
            <button className="adm-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : editId ? 'Update' : 'Add experience'}
            </button>
            {editId && <button className="adm-btn-ghost" type="button" onClick={() => { setForm(EMPTY); setEditId(null); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">All Experiences ({items.length})</h3>
        {items.length === 0 ? <p className="adm-empty">No entries yet.</p> : (
          <div className="adm-list">
            {items.map((exp) => (
              <div className="adm-list-item" key={exp._id}>
                <div className="adm-list-info">
                  <span className="adm-list-title">{exp.role}</span>
                  <span className="adm-badge-text">{exp.org}</span>
                  <span className={`adm-badge adm-badge-${TYPE_COLORS[exp.type] || 'muted'}`}>{exp.type}</span>
                </div>
                <div className="adm-list-actions">
                  <button className="adm-btn-edit" onClick={() => handleEdit(exp)}>Edit</button>
                  <button className="adm-btn-delete" onClick={() => handleDelete(exp._id, exp.role)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExperienceTab;