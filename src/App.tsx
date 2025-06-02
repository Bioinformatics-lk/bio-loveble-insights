import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import Index from '@/pages/Index';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { CoursesPage } from '@/components/courses/CoursesPage';
import { LoginTransition } from '@/components/auth/LoginTransition';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [showLoginTransition, setShowLoginTransition] = useState(false);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsAuthenticating(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          setShowLoginTransition(true);
          setTimeout(() => {
            setUser(session?.user ?? null);
            setShowLoginTransition(false);
          }, 2300); // Match with transition duration
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state
  if (isAuthenticating) {
    return null;
  }

  // Show login transition
  if (showLoginTransition) {
    return <LoginTransition />;
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user ? <UserDashboard user={user} /> : <Index />} 
        />
        <Route 
          path="/courses" 
          element={user ? <CoursesPage /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
