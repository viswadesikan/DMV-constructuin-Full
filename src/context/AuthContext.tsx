import { createContext, useContext, useState, ReactNode } from "react";

export type Role = "admin" | "client" | "guest";

export interface AuthUser {
  role: Role;
  username: string;
  clientId?: string;
  name?: string;
  projectName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (user: AuthUser, persist?: boolean) => void;
  logout: () => void;
  isAdmin: boolean;
  isClient: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const s = sessionStorage.getItem("dmv_admin") || localStorage.getItem("dmv_client");
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  const login = (u: AuthUser, persist = false) => {
    setUser(u);
    if (u.role === "admin") sessionStorage.setItem("dmv_admin", JSON.stringify(u));
    else if (persist) localStorage.setItem("dmv_client", JSON.stringify(u));
    else sessionStorage.setItem("dmv_client", JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("dmv_admin");
    sessionStorage.removeItem("dmv_client");
    localStorage.removeItem("dmv_client");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.role === "admin", isClient: user?.role === "client" }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
