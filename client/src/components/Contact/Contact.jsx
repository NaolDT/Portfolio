import { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const CONTACT_EMAIL = 'naoldera8@gmail.com';     
const GITHUB_URL    = 'https://github.com/NaolDT';
const LINKEDIN_URL  = 'https://www.linkedin.com/in/naol-dera-5959b9417'; 

function Contact() {
  const [form, setForm]       = useState({ name: '', email: '', message: '' });
  const [status, setStatus]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      await axios.post('/api/contact', form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact">
      <div className="section-label">// 04 — contact</div>
      <h2 className="section-title">Let's connect</h2>

      <div className="contact-grid">
        <div className="contact-info">
          <p>
            I'm open to <strong>internships, collaborations, and freelance
            projects</strong>. If you're building something interesting — let's talk.
          </p>
          <p>
            Currently based in <strong>Jimma, Ethiopia</strong>, available for
            remote work.
          </p>
          <div className="contact-links">
            <a className="contact-link" href={`mailto:${CONTACT_EMAIL}`}>
              <span className="cl-label">Email</span>
              <span className="cl-val">{CONTACT_EMAIL}</span>
            </a>
            <a className="contact-link" href={GITHUB_URL} target="_blank" rel="noreferrer">
              <span className="cl-label">GitHub</span>
              <span className="cl-val">github.com/NaolDT</span>
            </a>
            <a className="contact-link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              <span className="cl-label">LinkedIn</span>
              <span className="cl-val">linkedin.com/in/naol-dera</span>
            </a>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your message" rows={5} value={form.message} onChange={handleChange} required />
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send message →'}
          </button>
          {status === 'success' && <p className="form-success">Message sent successfully!</p>}
          {status === 'error'   && <p className="form-error">Something went wrong. Try again.</p>}
        </form>
      </div>
    </section>
  );
}

export default Contact;