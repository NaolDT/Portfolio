import { useState } from 'react';
import api from '../../api/axiosInstance';
import useApi from '../../hooks/useApi';
import './Contact.css';

const FALLBACK = {
  email:       'naoldera8@gmail.com',
  githubUrl:   'https://github.com/NaolDT',
  linkedinUrl: 'https://www.linkedin.com/in/naol-dera-5959b9417',
};

function Contact() {
  const { data: settings }    = useApi('/api/settings', FALLBACK);
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus]   = useState('');
  const [loading, setLoading] = useState(false);

  const s = settings || FALLBACK;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setStatus('');
    try {
      await api.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch { setStatus('error'); }
    finally { setLoading(false); }
  };

  return (
    <section id="contact">
      <div className="section-label">// 08 — contact</div>
      <h2 className="section-title">Lets connect</h2>
      <p className="section-sub">
        Open to internships, collaborations, and freelance projects.
        Based in Jimma, Ethiopia — available for remote work.
      </p>

      <div className="contact-grid">
        <div className="contact-info">
          <div className="contact-links">
            {s.email && (
              <a className="contact-link" href={`mailto:${s.email}`}>
                <div className="cl-icon">✉</div>
                <div>
                  <div className="cl-label">Email</div>
                  <div className="cl-val">{s.email}</div>
                </div>
              </a>
            )}
            {s.githubUrl && (
              <a className="contact-link" href={s.githubUrl} target="_blank" rel="noreferrer">
                <div className="cl-icon">GH</div>
                <div>
                  <div className="cl-label">GitHub</div>
                  <div className="cl-val">{s.githubUrl.replace('https://', '')}</div>
                </div>
              </a>
            )}
            {s.linkedinUrl && (
              <a className="contact-link" href={s.linkedinUrl} target="_blank" rel="noreferrer">
                <div className="cl-icon">in</div>
                <div>
                  <div className="cl-label">LinkedIn</div>
                  <div className="cl-val">{s.linkedinUrl.replace('https://www.linkedin.com/in/', '')}</div>
                </div>
              </a>
            )}
            <div className="contact-link contact-link-static">
              <div className="cl-icon">📍</div>
              <div>
                <div className="cl-label">Location</div>
                <div className="cl-val">Jimma, Ethiopia — Remote available</div>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="cf-name">Name</label>
              <input id="cf-name" type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="cf-email">Email</label>
              <input id="cf-email" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="cf-subject">Subject</label>
            <input id="cf-subject" type="text" name="subject" placeholder="What is this about?" value={form.subject} onChange={handleChange} />
          </div>
          <div className="form-field">
            <label htmlFor="cf-message">Message</label>
            <textarea id="cf-message" name="message" rows={5} placeholder="Tell me about the opportunity or project..." value={form.message} onChange={handleChange} required />
          </div>
          <button className="btn-primary contact-submit" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send message →'}
          </button>
          {status === 'success' && (
            <div className="form-success">Message sent successfully. I will get back to you soon.</div>
          )}
          {status === 'error' && (
            <div className="form-error">Something went wrong. Try emailing directly at {s.email}</div>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;