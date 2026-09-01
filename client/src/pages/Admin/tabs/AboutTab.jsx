import { useState, useEffect } from 'react';
import api from '../../../api/axiosInstance';
import { useAdmin } from '../../../context/AdminContext';

function AboutTab() {
  const { token }               = useAdmin();
  const [loading, setLoading]   = useState(false);
  const [fetching, setFetching] = useState(true);
  const [msg, setMsg]           = useState(null);
  const [paragraphsText, setParagraphsText] = useState('');
  const [valueTagsText, setValueTagsText]   = useState('');
  const [facts, setFacts]                   = useState([]);
  const headers = { Authorization: `Bearer ${token}` };

  const flash = (text, error = false) => { setMsg({ text, error }); setTimeout(() => setMsg(null), 3500); };

  useEffect(() => {
    api.get('/api/about').then((r) => {
      setParagraphsText((r.data.paragraphs || []).join('\n\n'));
      setValueTagsText((r.data.valueTags || []).join(', '));
      setFacts(r.data.facts || []);
      setFetching(false);
    }).catch(() => setFetching(false));
  }, []);

  const updateFact = (i, field, value) =>
    setFacts((prev) => prev.map((f, idx) => idx === i ? { ...f, [field]: value } : f));

  const addFact    = () => setFacts((p) => [...p, { key: '', val: '', highlight: false, order: p.length + 1 }]);
  const removeFact = (i) => setFacts((p) => p.filter((_, idx) => idx !== i));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      const paragraphs = paragraphsText.split('\n\n').map((p) => p.trim()).filter(Boolean);
      const valueTags  = valueTagsText.split(',').map((t) => t.trim()).filter(Boolean);
      await api.put('/api/about', { paragraphs, valueTags, facts }, { headers });
      flash('About section saved ✓');
    } catch { flash('Save failed', true); }
    finally { setLoading(false); }
  };

  if (fetching) return <div className="adm-loading">Loading...</div>;

  return (
    <div className="adm-tab">
      <div className="adm-card">
        <div className="adm-card-header">
          <h3 className="adm-card-title">About Section</h3>
          <p className="adm-card-desc">Edit the bio paragraphs, value tags, and the quick info card on the right.</p>
        </div>
        <form onSubmit={handleSubmit} className="adm-form">
          <div className="adm-field">
            <label>Bio Paragraphs</label>
            <textarea
              value={paragraphsText}
              onChange={(e) => setParagraphsText(e.target.value)}
              rows={10}
              placeholder="First paragraph about you...&#10;&#10;Second paragraph...&#10;&#10;Third paragraph..."
            />
            <span className="adm-hint">Separate each paragraph with a blank line (press Enter twice).</span>
          </div>

          <div className="adm-field">
            <label>Value Tags</label>
            <input
              type="text"
              value={valueTagsText}
              onChange={(e) => setValueTagsText(e.target.value)}
              placeholder="Clean architecture, Real-world systems, Engineering discipline"
            />
            <span className="adm-hint">Comma-separated. Shown as cyan pills below the bio.</span>
          </div>

          <div className="adm-field">
            <label>Quick Info Facts</label>
            <span className="adm-hint" style={{ marginBottom: '0.75rem', display: 'block' }}>
              These appear in the card on the right side of the About section.
            </span>
            <div className="adm-list-editor">
              {facts.map((f, i) => (
                <div className="adm-list-editor-row" key={i}>
                  <input
                    className="adm-input-sm"
                    type="text"
                    placeholder="key"
                    value={f.key}
                    onChange={(e) => updateFact(i, 'key', e.target.value)}
                  />
                  <input
                    className="adm-input-sm adm-input-flex"
                    type="text"
                    placeholder="value"
                    value={f.val}
                    onChange={(e) => updateFact(i, 'val', e.target.value)}
                  />
                  <label className="adm-inline-check" title="Highlight in cyan">
                    <input
                      type="checkbox"
                      checked={f.highlight}
                      onChange={(e) => updateFact(i, 'highlight', e.target.checked)}
                    />
                    <span>Highlight</span>
                  </label>
                  <button type="button" className="adm-btn-row-delete" onClick={() => removeFact(i)}>✕</button>
                </div>
              ))}
              <button type="button" className="adm-btn-add-row" onClick={addFact}>+ Add fact</button>
            </div>
          </div>

          {msg && <div className={`adm-flash ${msg.error ? 'adm-flash-error' : ''}`}>{msg.text}</div>}
          <div className="adm-form-actions">
            <button className="adm-btn-primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save about section'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AboutTab;