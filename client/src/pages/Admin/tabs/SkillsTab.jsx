import { useState, useEffect } from 'react';
import api from '../../../api/axiosInstance'
import { useAdmin } from '../../../context/AdminContext';

const empty  = { group: '', name: '', pct: '', order: 0 };
const GROUPS = ['Frontend', 'Backend', 'Database & Tools', 'Architecture'];

function SkillsTab() {
  const { token }             = useAdmin();
  const [skills, setSkills]   = useState([]);
  const [form, setForm]       = useState(empty);
  const [editId, setEditId]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]         = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchSkills = async () => {
    const res = await api.get('/api/skills');
    setSkills(res.data);
  };

  useEffect(() => { fetchSkills(); }, []);

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, pct: Number(form.pct), order: Number(form.order) };
    try {
      if (editId) {
        await api.put(`/api/skills/${editId}`, payload, { headers });
        flash('Skill updated ✓');
      } else {
        await api.post('/api/skills', payload, { headers });
        flash('Skill added ✓');
      }
      setForm(empty); setEditId(null); fetchSkills();
    } catch (err) {
      flash(err.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (s) => {
    setEditId(s._id);
    setForm({ group: s.group, name: s.name, pct: s.pct, order: s.order });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    await api.delete(`/api/skills/${id}`, { headers });
    flash('Skill deleted'); fetchSkills();
  };

  const grouped = GROUPS.reduce((acc, g) => {
    acc[g] = skills.filter((s) => s.group === g);
    return acc;
  }, {});

  return (
    <div className="tab-content">
      <div className="admin-card">
        <h3 className="admin-card-title">{editId ? 'Edit Skill' : 'Add New Skill'}</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-row">
            <div className="admin-field">
              <label>Group *</label>
              <select name="group" value={form.group} onChange={handleChange} required>
                <option value="">Select group...</option>
                {GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="admin-field">
              <label>Skill name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. React.js" required />
            </div>
          </div>
          <div className="admin-form-row">
            <div className="admin-field">
              <label>Percentage * (0–100)</label>
              <input type="number" name="pct" value={form.pct} onChange={handleChange} min={0} max={100} required />
            </div>
            <div className="admin-field">
              <label>Order (within group)</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} min={0} />
            </div>
          </div>
          {msg && <p className="admin-flash">{msg}</p>}
          <div className="admin-form-actions">
            <button className="admin-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : editId ? 'Update skill' : 'Add skill'}
            </button>
            {editId && (
              <button className="admin-btn-ghost" type="button" onClick={() => { setForm(empty); setEditId(null); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {GROUPS.map((g) => (
        <div className="admin-card" key={g}>
          <h3 className="admin-card-title">{g} ({grouped[g]?.length || 0})</h3>
          {!grouped[g]?.length ? (
            <p className="admin-empty">No skills in this group yet.</p>
          ) : (
            <div className="admin-list">
              {grouped[g].map((s) => (
                <div className="admin-list-item" key={s._id}>
                  <div className="admin-list-info">
                    <span className="admin-list-title">{s.name}</span>
                    <span className="admin-badge badge-pct">{s.pct}%</span>
                    <span className="admin-badge badge-order">order: {s.order}</span>
                  </div>
                  <div className="admin-list-actions">
                    <button className="admin-btn-edit" onClick={() => handleEdit(s)}>Edit</button>
                    <button className="admin-btn-delete" onClick={() => handleDelete(s._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SkillsTab;