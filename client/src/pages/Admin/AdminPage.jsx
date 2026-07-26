import { useAdmin }       from '../../context/AdminContext';
import AdminLogin         from './AdminLogin';
import AdminDashboard     from './AdminDashboard';

function AdminPage() {
  const { isAuth } = useAdmin();
  if (!isAuth) return <AdminLogin />;
  return <AdminDashboard />;
}

export default AdminPage;