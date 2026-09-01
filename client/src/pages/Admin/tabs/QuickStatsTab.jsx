import { useState, useEffect } from 'react';
import api from '../../../api/axiosInstance';
import { useAdmin } from '../../../context/AdminContext';

const EMPTY = { value: '', label: '', sub: '', order: 0 };

function QuickStatsTab() {
  const { token }             = useAdmin();
  const [stats, setStats]     = useState([]);
  const [form, setForm]       = useState(EMPTY);
  const [editId, setEditId]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState(null);
  const headers = { Authorization: `Bearer ${token}` };

  const flash = (text, error = false) => { setMsg({ text, error }); setTimeout(() => setMsg(null), 3500); };
  const fetch  = () => api.get('/api/quickstats').then((r) => setStats(r.data));
  useEffect(() => { fetch(); }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { ...form, order: Number(form.order) };
      if (editId) { await api.put(`/api/quickstats/${editId}`, payload, { headers }); flash('Stat updated ✓'); }
      else        { await api.post('/api/quickstats', payload, { headers }); flash('Stat added ✓'); }
      setForm(EMPTY); setEditId(null); fetch();
    } catch { flash('Save failed', true); }
    finally { setLoading(false); }
  };

  const handleEdit = (s) => {
    setEditId(s._id);
    setForm({ value: s.value, label: s.label, sub: s.sub || '', order: s.order || 0 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, label) => {
    if (!window.confirm(`Delete "${label}"?`)) return;
    await api.delete(`/api/quickstats/${id}`, { headers }); flash('Deleted'); fetch();
  };

  return (
    <div className="adm-tab">
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">{editId ? 'Edit Stat' : 'Add Quick Stat'}</h3>
          <p className="adm-card-desc">The 4 metric cards shown between the hero and about sections.</p>
        </div>
        <form onSubmit={handleSubmit} className="adm-form">
          <div className="adm-form-grid-2">
            <div className="adm-field">
              <label>Value *</label>
              <input name="value" value={form.value} onChange={handleChange} placeholder="4+" required />
              <span className="adm-hint">The large number or word (e.g. "4+", "MERN", "Full Stack").</span>
            </div>
            <div className="adm-field">
              <label>Label *</label>
              <input name="label" value={form.label} onChange={handleChange} placeholder="Projects Shipped" required />
              <span className="adm-hint">The title below the value.</span>
            </div>
          </div>
          <div className="adm-form-grid-2">
            <div className="adm-field">
              <label>Sub text</label>
              <input name="sub" value={form.sub} onChange={handleChange} placeholder="production deployed" />
              <span className="adm-hint">Small monospace text below the label.</span>
            </div>
            <div className="adm-field">
              <label>Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} min={0} />
            </div>
          </div>
          {msg && <div className={`adm-flash ${msg.error ? 'adm-flash-error' : ''}`}>{msg.text}</div>}
          <div className="adm-form-actions">
            <button className="adm-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : editId ? 'Update stat' : 'Add stat'}
            </button>
            {editId && <button className="adm-btn-ghost" type="button" onClick={() => { setForm(EMPTY); setEditId(null); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">All Stats ({stats.length})</h3>
        {stats.length === 0 ? <p className="adm-empty">No stats yet.</p> : (
          <div className="adm-list">
            {stats.map((s) => (
              <div className="adm-list-item" key={s._id}>
                <div className="adm-list-info">
                  <span className="adm-list-value">{s.value}</span>
                  <span className="adm-list-title">{s.label}</span>
                  <span className="adm-badge adm-badge-muted">{s.sub}</span>
                </div>
                <div className="adm-list-actions">
                  <button className="adm-btn-edit" onClick={() => handleEdit(s)}>Edit</button>
                  <button className="adm-btn-delete" onClick={() => handleDelete(s._id, s.label)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuickStatsTab;