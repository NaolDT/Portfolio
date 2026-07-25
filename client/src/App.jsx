import { AdminProvider } from './context/AdminContext';
import Navbar    from './components/Navbar/Navbar';
import Hero      from './components/Hero/Hero';
import About     from './components/About/About';
import Skills    from './components/Skills/Skills';
import Projects  from './components/Projects/Projects';
import Contact   from './components/Contact/Contact';
import Footer    from './components/Footer/Footer';
import AdminPage from './pages/Admin/AdminPage';

function Router() {
  const path = window.location.pathname;
  if (path === '/admin') return <AdminPage />;

  return (
    <>
      <Navbar />
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <AdminProvider>
      <Router />
    </AdminProvider>
  );
}

export default App;