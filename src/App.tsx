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
  const { user, isAuthenticated, isAdmin } = useAuth();

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

    // 2. Admin Protected Routes
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

    // 3. Grower / Farm Protected Routes
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
