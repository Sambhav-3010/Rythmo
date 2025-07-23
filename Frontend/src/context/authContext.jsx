import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/auth/me`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (response.ok) {
        const { email, name, userType, _id } = await response.json();
        return { email, name, userType, _id };
      } else {
        const errText = await response.text();
        return null;
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
    return null;
  };

  const login = async () => {
    const userData = await fetchUserData();
    if (userData) {
      setUser(userData);
      setToken(true);
    } else {
      setUser(null);
      setToken(null);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
