import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USER, ADMIN_USER } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, role?: UserRole) => void;
  quickLoginAs: (role: 'farmer' | 'admin') => void;
  register: (userData: Partial<User>) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('agrivision_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_USER;
      }
    }
    return INITIAL_USER; // Default logged in as demo farmer for easy exploration
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('agrivision_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agrivision_user');
    }
  }, [user]);

  const login = (email: string, role: UserRole = 'farmer') => {
    if (role === 'admin' || email.includes('admin')) {
      setUser(ADMIN_USER);
    } else {
      setUser({
        ...INITIAL_USER,
        email: email || INITIAL_USER.email,
      });
    }
  };

  const quickLoginAs = (role: 'farmer' | 'admin') => {
    if (role === 'admin') {
      setUser(ADMIN_USER);
    } else {
      setUser(INITIAL_USER);
    }
  };

  const register = (userData: Partial<User>) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name || 'New Grower',
      email: userData.email || 'grower@farm.ag',
      role: 'farmer',
      farmName: userData.farmName || 'Green Horizons Ranch',
      farmType: userData.farmType || 'Mixed Farming',
      farmSize: userData.farmSize || 120,
      unit: userData.unit || 'metric',
      location: userData.location || 'Central Valley, CA',
      country: userData.country || 'United States',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      subscriptionTier: 'Pro Agronomist',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUser(newUser);
  };

  const updateProfile = (updatedData: Partial<User>) => {
    if (!user) return;
    setUser({ ...user, ...updatedData });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        quickLoginAs,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
