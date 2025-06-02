import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { LoginPage } from './components/auth/LoginPage';
import { UserDashboard } from "@/components/dashboard/UserDashboard";
import { CoursesPage } from "@/components/courses/CoursesPage";
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';

function App() {
  const { user, loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Mark as initialized after the first auth check
    if (!loading) {
      setIsInitialized(true);
    }
  }, [loading]);

  // Show loading state
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-200 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="relative min-h-screen">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" replace /> : <LoginPage />} 
          />
          <Route 
            path="/" 
            element={user ? <UserDashboard user={user} /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/courses" 
            element={user ? <CoursesPage /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
