import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const checkAuth = useCallback(async () => {
    try {
      const response = await api.get("/check-auth");
      if (response.data.logged_in) {
        setUserData(response.data.user);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setUserData(null);
      }
    } catch (error) {
      setLoggedIn(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async () => {
    await checkAuth();
  };

  const logout = async () => {
    try {
      await api.post("/logout");
      setLoggedIn(false);
      setUserData(null);
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      loggedIn, 
      loading, 
      userData,
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
