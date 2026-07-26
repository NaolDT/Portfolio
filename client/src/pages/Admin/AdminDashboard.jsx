import { useState }   from 'react';
import { useAdmin }   from '../../context/AdminContext';
import ProjectsTab    from './tabs/ProjectsTab';
import SkillsTab      from './tabs/SkillsTab';
import './Admin.css';

const tabs = ['Projects', 'Skills'];

function AdminDashboard() {
  const { logout }          = useAdmin();
  const [activeTab, setActiveTab] = useState('Projects');

  return (
    <div className="admin-wrap">
      <aside className="admin-sidebar">
        <div className="admin-logo">Naol<span>.admin</span></div>

        <nav className="admin-nav">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`admin-nav-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <a className="admin-nav-item" href="/" target="_blank" rel="noreferrer">
            View portfolio ↗
          </a>
          <button className="admin-nav-item logout" onClick={logout}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-main-header">
          <h1 className="admin-page-title">{activeTab}</h1>
        </div>
        <div className="admin-content">
          {activeTab === 'Projects' && <ProjectsTab />}
          {activeTab === 'Skills'   && <SkillsTab />}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;