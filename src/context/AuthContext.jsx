import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      axios.get('/api/user', {
        headers: {
          Authorization: storedToken
        }
      })
        .then(response => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setIsAuthenticated(false);
          setUser(null);
          setToken(null);
          localStorage.removeItem('token');
        });
    }
  }, []);

  const login = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userId',userData.id);
    localStorage.setItem('username', userData.username);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);