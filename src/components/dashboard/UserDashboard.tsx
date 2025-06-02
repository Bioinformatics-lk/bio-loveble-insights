'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, LogOut, User } from "lucide-react";
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface UserDashboardProps {
  user: SupabaseUser;
}

export const UserDashboard = ({ user }: UserDashboardProps) => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await supabase.auth.signOut();
      // The auth state change listener in App.tsx will handle the redirect
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleViewCourses = () => {
    setIsNavigating(true);
    navigate('/courses');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden transition-opacity duration-300 ${isLoggingOut ? 'opacity-50' : 'opacity-100'}`}>
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Top Left Image */}
        <div 
          className="absolute top-0 left-0 w-1/2 h-1/2 bg-contain bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url("/lovable-uploads/P1.png")' }}
        />
        {/* Top Right Image */}
        <div 
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-contain bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url("/lovable-uploads/P2.png")' }}
        />
        {/* Bottom Left Image */}
        <div 
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-contain bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url("/lovable-uploads/P3.png")' }}
        />
        {/* Bottom Right Image */}
        <div 
          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-contain bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url("/lovable-uploads/P4.png")' }}
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-blue-50/50 backdrop-blur-[2px]" />
      </div>

      {/* Top Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-purple-100 shadow-sm transition-transform duration-300 ease-in-out">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left Side - Logo and User Info */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Site Name */}
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent transform transition-all duration-300 hover:scale-105">
                Bioinformatics.lk
              </h1>
              
              {/* Divider */}
              <div className="h-6 w-px bg-purple-200"></div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3 transform transition-all duration-300 hover:scale-105">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center transition-transform duration-300 hover:rotate-12">
                  <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm md:text-base font-medium text-gray-900">
                    {user?.user_metadata?.username || 'User'}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Logout Button */}
            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`
                bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 
                shadow-sm hover:shadow flex items-center space-x-2
                transition-all duration-300 ease-in-out transform
                hover:scale-105 active:scale-95
                ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : ''}
              `}
              size="sm"
            >
              <LogOut className={`h-4 w-4 transition-transform duration-300 ${isLoggingOut ? 'rotate-180' : ''}`} />
              <span className="hidden sm:inline">
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`container mx-auto px-4 py-16 relative z-10 transition-transform duration-500 ${isNavigating ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}`}>
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Courses Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-purple-600 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:rotate-12">
                <BookOpen className="h-12 w-12 text-white transform transition-all duration-300 group-hover:scale-110" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold transition-all duration-300 group-hover:scale-105">
                Courses
              </CardTitle>
              <CardDescription className="text-gray-700 text-lg mt-2 transition-all duration-300 group-hover:text-purple-600">
                Access our comprehensive bioinformatics courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleViewCourses}
                disabled={isNavigating}
                className={`
                  w-full bg-gradient-to-r from-purple-600 to-blue-600 
                  hover:from-purple-700 hover:to-blue-700 text-lg py-6 
                  font-semibold shadow-lg hover:shadow-xl transition-all 
                  duration-300 transform hover:scale-105 active:scale-95
                  ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}
                `}
                size="lg"
              >
                {isNavigating ? 'Loading...' : 'View Courses'}
              </Button>
            </CardContent>
          </Card>

          {/* Services Card */}
          <Card className="group hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-transparent hover:border-purple-600 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:rotate-12">
                <Briefcase className="h-12 w-12 text-white transform transition-all duration-300 group-hover:scale-110" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold transition-all duration-300 group-hover:scale-105">
                Services
              </CardTitle>
              <CardDescription className="text-gray-700 text-lg mt-2 transition-all duration-300 group-hover:text-purple-600">
                Professional bioinformatics and computational biology services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className={`
                  w-full bg-gradient-to-r from-purple-600 to-blue-600 
                  hover:from-purple-700 hover:to-blue-700 text-lg py-6 
                  font-semibold shadow-lg hover:shadow-xl transition-all 
                  duration-300 transform hover:scale-105 active:scale-95
                `}
                size="lg"
              >
                View Services
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
