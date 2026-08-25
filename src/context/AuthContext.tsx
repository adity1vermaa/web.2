import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: {
    name: string;
    email: string;
    password?: string;
    farmName?: string;
    farmType?: any;
    farmSize?: number;
    location?: string;
    country?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updatedData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Authentication state starts strictly as null - NEVER default to a fake or mock user
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and listen to Supabase Auth state
  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user && mounted) {
            await syncUserProfile(session.user);
          } else if (mounted) {
            setUser(null);
          }
        } else {
          // If Supabase credentials are not yet injected, verify if user had explicitly logged in this session
          const savedSession = sessionStorage.getItem('agrivision_session_user');
          if (savedSession && mounted) {
            try {
              const parsed = JSON.parse(savedSession);
              setUser(parsed);
            } catch {
              setUser(null);
            }
          } else if (mounted) {
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Error fetching auth session:', err);
        if (mounted) setUser(null);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadSession();

    if (isSupabaseConfigured) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          await syncUserProfile(session.user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => {
        mounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Helper to load or create profile from Supabase
  const syncUserProfile = async (authUser: any) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      if (profile && !error) {
        const syncUser: User = {
          id: profile.id,
          name: profile.name || profile.full_name || authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'Grower',
          email: profile.email || authUser.email || '',
          role: (profile.role || authUser.user_metadata?.role || 'farmer') as UserRole,
          farmName: profile.farm_name || authUser.user_metadata?.farm_name || 'My Farm',
          farmType: profile.farm_type || authUser.user_metadata?.farm_type || 'Mixed Farming',
          farmSize: profile.farm_size ?? authUser.user_metadata?.farm_size ?? 0,
          unit: profile.unit || 'metric',
          location: profile.location || authUser.user_metadata?.location || '',
          country: profile.country || authUser.user_metadata?.country || '',
          avatarUrl: profile.avatar_url || authUser.user_metadata?.avatar_url || '',
          subscriptionTier: profile.subscription_tier || 'Pro Agronomist',
          createdAt: profile.created_at || authUser.created_at || new Date().toISOString(),
        };
        setUser(syncUser);
      } else {
        const meta = authUser.user_metadata || {};
        const isEmailAdmin = authUser.email?.toLowerCase().includes('admin');
        const defaultRole: UserRole = meta.role || (isEmailAdmin ? 'admin' : 'farmer');

        const newUserObj: User = {
          id: authUser.id,
          name: meta.name || authUser.email?.split('@')[0] || 'Grower',
          email: authUser.email || '',
          role: defaultRole,
          farmName: meta.farm_name || meta.farmName || 'My Farm',
          farmType: meta.farm_type || meta.farmType || 'Mixed Farming',
          farmSize: Number(meta.farm_size || meta.farmSize) || 0,
          unit: meta.unit || 'metric',
          location: meta.location || '',
          country: meta.country || '',
          avatarUrl: meta.avatar_url || meta.avatarUrl || '',
          subscriptionTier: 'Pro Agronomist',
          createdAt: authUser.created_at || new Date().toISOString(),
        };
        setUser(newUserObj);

        // Attempt to persist profile to database if table exists
        try {
          await supabase.from('profiles').upsert({
            id: authUser.id,
            name: newUserObj.name,
            email: newUserObj.email,
            role: newUserObj.role,
            farm_name: newUserObj.farmName,
            farm_type: newUserObj.farmType,
            farm_size: newUserObj.farmSize,
            location: newUserObj.location,
            country: newUserObj.country,
          });
        } catch {
          // Ignore if table schema not initialized
        }
      }
    } catch (err) {
      console.error('Error syncing user profile:', err);
      const meta = authUser.user_metadata || {};
      setUser({
        id: authUser.id,
        name: meta.name || authUser.email?.split('@')[0] || 'Grower',
        email: authUser.email || '',
        role: (meta.role || 'farmer') as UserRole,
        farmName: meta.farm_name || 'My Farm',
        farmType: meta.farm_type || 'Mixed Farming',
        farmSize: Number(meta.farm_size) || 0,
        unit: 'metric',
        location: meta.location || '',
        country: meta.country || '',
        avatarUrl: meta.avatar_url || '',
        subscriptionTier: 'Pro Agronomist',
        createdAt: authUser.created_at || new Date().toISOString(),
      });
    }
  };

  const login = async (email: string, password: string = 'password'): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data?.user) {
          await syncUserProfile(data.user);
          setIsLoading(false);
          return { success: true };
        }
      }

      // Local / Offline authentication handling
      const isAdminRole = email.toLowerCase().includes('admin');
      const fallbackUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0].replace('.', ' ').replace(/^./, (c) => c.toUpperCase()),
        email,
        role: isAdminRole ? 'admin' : 'farmer',
        farmName: isAdminRole ? 'Central Pathology Research Network' : 'Valley Agriculture',
        farmType: 'Mixed Farming',
        farmSize: isAdminRole ? 5000 : 150,
        unit: 'metric',
        location: 'Agricultural Basin',
        country: 'United States',
        avatarUrl: '',
        subscriptionTier: isAdminRole ? 'Enterprise Farm' : 'Pro Agronomist',
        createdAt: new Date().toISOString().split('T')[0],
      };

      setUser(fallbackUser);
      sessionStorage.setItem('agrivision_session_user', JSON.stringify(fallbackUser));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Login failed. Please try again.' };
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password?: string;
    farmName?: string;
    farmType?: any;
    farmSize?: number;
    location?: string;
    country?: string;
  }): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password || 'agrivision2026',
          options: {
            data: {
              name: userData.name,
              farm_name: userData.farmName,
              farm_type: userData.farmType,
              farm_size: userData.farmSize,
              location: userData.location,
              country: userData.country,
              role: 'farmer',
            },
          },
        });

        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }

        if (data?.user) {
          await syncUserProfile(data.user);
          setIsLoading(false);
          return { success: true };
        }
      }

      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: userData.name,
        email: userData.email,
        role: 'farmer',
        farmName: userData.farmName || 'My Farm',
        farmType: userData.farmType || 'Mixed Farming',
        farmSize: Number(userData.farmSize) || 100,
        unit: 'metric',
        location: userData.location || '',
        country: userData.country || 'United States',
        avatarUrl: '',
        subscriptionTier: 'Pro Agronomist',
        createdAt: new Date().toISOString().split('T')[0],
      };

      setUser(newUser);
      sessionStorage.setItem('agrivision_session_user', JSON.stringify(newUser));
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err?.message || 'Registration failed' };
    }
  };

  const updateProfile = async (updatedData: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);

    if (isSupabaseConfigured) {
      try {
        await supabase.from('profiles').update({
          name: updatedData.name,
          farm_name: updatedData.farmName,
          farm_type: updatedData.farmType,
          farm_size: updatedData.farmSize,
          location: updatedData.location,
          country: updatedData.country,
          avatar_url: updatedData.avatarUrl,
        }).eq('id', user.id);
      } catch (err) {
        console.error('Failed to update remote profile:', err);
      }
    } else {
      sessionStorage.setItem('agrivision_session_user', JSON.stringify(updatedUser));
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      sessionStorage.removeItem('agrivision_session_user');
      localStorage.removeItem('agrivision_user');
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
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
