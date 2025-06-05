import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';
import Index from '@/pages/Index';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { CoursesPage } from '@/components/courses/CoursesPage';
import { SLBAISPage } from '@/pages/SLBAISPage';
import { ServicesPage } from '@/components/services/ServicesPage';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#170056] via-[#410056] to-[#54366B] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" /> : <Index />}
        />
        <Route 
          path="/dashboard" 
          element={user ? <UserDashboard user={user} /> : <Navigate to="/" />}
        />
        <Route 
          path="/courses" 
          element={user ? <CoursesPage /> : <Navigate to="/" />}
        />
        <Route 
          path="/slbais" 
          element={user ? <SLBAISPage /> : <Navigate to="/" />}
        />
        <Route 
          path="/services" 
          element={user ? <ServicesPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
