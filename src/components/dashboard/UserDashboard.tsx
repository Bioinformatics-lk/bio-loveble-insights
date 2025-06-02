'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, LogOut, User } from "lucide-react";
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";

interface UserDashboardProps {
  user: SupabaseUser;
}

export const UserDashboard = ({ user }: UserDashboardProps) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 relative">
      {/* DNA/RNA Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url('/dna-pattern.svg'), url('/rna-pattern.svg')`,
          backgroundBlendMode: 'overlay',
          backgroundSize: 'contain',
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Top Bar */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-sm border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left Side - Logo and User Info */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Site Name */}
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Bioinformatics.lk
              </h1>
              
              {/* Divider */}
              <div className="h-6 w-px bg-purple-200"></div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
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
              className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-200 shadow-sm hover:shadow flex items-center space-x-2"
              size="sm"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Courses Card */}
          <Card className="hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-purple-600 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <BookOpen className="h-12 w-12 text-white" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
                Courses
              </CardTitle>
              <CardDescription className="text-gray-700 text-lg mt-2">
                Access our comprehensive bioinformatics courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                View Courses
              </Button>
            </CardContent>
          </Card>

          {/* Services Card */}
          <Card className="hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-purple-600 bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Briefcase className="h-12 w-12 text-white" />
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent font-bold">
                Services
              </CardTitle>
              <CardDescription className="text-gray-700 text-lg mt-2">
                Professional bioinformatics and computational biology services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all"
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
