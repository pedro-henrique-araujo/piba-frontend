import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  function updateToken(newToken) {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("token", newToken);
      return;
    }
    localStorage.removeItem("token");
  }

  function clearToken() {
    setToken(null);
    localStorage.removeItem("token");
  }

  function includesAnyRoles(...rolesToCheck) {
    if (!token) return false;
    const decodedToken = jwtDecode(token);
    const roles =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    for (const role of rolesToCheck) {
      if (roles.includes(role)) {
        return true;
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{ token, setToken: updateToken, includesAnyRoles, clearToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
