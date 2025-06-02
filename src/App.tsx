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
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error getting session:', error);
      } finally {
        setIsAuthenticating(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        if (event === 'SIGNED_IN') {
          setShowLoginTransition(true);
          setUser(session?.user ?? null);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setShowLoginTransition(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Show loading state
  if (isAuthenticating) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-2xl text-purple-600">
          Loading...
        </div>
      </div>
    );
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
