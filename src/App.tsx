import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import Index from '@/pages/Index';
import { UserDashboard } from '@/components/dashboard/UserDashboard';
import { CoursesPage } from '@/components/courses/CoursesPage';
import { SLHAIFPage } from '@/pages/SLHAIFPage';
import { SLHAIFChatPage } from "@/pages/SLHAIFChatPage";

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
          path="/slhaif" 
          element={<SLHAIFPage />}
        />
        <Route 
          path="/slhaif/chat" 
          element={<SLHAIFChatPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
