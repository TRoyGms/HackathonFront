import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const [clientId, setClientId] = useState(localStorage.getItem('clientId') || null);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || null);

  const login = (token, id, role) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('clientId', id);
    localStorage.setItem('userRole', role);
    setAuthToken(token);
    setClientId(id);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('clientId');
    localStorage.removeItem('userRole');
    setAuthToken(null);
    setClientId(null);
    setUserRole(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const id = localStorage.getItem('clientId');
    const role = localStorage.getItem('userRole');
    if (token) {
      setAuthToken(token);
      setClientId(id);
      setUserRole(role);
    }
  }, []);

  const isAdmin = () => userRole === 1;
  const isUserLoggedIn = () => !!authToken;

  return (
    <AuthContext.Provider value={{ authToken, clientId, userRole, login, logout, isAdmin, isUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
