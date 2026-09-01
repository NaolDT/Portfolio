import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import api from '../../api/axiosInstance';
import './Admin.css';

function AdminLogin() {
  const { login }             = useAdmin();
  const [form, setForm]       = useState({ username: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    try {
      const res = await api.post('/api/admin/login', form);
      login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-box">
        <div className="adm-login-logo">Naol<span>.admin</span></div>
        <h2 className="adm-login-title">Sign in</h2>
        <p className="adm-login-sub">Portfolio admin panel</p>
        <form onSubmit={handleSubmit} className="adm-login-form">
          <div className="adm-field">
            <label>Username</label>
            <input
              type="text" name="username" value={form.username}
              onChange={handleChange} placeholder="naol"
              autoComplete="username" required
            />
          </div>
          <div className="adm-field">
            <label>Password</label>
            <input
              type="password" name="password" value={form.password}
              onChange={handleChange} placeholder="••••••••"
              autoComplete="current-password" required
            />
          </div>
          {error && <p className="adm-flash adm-flash-error">{error}</p>}
          <button className="adm-btn-primary adm-btn-full" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <a className="adm-back-link" href="/">← Back to portfolio</a>
      </div>
    </div>
  );
}

export default AdminLogin;