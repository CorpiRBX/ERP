import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

import	{loginUser} from '../services/Login/LoginServices'
// Define la interfaz del contexto
interface AuthContextProps {
  token: string | null;
  employeeId: string | null;
  isLoading : boolean | null;
  roleId : number | null
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Crea el contexto
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Crea el proveedor del contexto
const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [roleId,setRoleId] = useState<number | null>(null);
  const [isLoading,setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      setToken(storedToken);
    }
    setIsLoading(false);
  }, []);



  const login = async (username: string, password: string) => {
    try {
      const { token, employeeId, roleId} = await loginUser(username, password);
      
      setToken(token);
      setEmployeeId(employeeId);
      setRoleId(roleId);

      localStorage.setItem('authToken', token);
      localStorage.setItem('employeeId', employeeId.toString());
      localStorage.setItem('roleId',roleId.toString());
    } catch (error) {
      console.error('Error en el login:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setEmployeeId(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('employeeId');
    localStorage.removeItem('roleId');
  };

  return (
    <AuthContext.Provider value={{ token, employeeId, isLoading, roleId,login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto
const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Exporta el contexto, proveedor y hook
export { AuthContext, AuthProvider, useAuth };
