// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
  // Check if user was previously logged in
  useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);
  
  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };
  
 const logout = () => {
    // Start loading animation
    setIsLoading(true);
    
    // Simulate logout process with a delay
    setTimeout(() => {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      setIsLoading(false); // End loading animation
    }, 1500); // 1.5 second delay to show loading
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}