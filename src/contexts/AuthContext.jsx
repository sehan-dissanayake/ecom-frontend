import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, register as apiRegister } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

// Add token validation function
const validateToken = async (token) => {
  try {
    // Simple validation - you could add an API call to validate token
    const decoded = jwt.decode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

// Update useEffect
useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token && await validateToken(token)) {
      const decoded = jwt.decode(token);
      setUser({ email: decoded.sub });
    }
    setLoading(false);
  };
  checkAuth();
}, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      localStorage.setItem('token', response.data.access_token);
      setUser({ email });
      navigate('/');
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (email, password) => {
    try {
      await apiRegister(email, password);
      await handleLogin(email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      login: handleLogin,
      register: handleRegister,
      logout
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);