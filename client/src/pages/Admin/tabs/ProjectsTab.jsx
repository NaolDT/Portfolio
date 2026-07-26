import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAdmin } from '../../../context/AdminContext';

const empty = {
  title: '', shortDesc: '', fullDesc: '',
  tags: '', status: 'active', featured: false,
  githubUrl: '', liveUrl: '',
};

function ProjectsTab() {
  const { token }               = useAdmin();
  const [projects, setProjects] = useState([]);
  const [form, setForm]         = useState(empty);
  const [editId, setEditId]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState('');

  const headers = { Authorization: `Bearer ${token}` };

  const fetchProjects = async () => {
    const res = await axios.get('/api/projects');
    setProjects(res.data);
  };

  useEffect(() => { fetchProjects(); }, []);

  const flash = (text) => { setMsg(text); setTimeout(() => setMsg(''), 3000); };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean) };
    try {
      if (editId) {
        await axios.put(`/api/projects/${editId}`, payload, { headers });
        flash('Project updated ✓');
      } else {
        await axios.post('/api/projects', payload, { headers });
        flash('Project added ✓');
      }
      setForm(empty); setEditId(null); fetchProjects();
    } catch (err) {
      flash(err.response?.data?.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setForm({ ...p, tags: p.tags.join(', ') });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await axios.delete(`/api/projects/${id}`, { headers });
    flash('Project deleted'); fetchProjects();
  };

  return (
    <div className="tab-content">
      <div className="admin-card">
        <h3 className="admin-card-title">{editId ? 'Edit Project' : 'Add New Project'}</h3>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-row">
            <div className="admin-field">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div className="admin-field">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="active">active</option>
                <option value="completed">completed</option>
              </select>
            </div>
          </div>
          <div className="admin-field">
            <label>Short description * (card)</label>
            <textarea name="shortDesc" value={form.shortDesc} onChange={handleChange} rows={2} required />
          </div>
          <div className="admin-field">
            <label>Full description * (modal)</label>
            <textarea name="fullDesc" value={form.fullDesc} onChange={handleChange} rows={4} required />
          </div>
          <div className="admin-field">
            <label>Tags (comma separated)</label>
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
          </div>
          <div className="admin-form-row">
            <div className="admin-field">
              <label>GitHub URL</label>
              <input name="githubUrl" value={form.githubUrl} onChange={handleChange} />
            </div>
            <div className="admin-field">
              <label>Live URL</label>
              <input name="liveUrl" value={form.liveUrl} onChange={handleChange} />
            </div>
          </div>
          <div className="admin-checkbox-row">
            <label className="admin-checkbox-label">
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              Featured project (spans full width)
            </label>
          </div>
          {msg && <p className="admin-flash">{msg}</p>}
          <div className="admin-form-actions">
            <button className="admin-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : editId ? 'Update project' : 'Add project'}
            </button>
            {editId && (
              <button className="admin-btn-ghost" type="button" onClick={() => { setForm(empty); setEditId(null); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">All Projects ({projects.length})</h3>
        {projects.length === 0 ? (
          <p className="admin-empty">No projects yet.</p>
        ) : (
          <div className="admin-list">
            {projects.map((p) => (
              <div className="admin-list-item" key={p._id}>
                <div className="admin-list-info">
                  <span className="admin-list-title">{p.title}</span>
                  <span className={`admin-badge ${p.status === 'active' ? 'badge-active' : 'badge-done'}`}>{p.status}</span>
                  {p.featured && <span className="admin-badge badge-featured">featured</span>}
                </div>
                <div className="admin-list-actions">
                  <button className="admin-btn-edit" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="admin-btn-delete" onClick={() => handleDelete(p._id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsTab;