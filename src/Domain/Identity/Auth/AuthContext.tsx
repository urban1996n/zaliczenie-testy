import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNotification } from '../../UI/Notification/NotificationContext';

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { showNotification } = useNotification();
  const [user, setUser] = useState<string | null>(() => {
    return sessionStorage.getItem('username') || null;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('username', user);
    } else {
      sessionStorage.removeItem('username');
      // Also clear cart when user logs out
      sessionStorage.removeItem('cart');
    }
  }, [user]);

  const login = (username: string) => {
    setUser(username);
    showNotification(`Logged in as ${username}.`, 'success');
  };

  const logout = () => {
    setUser(null);
    showNotification('Logged out successfully.', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
