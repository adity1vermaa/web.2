import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { AboutPage } from './pages/AboutPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { OnboardingPage } from './pages/OnboardingPage';

// Protected Grower / Farm Pages
import { DashboardPage } from './pages/DashboardPage';
import { ScannerPage } from './pages/ScannerPage';
import { FieldsPage } from './pages/FieldsPage';
import { WeatherPage } from './pages/WeatherPage';
import { AlertsPage } from './pages/AlertsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AdvisorPage } from './pages/AdvisorPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

// Protected Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminScansPage } from './pages/admin/AdminScansPage';
import { AdminFarmsPage } from './pages/admin/AdminFarmsPage';

const AppRoutes: React.FC = () => {
  const { currentPath, navigate } = useRouter();
  const { user, isAuthenticated, isAdmin, isLoading } = useAuth();

  // Enforce route protection and redirection
  React.useEffect(() => {
    if (isLoading) return;

    const publicPaths = ['/', '', '/about', '/privacy', '/terms', '/login', '/signup', '/forgot-password', '/onboarding'];
    const isPublic = publicPaths.includes(currentPath);

    if (!isAuthenticated && !isPublic) {
      navigate('/login');
    } else if (isAuthenticated && currentPath.startsWith('/admin') && !isAdmin) {
      navigate('/dashboard');
    }
  }, [currentPath, isAuthenticated, isAdmin, isLoading, navigate]);

  // If initial auth session is being restored from Supabase, display clean loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-100 font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 p-0.5 animate-pulse shadow-lg shadow-emerald-950">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="w-2.5 h-2.5 rounded-full bg-lime-400 animate-ping"></span>
            </div>
          </div>
          <p className="text-xs text-slate-400 font-medium">Securing session...</p>
        </div>
      </div>
    );
  }

  // Route Dispatcher
  const renderRoute = () => {
    // 1. Public Routes
    if (currentPath === '/' || currentPath === '') {
      return <LandingPage />;
    }
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/privacy') {
      return <PrivacyPage />;
    }
    if (currentPath === '/terms') {
      return <TermsPage />;
    }
    if (currentPath === '/login') {
      return <LoginPage />;
    }
    if (currentPath === '/signup') {
      return <SignUpPage />;
    }
    if (currentPath === '/forgot-password') {
      return <ForgotPasswordPage />;
    }
    if (currentPath === '/onboarding') {
      return <OnboardingPage />;
    }

    // 2. Admin Protected Routes (Require Authenticated + Role === 'admin')
    if (currentPath.startsWith('/admin')) {
      if (!isAuthenticated) {
        return <LoginPage />;
      }
      if (!isAdmin) {
        return <DashboardPage />;
      }

      if (currentPath === '/admin/dashboard' || currentPath === '/admin') {
        return <AdminDashboardPage />;
      }
      if (currentPath === '/admin/scans') {
        return <AdminScansPage />;
      }
      if (currentPath === '/admin/farms') {
        return <AdminFarmsPage />;
      }

      return <AdminDashboardPage />;
    }

    // 3. Grower / Farm Protected Routes (Require Authenticated)
    if (!isAuthenticated) {
      return <LoginPage />;
    }

    switch (currentPath) {
      case '/dashboard':
        return <DashboardPage />;
      case '/scanner':
        return <ScannerPage />;
      case '/fields':
        return <FieldsPage />;
      case '/weather':
        return <WeatherPage />;
      case '/alerts':
        return <AlertsPage />;
      case '/analytics':
        return <AnalyticsPage />;
      case '/advisor':
        return <AdvisorPage />;
      case '/history':
        return <HistoryPage />;
      case '/settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      {renderRoute()}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <FarmProvider>
        <RouterProvider>
          <AppRoutes />
        </RouterProvider>
      </FarmProvider>
    </AuthProvider>
  );
}
