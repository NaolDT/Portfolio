import './Hero.css';
import profilePhoto from '../../assets/profile.jpg';

function Hero() {
  return (
    <div className="hero">
      <div className="hero-inner">

        <div className="hero-content">
          <div className="hero-eyebrow">
            <span>~/naol-dera</span>
            <span className="cursor" />
          </div>

          <h1>
            I'm <span className="accent-cyan">Naol Dera</span>,<br />
            <span className="accent-purple">Full Stack</span> Developer
          </h1>

          <p className="hero-sub">
            Software Engineering student at{' '}
            <strong>Jimma University</strong> · Building real-world systems
            with the <strong>MERN stack</strong> · Passionate about clean
            architecture and developer tools.
          </p>

          <div className="btn-group">
            <a href="#projects">
              <button className="btn-primary">View my work ↓</button>
            </a>
            <a href="#contact">
              <button className="btn-ghost">Contact me</button>
            </a>
          </div>
        </div>

        <div className="hero-photo-wrap">
          <div className="hero-photo-ring">
            <img
              src={profilePhoto}
              alt="Naol Dera — Full Stack Developer"
              className="hero-photo"
            />
          </div>
          <div className="hero-photo-glow" />
        </div>

      </div>
    </div>
  );
}

export default Hero;