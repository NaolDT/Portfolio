import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import api from '../../api/axiosInstance'
import './Admin.css';

function AdminLogin() {
  const { login }               = useAdmin();
  const [form, setForm]         = useState({ username: '', password: '' });
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/admin/login', form);
      login(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-box">
        <div className="admin-login-logo">Naol<span>.admin</span></div>
        <h2 className="admin-login-title">Sign in</h2>
        <p className="admin-login-sub">Portfolio admin panel</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-field">
            <label>Username</label>
            <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="naol" autoComplete="username" required />
          </div>
          <div className="admin-field">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" autoComplete="current-password" required />
          </div>
          {error && <p className="admin-error">{error}</p>}
          <button className="admin-btn-primary" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in →'}
          </button>
        </form>

        <a className="admin-back-link" href="/">← Back to portfolio</a>
      </div>
    </div>
  );
}

export default AdminLogin;