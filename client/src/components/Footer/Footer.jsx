import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <span>Built with <strong>React + Node + MongoDB</strong></span>
      <span>© {new Date().getFullYear()} Naol Dera</span>
    </footer>
  );
}

export default Footer;