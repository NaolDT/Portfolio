import { useState, useEffect } from 'react';
import './Navbar.css';

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
];

function Navbar({ onCommandPalette }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 20); setMenuOpen(false); };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <a href="#hero" className="logo" aria-label="Naol Dera home">Naol<span>.dev</span></a>

      <ul className="nav-links" role="list">
        {links.map((l) => (
          <li key={l.label}><a href={l.href}>{l.label}</a></li>
        ))}
      </ul>

      <div className="nav-actions">
        <button className="cmd-btn" onClick={onCommandPalette} aria-label="Open command palette Ctrl K" title="Command palette (Ctrl+K)">
          <span className="cmd-icon">⌘</span>
          <span className="cmd-label">K</span>
        </button>
        <a href="https://github.com/NaolDT" target="_blank" rel="noreferrer" className="btn-icon cyan" aria-label="GitHub profile">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
      </div>

      <button className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen((p) => !p)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
        <span /><span /><span />
      </button>

      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="mobile-links" role="list">
          {links.map((l, i) => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>
                <span className="mobile-num">0{i + 1}.</span>{l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-bottom">
          <a href="https://github.com/NaolDT" target="_blank" rel="noreferrer" className="mobile-social">GitHub ↗</a>
          <a href="https://www.linkedin.com/in/naol-dera-5959b9417" target="_blank" rel="noreferrer" className="mobile-social">LinkedIn ↗</a>
        </div>
      </div>

      {menuOpen && <div className="drawer-overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
}

export default Navbar;