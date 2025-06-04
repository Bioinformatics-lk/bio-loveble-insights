import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import Index from '@/pages/Index';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { CoursesPage } from '@/components/courses/CoursesPage';
import { SLBAISPage } from '@/pages/SLBAISPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<Index />}
        />
        <Route 
          path="/dashboard" 
          element={<UserDashboard user={null} />}
        />
        <Route 
          path="/courses" 
          element={<CoursesPage />}
        />
        <Route 
          path="/slbais" 
          element={<SLBAISPage />}
        />
      </Routes>
    </Router>
);
}

export default App;
