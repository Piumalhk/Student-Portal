// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);
const API_URL = "http://localhost:5000/api/auth";

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Check if user was previously logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // Fetch user data if token exists
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // Token might be expired or invalid
        logout();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsLoggedIn(true);
        setIsLoading(false);
        return { success: true };
      } else {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Server error during login");
      setIsLoading(false);
      return { success: false, message: "Server error during login" };
    }
  };

  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
        setIsLoggedIn(true);
        setIsLoading(false);
        return { success: true };
      } else {
        setError(data.message || "Signup failed");
        setIsLoading(false);
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Server error during signup");
      setIsLoading(false);
      return { success: false, message: "Server error during signup" };
    }
  };

  const logout = () => {
    // Start loading animation
    setIsLoading(true);

    // Process logout
    setTimeout(() => {
      localStorage.removeItem("token");
      setUser(null);
      setIsLoggedIn(false);
      setIsLoading(false); // End loading animation
    }, 500);
  };
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, error, login, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
