import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import Index from '@/pages/Index';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { CoursesPage } from '@/components/courses/CoursesPage';
import { SLBAISPage } from '@/pages/SLBAISPage';
import { ServicesPage } from '@/components/services/ServicesPage';

// Protected Route Component
const ProtectedRoute = ({ user, children }: { user: User | null; children: React.ReactNode }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#170056] to-[#363B6B]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <UserDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedRoute user={user}>
              <CoursesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/slbais"
          element={
            <ProtectedRoute user={user}>
              <SLBAISPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute user={user}>
              <ServicesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
