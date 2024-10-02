// AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  password: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  changePassword: (newPassword: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedPassword = localStorage.getItem("password");

    if (storedUser && storedPassword) {
      setUser(storedUser);
      setPassword(storedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email: string, password: string) => {
    const storedPassword = localStorage.getItem("password") ?? "Contrasena1!";
    
    if (email === "usuario@dominio.com" && password === storedPassword) {
      setUser(email);
      setPassword(password);
      localStorage.setItem("user", email);
      setIsAuthenticated(true);
    } else {
      console.error("Credenciales incorrectas");
    }
  };
  

  const logout = () => {
    setUser(null);
    setPassword(null);
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  const changePassword = (newPassword: string) => {
    if (user) {
      setPassword(newPassword);
      localStorage.setItem("password", newPassword);
      console.log("Contraseña cambiada exitosamente");
    } else {
      console.error("No hay usuario autenticado para cambiar la contraseña.");
    }
  };  

  return (
    <AuthContext.Provider
      value={{ user, password, isAuthenticated, login, logout, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
