// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/check-auth")
      .then((res) => setLoggedIn(res.data.logged_in))
      .finally(() => setLoading(false));
  }, []);

  const login = () => setLoggedIn(true);
  const logout = () => setLoggedIn(false);

  return (
    <AuthContext.Provider value={{ loggedIn, loading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
