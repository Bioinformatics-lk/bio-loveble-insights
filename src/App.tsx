import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import Index from '@/pages/Index';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { CoursesPage } from '@/components/courses/CoursesPage';
import SLHAIF from '@/pages/SLHAIF';
import SLHAIFChat from '@/pages/SLHAIFChat';

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route 
          path="/" 
          element={user ? <UserDashboard user={user} /> : <Index />} 
        />
        <Route 
          path="/courses" 
          element={user ? <CoursesPage /> : <Navigate to="/" />} 
        />
        <Route path="/slhaif" element={<SLHAIF />} />
        <Route path="/slhaif-chat" element={<SLHAIFChat />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
