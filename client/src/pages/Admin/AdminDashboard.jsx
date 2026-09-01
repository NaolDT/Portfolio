import { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import './Admin.css';

import ProjectsTab   from './tabs/ProjectsTab';
import SkillsTab     from './tabs/SkillsTab';
import HeroTab       from './tabs/HeroTab';
import AboutTab      from './tabs/AboutTab';
import QuickStatsTab from './tabs/QuickStatsTab';
import ExperienceTab from './tabs/ExperienceTab';
import BuildingTab   from './tabs/BuildingTab';
import EducationTab  from './tabs/EducationTab';
import SettingsTab   from './tabs/SettingsTab';

const NAV = [
  { id: 'projects',   label: 'Projects',           icon: '🛠',  group: 'Content'  },
  { id: 'skills',     label: 'Skills',             icon: '⚡',  group: 'Content'  },
  { id: 'hero',       label: 'Hero',               icon: '✨',  group: 'Sections' },
  { id: 'about',      label: 'About',              icon: '👤',  group: 'Sections' },
  { id: 'quickstats', label: 'Quick Stats',        icon: '📊',  group: 'Sections' },
  { id: 'experience', label: 'Experience',         icon: '💼',  group: 'Sections' },
  { id: 'building',   label: 'Currently Building', icon: '🏗',  group: 'Sections' },
  { id: 'education',  label: 'Education',          icon: '🎓',  group: 'Sections' },
  { id: 'settings',   label: 'Settings',           icon: '⚙️', group: 'Config'   },
];

const GROUPS = ['Content', 'Sections', 'Config'];

function AdminDashboard() {
  const { logout }                = useAdmin();
  const [active, setActive]       = useState('projects');
  const [sidebarOpen, setSidebar] = useState(false);

  const current = NAV.find((n) => n.id === active);

  const renderTab = () => {
    switch (active) {
      case 'projects':   return <ProjectsTab />;
      case 'skills':     return <SkillsTab />;
      case 'hero':       return <HeroTab />;
      case 'about':      return <AboutTab />;
      case 'quickstats': return <QuickStatsTab />;
      case 'experience': return <ExperienceTab />;
      case 'building':   return <BuildingTab />;
      case 'education':  return <EducationTab />;
      case 'settings':   return <SettingsTab />;
      default:           return null;
    }
  };

  const handleNav = (id) => { setActive(id); setSidebar(false); };

  return (
    <div className="adm-wrap">
      {sidebarOpen && (
        <div className="adm-overlay" onClick={() => setSidebar(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`adm-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="adm-sidebar-header">
          <div className="adm-logo">Naol<span>.admin</span></div>
          <button className="adm-sidebar-close" onClick={() => setSidebar(false)} aria-label="Close menu">✕</button>
        </div>

        <nav className="adm-nav">
          {GROUPS.map((group) => (
            <div key={group}>
              <div className="adm-nav-group-label">{group}</div>
              {NAV.filter((n) => n.group === group).map((n) => (
                <button
                  key={n.id}
                  className={`adm-nav-item ${active === n.id ? 'active' : ''}`}
                  onClick={() => handleNav(n.id)}
                >
                  <span className="adm-nav-icon">{n.icon}</span>
                  {n.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <a className="adm-nav-item" href="/" target="_blank" rel="noreferrer">
            <span className="adm-nav-icon">🌐</span>View portfolio ↗
          </a>
          <button className="adm-nav-item adm-logout" onClick={logout}>
            <span className="adm-nav-icon">🚪</span>Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="adm-main">
        <header className="adm-topbar">
          <button className="adm-hamburger" onClick={() => setSidebar(true)} aria-label="Open menu">
            <span /><span /><span />
          </button>
          <div className="adm-topbar-center">
            <span className="adm-topbar-icon">{current?.icon}</span>
            <span className="adm-topbar-title">{current?.label}</span>
          </div>
          <div className="adm-topbar-right">
            <a href="/" target="_blank" rel="noreferrer" className="adm-topbar-link">↗ Portfolio</a>
            <button className="adm-topbar-logout" onClick={logout}>Sign out</button>
          </div>
        </header>

        <div className="adm-content">{renderTab()}</div>
      </div>
    </div>
  );
}

export default AdminDashboard;