import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthForm } from './components/auth/AuthForm';
import { UserDashboard } from './components/dashboard/UserDashboard';
import { CoursesPage } from './components/courses/CoursesPage';
import { HeroPage } from './components/landing/HeroPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <LoadingSpinner />;
  return user ? <>{children}</> : <Navigate to="/" replace />;
};

const AppRoutes = () => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;

  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <HeroPage />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <AuthForm />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboard user={user!} /></ProtectedRoute>} />
        <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
