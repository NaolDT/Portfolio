import { useState, useEffect }    from 'react';
import { AdminProvider }           from './context/AdminContext';
import Navbar                      from './components/Navbar/Navbar';
import Hero                        from './components/Hero/Hero';
import QuickStats                  from './components/QuickStats/QuickStats';
import About                       from './components/About/About';
import Experience                  from './components/Experience/Experience';
import Skills                      from './components/Skills/Skills';
import Projects                    from './components/Projects/Projects';
import EngineeringApproach         from './components/EngineeringApproach/EngineeringApproach';
import CurrentlyBuilding           from './components/CurrentlyBuilding/CurrentlyBuilding';
import Education                   from './components/Education/Education';
import Contact                     from './components/Contact/Contact';
import Footer                      from './components/Footer/Footer';
import CommandPalette              from './components/CommandPalette/CommandPalette';
import AdminPage                   from './pages/Admin/AdminPage';

function Portfolio() {
  const [cmdOpen, setCmdOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <Navbar onCommandPalette={() => setCmdOpen(true)} />
      <main>
        <Hero />
        <QuickStats />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Experience />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <EngineeringApproach />
        <div className="divider" />
        <CurrentlyBuilding />
        <div className="divider" />
        <Education />
        <div className="divider" />
        <Contact />
      </main>
      <Footer />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />
    </>
  );
}

function Router() {
  const path = window.location.pathname;
  if (path === '/admin') return <AdminPage />;
  return <Portfolio />;
}

function App() {
  return (
    <AdminProvider>
      <Router />
    </AdminProvider>
  );
}

export default App;