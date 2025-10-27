import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Get stored tokens from localStorage
  const getStoredTokens = () => {
    const tokens = localStorage.getItem("tokens");
    return tokens ? JSON.parse(tokens) : null;
  };

  const saveTokens = (tokens) => {
    localStorage.setItem("tokens", JSON.stringify(tokens));
  };

  const clearTokens = () => {
    localStorage.removeItem("tokens");
  };

  // Decode JWT (just for user info, not secure)
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  // On mount: try to load user from saved token
  useEffect(() => {
    const initAuth = async () => {
      const tokens = getStoredTokens();
      if (!tokens) {
        setLoading(false);
        return;
      }

      const accessToken = tokens.access;
      try {
        const res = await fetch(`${apiUrl}/account/me/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          // Try refreshing token if access expired
          const newAccess = await refreshToken(tokens.refresh);
          if (newAccess) {
            const res2 = await fetch(`${apiUrl}/account/me/`, {
              headers: { Authorization: `Bearer ${newAccess}` },
            });
            if (res2.ok) {
              const data = await res2.json();
              setUser(data);
            } else {
              clearTokens();
              setUser(null);
            }
          } else {
            clearTokens();
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Auth init failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // 🔹 Login — call Django `/accounts/login/`
  const login = async (username, password) => {
    const res = await fetch(`${apiUrl}/account/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Login failed:", error);
      return false;
    }

    const data = await res.json();
    const tokens = {
      access: data.access,
      refresh: data.refresh,
    };

    saveTokens(tokens);
    setUser({ username: data.username });
    return true;
  };

  // 🔹 Refresh token
  const refreshToken = async (refresh) => {
    try {
      const res = await fetch(`${apiUrl}/account/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh }),
      });
      if (!res.ok) return null;
      const data = await res.json();

      const tokens = getStoredTokens();
      const newTokens = { ...tokens, access: data.access };
      saveTokens(newTokens);

      return data.access;
    } catch (err) {
      console.error("Token refresh failed:", err);
      clearTokens();
      return null;
    }
  };

  // 🔹 Logout — clear tokens and user
  const logout = async () => {
    const tokens = getStoredTokens();
    if (tokens?.refresh) {
      await fetch(`${apiUrl}/account/logout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.access}`,
        },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });
    }
    clearTokens();
    setUser(null);
  };

  // 🔹 Register new user
  const register = async (username, password, email) => {
    const res = await fetch(`${apiUrl}/account/register/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, email }),
    });
    return res.ok;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
