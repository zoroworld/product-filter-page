import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  function getCookie(name) {
  const cookies = document.cookie.split(";").map(c => c.trim());
  for (let cookie of cookies) {
    if (cookie.startsWith(name + "=")) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}


  // Helper: fetch CSRF cookie from Django
  const fetchCsrfToken = async () => {
    await fetch(`${apiUrl}/account/csrf/`, { credentials: "include" });
    return getCookie("csrftoken");
  };



  // On mount: check if user is logged in
  useEffect(() => {

    const initAuth = async () => {
      try {
        await fetchCsrfToken();
        const res = await fetch(`${apiUrl}/account/me/`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
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

  const login = async (username, password) => {
    const csrftoken = await fetchCsrfToken(); // always fetch latest
    const res = await fetch(`${apiUrl}/account/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Login failed:", error);
      return false;
    }

    const data = await res.json();
    setUser(data);
    return true;
  };

  const logout = async () => {
    const csrftoken = await fetchCsrfToken();
    await fetch(`${apiUrl}/account/logout/`, {
      method: "POST",
      credentials: "include",
      headers: { "X-CSRFToken": csrftoken },
    });
    setUser(null);
  };

  const register = async (username, password, email) => {
    const csrftoken = await fetchCsrfToken();
    const res = await fetch(`${apiUrl}/account/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      credentials: "include",
      body: JSON.stringify({ username, password, email }),
    });
    return res.ok;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
