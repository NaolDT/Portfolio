import { useState, useEffect } from 'react';
import api from '../../../api/axiosInstance';
import { useAdmin } from '../../../context/AdminContext';

const EMPTY  = { group: '', name: '', level: 'Intermediate', order: 0 };
const GROUPS = ['Frontend', 'Backend', 'Databases', 'Engineering', 'Currently Learning'];
const LEVELS = ['Advanced', 'Intermediate', 'Familiar', 'Learning'];

const levelColors = {
  Advanced:     'adm-badge-cyan',
  Intermediate: 'adm-badge-purple',
  Familiar:     'adm-badge-muted',
  Learning:     'adm-badge-yellow',
};

function SkillsTab() {
  const { token }           = useAdmin();
  const [skills, setSkills] = useState([]);
  const [form, setForm]     = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg]       = useState(null);
  const headers = { Authorization: `Bearer ${token}` };

  const flash = (text, error = false) => { setMsg({ text, error }); setTimeout(() => setMsg(null), 3500); };
  const fetch  = () => api.get('/api/skills').then((r) => setSkills(r.data));
  useEffect(() => { fetch(); }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const payload = { ...form, order: Number(form.order) };
      if (editId) { await api.put(`/api/skills/${editId}`, payload, { headers }); flash('Skill updated ✓'); }
      else        { await api.post('/api/skills', payload, { headers }); flash('Skill added ✓'); }
      setForm(EMPTY); setEditId(null); fetch();
    } catch { flash('Save failed', true); }
    finally { setLoading(false); }
  };

  const handleEdit = (s) => {
    setEditId(s._id);
    setForm({ group: s.group, name: s.name, level: s.level, order: s.order || 0 });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    await api.delete(`/api/skills/${id}`, { headers }); flash('Deleted'); fetch();
  };

  const grouped = GROUPS.reduce((acc, g) => {
    acc[g] = skills.filter((s) => s.group === g);
    return acc;
  }, {});

  return (
    <div className="adm-tab">
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">{editId ? 'Edit Skill' : 'Add New Skill'}</h3>
          <p className="adm-card-desc">Manage tech stack pills. Level controls pill color on the portfolio.</p>
        </div>
        <form onSubmit={handleSubmit} className="adm-form">
          <div className="adm-form-grid-2">
            <div className="adm-field">
              <label>Group *</label>
              <select name="group" value={form.group} onChange={handleChange} required>
                <option value="">Select group...</option>
                {GROUPS.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div className="adm-field">
              <label>Skill Name *</label>
              <input name="name" value={form.name} onChange={handleChange} placeholder="React.js" required />
            </div>
          </div>
          <div className="adm-form-grid-2">
            <div className="adm-field">
              <label>Level</label>
              <select name="level" value={form.level} onChange={handleChange}>
                {LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
              <span className="adm-hint">Controls pill color: Advanced = cyan, Intermediate = purple, Familiar = grey, Learning = yellow.</span>
            </div>
            <div className="adm-field">
              <label>Order (within group)</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} min={0} />
            </div>
          </div>
          {msg && <div className={`adm-flash ${msg.error ? 'adm-flash-error' : ''}`}>{msg.text}</div>}
          <div className="adm-form-actions">
            <button className="adm-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : editId ? 'Update skill' : 'Add skill'}
            </button>
            {editId && (
              <button className="adm-btn-ghost" type="button" onClick={() => { setForm(EMPTY); setEditId(null); }}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      {GROUPS.map((g) => (
        grouped[g]?.length > 0 && (
          <div className="adm-card" key={g}>
            <h3 className="adm-card-title">{g} ({grouped[g].length})</h3>
            <div className="adm-list">
              {[...grouped[g]].sort((a, b) => (a.order || 0) - (b.order || 0)).map((s) => (
                <div className="adm-list-item" key={s._id}>
                  <div className="adm-list-info">
                    <span className="adm-list-title">{s.name}</span>
                    <span className={`adm-badge ${levelColors[s.level] || 'adm-badge-muted'}`}>{s.level}</span>
                    <span className="adm-badge adm-badge-muted">#{s.order}</span>
                  </div>
                  <div className="adm-list-actions">
                    <button className="adm-btn-edit" onClick={() => handleEdit(s)}>Edit</button>
                    <button className="adm-btn-delete" onClick={() => handleDelete(s._id, s.name)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
}

export default SkillsTab;