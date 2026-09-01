import { useState, useEffect, useRef } from 'react';
import './CommandPalette.css';

const commands = [
  { label: 'About',       action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }),       icon: '👤' },
  { label: 'Experience',  action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }),   icon: '💼' },
  { label: 'Skills',      action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }),       icon: '⚡' },
  { label: 'Projects',    action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }),     icon: '🛠' },
  { label: 'Engineering', action: () => document.getElementById('engineering')?.scrollIntoView({ behavior: 'smooth' }),  icon: '⚙️' },
  { label: 'Contact',     action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }),      icon: '✉️' },
  { label: 'GitHub',      action: () => window.open('https://github.com/NaolDT', '_blank'),                              icon: '🐙' },
  { label: 'LinkedIn',    action: () => window.open('https://www.linkedin.com/in/naol-dera-5959b9417', '_blank'),        icon: '💼' },
  { label: 'Download CV', action: () => { const a = document.createElement('a'); a.href = '/assets/NaolDera-CV.pdf'; a.download = 'Naol_Dera_CV.pdf'; a.click(); }, icon: '📄' },
  { label: 'Send Email',  action: () => { window.location.href = 'mailto:naoldera8@gmail.com'; },                       icon: '📧' },
];

function CommandPalette({ open, onClose }) {
  const [query, setQuery]       = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef                = useRef(null);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (open) {
      setQuery(''); setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => { setSelected(0); }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape')    { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelected((s) => Math.min(s + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setSelected((s) => Math.max(s - 1, 0)); }
      if (e.key === 'Enter' && filtered[selected]) { filtered[selected].action(); onClose(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, selected, onClose]);

  if (!open) return null;

  return (
    <div className="cmd-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Command palette">
      <div className="cmd-box" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-search">
          <span className="cmd-search-icon">⌘</span>
          <input ref={inputRef} className="cmd-input" type="text" placeholder="Search portfolio..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search commands" />
          <kbd className="cmd-esc" onClick={onClose}>esc</kbd>
        </div>
        <ul className="cmd-list" role="listbox">
          {filtered.length === 0 ? (
            <li className="cmd-empty">No results for "{query}"</li>
          ) : (
            filtered.map((cmd, i) => (
              <li key={cmd.label} role="option" aria-selected={i === selected} className={`cmd-item ${i === selected ? 'active' : ''}`} onClick={() => { cmd.action(); onClose(); }} onMouseEnter={() => setSelected(i)}>
                <span className="cmd-item-icon">{cmd.icon}</span>
                <span className="cmd-item-label">{cmd.label}</span>
                {i === selected && <span className="cmd-item-enter">↵</span>}
              </li>
            ))
          )}
        </ul>
        <div className="cmd-footer">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;