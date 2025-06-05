'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, LogOut, User, Brain } from "lucide-react";
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

interface UserDashboardProps {
  user: SupabaseUser;
}

export const UserDashboard = ({ user }: UserDashboardProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleViewCourses = () => {
    navigate('/courses');
  };

  const handleViewServices = () => {
    navigate('/services');
  };

  const handleExploreSlhaif = () => {
    navigate('/slbais');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#170056] via-[#410056] to-[#54366B] relative overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Geometric Shapes for Visual Interest */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#54366B]/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#000A33]/40 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#363B6B]/20 blur-3xl"></div>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#170056]/50 to-[#410056]/50 backdrop-blur-[2px]" />
      </div>

      {/* Top Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg">
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
            <div>
              <Button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-sm hover:shadow flex items-center space-x-2 transition-all duration-300"
                size="sm"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* First Row - Services and Courses */}
          <div>
            <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 h-full flex flex-col">
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
                  className="w-full bg-[#363B6B] hover:bg-[#000A33] text-white border border-white/20 transition-all text-lg py-6 font-semibold shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  View Services
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Courses Card */}
          <div>
            <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 h-full flex flex-col">
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
                  className="w-full bg-[#363B6B] hover:bg-[#000A33] text-white border border-white/20 transition-all text-lg py-6 font-semibold shadow-lg hover:shadow-xl"
                  size="lg"
                >
                  View Courses
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* SLBAIS Card - Centered Below */}
        <div className="md:w-2/3 mx-auto mt-10">
          <Card className="border-2 border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/5 transition-all duration-300 relative overflow-hidden">
            <CardHeader className="text-center relative z-10">
              <div className="w-28 h-28 mx-auto mb-6 bg-transparent rounded-full flex items-center justify-center relative">
                <Brain className="h-14 w-14 text-white" />
              </div>
              <CardTitle className="text-3xl text-white font-bold">
                SLBAIS
              </CardTitle>
              <CardDescription className="text-white/90 text-lg mt-2 font-medium">
                Sri Lanka's First Botanical Artificial Intelligence Factory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleExploreSlhaif}
                className="w-full bg-[#363B6B] hover:bg-[#000A33] text-white border border-white/20 transition-all text-lg py-6 font-semibold shadow-lg hover:shadow-xl backdrop-blur-sm"
                size="lg"
              >
                Explore SLBAIS
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
