import { useState, useEffect } from 'react';
import api from '../../../api/axiosInstance';
import { useAdmin } from '../../../context/AdminContext';

const EMPTY  = { title: '', status: '', statusColor: 'cyan', description: '', stack: '', focus: '', order: 0 };
const COLORS = ['cyan', 'yellow', 'purple', 'green'];

function BuildingTab() {
  const { token }             = useAdmin();
  const [items, setItems]     = useState([]);
  const [form, setForm]       = useState(EMPTY);
  const [editId, setEditId]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState(null);
  const headers = { Authorization: `Bearer ${token}` };

  const flash = (text, error = false) => { setMsg({ text, error }); setTimeout(() => setMsg(null), 3500); };
  const fetch  = () => api.get('/api/building').then((r) => setItems(r.data));
  useEffect(() => { fetch(); }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      if (editId) { await api.put(`/api/building/${editId}`, form, { headers }); flash('Updated ✓'); }
      else        { await api.post('/api/building', form, { headers }); flash('Added ✓'); }
      setForm(EMPTY); setEditId(null); fetch();
    } catch { flash('Save failed', true); }
    finally { setLoading(false); }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setForm({
      title: item.title, status: item.status, statusColor: item.statusColor,
      description: item.description || '',
      stack: (item.stack || []).join(', '),
      focus: (item.focus || []).join('\n'),
      order: item.order || 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    await api.delete(`/api/building/${id}`, { headers }); flash('Deleted'); fetch();
  };

  return (
    <div className="adm-tab">
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">{editId ? 'Edit Active Project' : 'Add Active Project'}</h3>
          <p className="adm-card-desc">Projects shown in the Currently Building section — work in progress not yet in the showcase.</p>
        </div>
        <form onSubmit={handleSubmit} className="adm-form">
          <div className="adm-form-grid-2">
            <div className="adm-field">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Multi-Tenant Hospital Platform" required />
            </div>
            <div className="adm-field">
              <label>Status Label *</label>
              <input name="status" value={form.status} onChange={handleChange} placeholder="In Development" required />
              <span className="adm-hint">Shown as a badge on the card e.g. "In Development", "Refinement".</span>
            </div>
          </div>
          <div className="adm-form-grid-3">
            <div className="adm-field">
              <label>Badge Color</label>
              <select name="statusColor" value={form.statusColor} onChange={handleChange}>
                {COLORS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="adm-field">
              <label>Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} min={0} />
            </div>
          </div>
          <div className="adm-field">
            <label>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="What this project is and where it currently stands..." />
          </div>
          <div className="adm-field">
            <label>Stack</label>
            <input name="stack" value={form.stack} onChange={handleChange} placeholder="React, Node.js, Express, MongoDB, JWT" />
            <span className="adm-hint">Comma separated technologies.</span>
          </div>
          <div className="adm-field">
            <label>Current Focus</label>
            <textarea name="focus" value={form.focus} onChange={handleChange} rows={4} placeholder={"Multi-tenant architecture\nRole-based access control\nPatient management"} />
            <span className="adm-hint">One item per line. Each becomes a → bullet on the card.</span>
          </div>
          {msg && <div className={`adm-flash ${msg.error ? 'adm-flash-error' : ''}`}>{msg.text}</div>}
          <div className="adm-form-actions">
            <button className="adm-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : editId ? 'Update' : 'Add project'}
            </button>
            {editId && <button className="adm-btn-ghost" type="button" onClick={() => { setForm(EMPTY); setEditId(null); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">Active Projects ({items.length})</h3>
        {items.length === 0 ? <p className="adm-empty">No active projects yet.</p> : (
          <div className="adm-list">
            {items.map((item) => (
              <div className="adm-list-item" key={item._id}>
                <div className="adm-list-info">
                  <span className="adm-list-title">{item.title}</span>
                  <span className={`adm-badge adm-badge-${item.statusColor || 'cyan'}`}>{item.status}</span>
                </div>
                <div className="adm-list-actions">
                  <button className="adm-btn-edit" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="adm-btn-delete" onClick={() => handleDelete(item._id, item.title)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BuildingTab;