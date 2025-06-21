'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, LogOut, Briefcase, BookOpen } from "lucide-react";
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

interface UserDashboardProps {
  user: SupabaseUser;
}

export const UserDashboard = ({ user }: UserDashboardProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Immediate visual feedback
    const logoutButton = document.querySelector('[data-logout-button]') as HTMLElement;
    if (logoutButton) {
      logoutButton.style.opacity = '0.5';
      logoutButton.style.pointerEvents = 'none';
    }
    
    try {
    await supabase.auth.signOut();
      // Immediate navigation for faster response
      setTimeout(() => navigate('/'), 50);
    } catch (error) {
      console.error('Logout error:', error);
      // Reset button state on error
      if (logoutButton) {
        logoutButton.style.opacity = '1';
        logoutButton.style.pointerEvents = 'auto';
      }
    }
  };

  const handleViewCourses = () => {
    navigate('/courses');
  };

  const handleViewServices = () => {
    navigate('/services');
  };

  const handleExploreSlhaif = () => {
    alert("SLBAIS will be launching soon.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#170056] via-[#410056] to-[#54366B] relative overflow-hidden">
      {/* Simplified Background - Reduced blur effects */}
      <div className="absolute inset-0 z-0">
        {/* Simplified geometric shapes with reduced blur */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#54366B]/10"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#000A33]/20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#363B6B]/10"></div>
        {/* Simplified overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#170056]/30 to-[#410056]/30" />
      </div>

      {/* Top Bar - Simplified animations */}
      <header className="sticky top-0 z-50 w-full bg-white/10 border-b border-white/20 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left Side - Logo and User Info */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Site Name */}
              <h1 className="text-xl md:text-2xl font-bold text-white">
                Bioinformatics.lk
              </h1>
              
              {/* Divider */}
              <div className="h-6 w-px bg-white/20"></div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm md:text-base font-medium text-white">
                    {user?.user_metadata?.username || 'User'}
                  </p>
                  <p className="text-xs md:text-sm text-white/70">
                    {user?.email}
                  </p>
              </div>
              </div>
            </div>

            {/* Right Side - Logout Button */}
            <Button
              onClick={handleLogout}
              data-logout-button
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-sm hover:shadow flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
                size="sm"
            >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Simplified animations */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 gap-10 max-w-5xl mx-auto">
          {/* First Row - Services and Courses */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Services Card */}
            <Card className="border-2 border-white/20 bg-white/10 hover:bg-white/20 transition-colors duration-200 h-full flex flex-col">
                <CardHeader className="text-center flex-1">
                  <div className="w-24 h-24 mx-auto mb-6 bg-[#363B6B] rounded-full flex items-center justify-center shadow-lg">
                    <Briefcase className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-3xl text-white font-bold">
                    Services
                  </CardTitle>
                  <CardDescription className="text-white/70 text-lg mt-2">
                    Professional bioinformatics and computational biology services
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Button 
                    onClick={handleViewServices}
                  className="w-full bg-[#363B6B] hover:bg-[#000A33] text-white border border-white/20 transition-colors duration-200 text-lg py-6 font-semibold shadow-lg"
                    size="lg"
                  >
                    View Services
                  </Button>
                </CardContent>
              </Card>

          {/* Courses Card */}
            <Card className="border-2 border-white/20 bg-white/10 hover:bg-white/20 transition-colors duration-200 h-full flex flex-col">
                <CardHeader className="text-center flex-1">
                  <div className="w-24 h-24 mx-auto mb-6 bg-[#363B6B] rounded-full flex items-center justify-center shadow-lg">
                    <BookOpen className="h-12 w-12 text-white" />
              </div>
                  <CardTitle className="text-3xl text-white font-bold">
                Courses
              </CardTitle>
                  <CardDescription className="text-white/70 text-lg mt-2">
                Access our comprehensive bioinformatics courses
              </CardDescription>
            </CardHeader>
                <CardContent className="mt-auto">
              <Button 
                    onClick={handleViewCourses}
                  className="w-full bg-[#363B6B] hover:bg-[#000A33] text-white border border-white/20 transition-colors duration-200 text-lg py-6 font-semibold shadow-lg"
                size="lg"
              >
                View Courses
              </Button>
            </CardContent>
          </Card>
          </div>

          {/* SLBAIL Card - Simplified */}
          <div className="md:col-span-2 md:w-2/3 mx-auto">
            <Card className="border-2 border-white/20 bg-transparent hover:bg-white/5 transition-colors duration-200 relative overflow-hidden">
              {/* Simplified background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#54366B]/10 to-[#363B6B]/10" />
              
              <CardHeader className="text-center relative z-10">
                <CardTitle className="text-3xl text-white font-bold">
                  SLBAIL
                </CardTitle>
                <CardDescription className="text-white/90 text-lg mt-2 font-medium">
                  Sri Lanka's First Bioinformatics and Artificial Intelligence Laboratory
                </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                  onClick={handleExploreSlhaif}
                  className="w-full bg-[#363B6B] hover:bg-[#000A33] text-white border border-white/20 transition-colors duration-200 text-lg py-6 font-semibold shadow-lg"
                size="lg"
              >
                  Explore SLBAIL
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
