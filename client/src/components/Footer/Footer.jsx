import './Footer.css';

function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-logo">Naol<span>.dev</span></div>
          <p className="footer-role">Software Engineering Student</p>
          <p className="footer-role">Full Stack Developer</p>
          <div className="footer-socials">
            <a href="https://github.com/NaolDT" target="_blank" rel="noreferrer" className="footer-social">GitHub</a>
            <span className="footer-sep">·</span>
            <a href="https://www.linkedin.com/in/naol-dera-5959b9417" target="_blank" rel="noreferrer" className="footer-social">LinkedIn</a>
            <span className="footer-sep">·</span>
            <a href="mailto:naoldera8@gmail.com" className="footer-social">Email</a>
          </div>
        </div>
        <div className="footer-right">
          <button className="back-top" onClick={scrollTop} aria-label="Back to top">↑ Back to top</button>
          <p className="footer-built">Built with <span>React</span> · <span>Node.js</span> · <span>MongoDB</span></p>
          <p className="footer-copy">© {new Date().getFullYear()} Naol Dera</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;