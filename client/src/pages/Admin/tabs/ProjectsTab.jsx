import { useState, useEffect, useRef } from 'react';
import api from '../../../api/axiosInstance';
import { useAdmin } from '../../../context/AdminContext';

const EMPTY = {
  title: '', category: 'Full Stack', status: 'active', featured: false,
  tagline: '', overview: '', contribution: '',
  features: '', challenges: '', technologies: '',
  apiEndpoints: '', githubUrl: '', liveUrl: '', order: 0,
};
const CATEGORIES = ['Full Stack', 'Frontend', 'Backend', 'Academic'];

function ProjectsTab() {
  const { token }               = useAdmin();
  const [projects, setProjects] = useState([]);
  const [form, setForm]         = useState(EMPTY);
  const [editId, setEditId]     = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg]           = useState(null);
  const fileRef                 = useRef();
  const headers = { Authorization: `Bearer ${token}` };

  const flash  = (text, error = false) => { setMsg({ text, error }); setTimeout(() => setMsg(null), 3500); };
  const fetch  = () => api.get('/api/projects').then((r) => setProjects(r.data));
  useEffect(() => { fetch(); }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

 const buildFormData = () => {
  const fd = new FormData();

  ['title', 'category', 'status', 'tagline', 'overview', 'contribution', 'githubUrl', 'liveUrl'].forEach((k) => {
    fd.append(k, form[k] || '');
  });

  fd.append('featured', form.featured);
  fd.append('order',    form.order || 0);

  const technologies = form.technologies
    ? form.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];
  fd.append('technologies', JSON.stringify(technologies));

  const features = form.features
    ? form.features.split('\n').map((f) => f.trim()).filter(Boolean)
    : [];
  fd.append('features', JSON.stringify(features));

  const apiEndpoints = form.apiEndpoints
    ? form.apiEndpoints.split('\n').map((e) => e.trim()).filter(Boolean)
    : [];
  fd.append('apiEndpoints', JSON.stringify(apiEndpoints));

  const challenges = form.challenges
    ? form.challenges
        .split('\n\n')
        .filter(Boolean)
        .map((block) => {
          const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
          return { problem: lines[0] || '', solution: lines.slice(1).join(' ') || '' };
        })
        .filter((c) => c.problem && c.solution)
    : [];
  fd.append('challenges', JSON.stringify(challenges));

  fd.append('architecture', JSON.stringify({ description: '', layers: [] }));

  if (imageFile) fd.append('image', imageFile);

  return fd;
};

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const fd = buildFormData();
      if (editId) {
  await api.put(`/api/projects/${editId}`, fd, { headers });
  flash('Project updated ✓');
} else {
  await api.post('/api/projects', fd, { headers });
  flash('Project added ✓');
}
      setForm(EMPTY); setEditId(null); setImageFile(null); setImagePreview(null);
      if (fileRef.current) fileRef.current.value = '';
      fetch();
    } catch (err) { flash(err.response?.data?.message || 'Save failed', true); }
    finally { setLoading(false); }
  };

  const handleEdit = (p) => {
    setEditId(p._id);
    setImagePreview(p.image || null);
    setImageFile(null);
    setForm({
      title: p.title, category: p.category, status: p.status, featured: p.featured,
      tagline: p.tagline || '', overview: p.overview || '', contribution: p.contribution || '',
      technologies: (p.technologies || []).join(', '),
      features: (p.features || []).join('\n'),
      apiEndpoints: (p.apiEndpoints || []).join('\n'),
      challenges: (p.challenges || []).map((c) => `${c.problem}\n${c.solution}`).join('\n\n'),
      githubUrl: p.githubUrl || '', liveUrl: p.liveUrl || '', order: p.order || 0,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    await api.delete(`/api/projects/${id}`, { headers }); flash('Deleted'); fetch();
  };

  return (
    <div className="adm-tab">
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">{editId ? 'Edit Project' : 'Add New Project'}</h3>
          <p className="adm-card-desc">Manage portfolio projects. Screenshot uploads go directly to Cloudinary.</p>
        </div>
        <form onSubmit={handleSubmit} className="adm-form">

          <div className="adm-form-grid-2">
            <div className="adm-field">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Project title" required />
            </div>
            <div className="adm-field">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="adm-form-grid-3">
            <div className="adm-field">
              <label>Status</label>
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="active">active</option>
                <option value="completed">completed</option>
              </select>
            </div>
            <div className="adm-field">
              <label>Order</label>
              <input type="number" name="order" value={form.order} onChange={handleChange} min={0} />
            </div>
            <div className="adm-field adm-field-center">
              <label>Featured</label>
              <label className="adm-checkbox-label">
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                <span>Full width card</span>
              </label>
            </div>
          </div>

          <div className="adm-field">
            <label>Tagline</label>
            <input name="tagline" value={form.tagline} onChange={handleChange} placeholder="One-line value proposition shown on the project card" />
          </div>

          <div className="adm-field">
            <label>Overview *</label>
            <textarea name="overview" value={form.overview} onChange={handleChange} rows={3} placeholder="What the project is, what problem it solves, who it is for..." required />
          </div>

          <div className="adm-field">
            <label>My Contribution *</label>
            <textarea name="contribution" value={form.contribution} onChange={handleChange} rows={2} placeholder="What you personally designed and built..." required />
            <span className="adm-hint">Be honest — solo vs team, what you specifically built.</span>
          </div>

          <div className="adm-field">
            <label>Key Features</label>
            <textarea name="features" value={form.features} onChange={handleChange} rows={5} placeholder="One feature per line..." />
            <span className="adm-hint">One feature per line. Each becomes a ✓ bullet in the modal.</span>
          </div>

          <div className="adm-field">
            <label>Engineering Challenges</label>
            <textarea name="challenges" value={form.challenges} onChange={handleChange} rows={6} placeholder={"Problem description\nSolution description\n\nSecond problem\nSecond solution"} />
            <span className="adm-hint">Each challenge is two lines: line 1 = problem, line 2 = solution. Separate multiple challenges with a blank line.</span>
          </div>

          <div className="adm-field">
            <label>Technologies</label>
            <input name="technologies" value={form.technologies} onChange={handleChange} placeholder="React 18, Node.js, Express.js, MySQL, JWT, Cloudinary" />
            <span className="adm-hint">Comma separated.</span>
          </div>

          <div className="adm-field">
            <label>API Endpoints</label>
            <textarea name="apiEndpoints" value={form.apiEndpoints} onChange={handleChange} rows={4} placeholder={"POST /api/auth/login\nGET  /api/products\nPOST /api/orders"} />
            <span className="adm-hint">One endpoint per line. Leave empty for frontend-only projects.</span>
          </div>

          <div className="adm-form-grid-2">
            <div className="adm-field">
              <label>GitHub URL</label>
              <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/NaolDT/..." />
            </div>
            <div className="adm-field">
              <label>Live URL</label>
              <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://..." />
            </div>
          </div>

          <div className="adm-field">
            <label>Project Screenshot</label>
            <div className="adm-image-upload">
              {imagePreview && (
                <div className="adm-image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button
                    type="button"
                    className="adm-image-remove"
                    onClick={() => { setImageFile(null); setImagePreview(null); if (fileRef.current) fileRef.current.value = ''; }}
                  >✕ Remove</button>
                </div>
              )}
              <label className="adm-upload-btn">
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display: 'none' }} />
                {imagePreview ? '📷 Change screenshot' : '📷 Upload screenshot'}
              </label>
              <span className="adm-hint">JPG, PNG, WEBP up to 5MB. Uploads directly to Cloudinary.</span>
            </div>
          </div>

          {msg && <div className={`adm-flash ${msg.error ? 'adm-flash-error' : ''}`}>{msg.text}</div>}

          <div className="adm-form-actions">
            <button className="adm-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : editId ? 'Update project' : 'Add project'}
            </button>
            {editId && (
              <button className="adm-btn-ghost" type="button" onClick={() => {
                setForm(EMPTY); setEditId(null); setImageFile(null); setImagePreview(null);
              }}>Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="adm-card">
        <h3 className="adm-card-title">All Projects ({projects.length})</h3>
        {projects.length === 0 ? <p className="adm-empty">No projects yet. Add one above.</p> : (
          <div className="adm-list">
            {projects.map((p) => (
              <div className="adm-list-item" key={p._id}>
                <div className="adm-list-thumb">
                  {p.image
                    ? <img src={p.image} alt={p.title} />
                    : <div className="adm-list-thumb-empty">🖼</div>
                  }
                </div>
                <div className="adm-list-info">
                  <span className="adm-list-title">{p.title}</span>
                  <div className="adm-list-meta">
                    <span className={`adm-badge adm-badge-${p.status === 'active' ? 'cyan' : 'purple'}`}>{p.status}</span>
                    <span className="adm-badge adm-badge-muted">{p.category}</span>
                    {p.featured && <span className="adm-badge adm-badge-yellow">featured</span>}
                  </div>
                </div>
                <div className="adm-list-actions">
                  <button className="adm-btn-edit" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="adm-btn-delete" onClick={() => handleDelete(p._id, p.title)}>Delete</button>
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