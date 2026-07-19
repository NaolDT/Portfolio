import { useState, useEffect } from 'react';
import './Navbar.css';

const links = ['About', 'Skills', 'Projects', 'Contact'];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setMenuOpen(false);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <div className="logo">Naol<span>.dev</span></div>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`}>{link}</a>
          </li>
        ))}
      </ul>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
      >
        <span /><span /><span />
      </button>

      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <ul className="mobile-links">
          {links.map((link, i) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                <span className="mobile-link-num">0{i + 1}.</span>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {menuOpen && (
        <div className="drawer-overlay" onClick={() => setMenuOpen(false)} />
      )}
    </nav>
  );
}

export default Navbar;