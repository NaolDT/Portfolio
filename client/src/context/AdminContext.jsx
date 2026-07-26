import { createContext, useContext, useState } from 'react';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token') || null);

  const login = (tok) => {
    localStorage.setItem('admin_token', tok);
    setToken(tok);
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    setToken(null);
  };

  return (
    <AdminContext.Provider value={{ token, login, logout, isAuth: !!token }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);