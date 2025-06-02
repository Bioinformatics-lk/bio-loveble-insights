import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, BookOpen, Briefcase, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface UserDashboardProps {
  user: any;
}

export const UserDashboard = ({ user }: UserDashboardProps) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <p className="text-purple-100">{user?.email}</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Courses Card */}
          <Card className="hover:shadow-lg transition-all transform hover:scale-105 border-2 border-transparent hover:border-gradient-to-r hover:from-purple-600 hover:to-blue-600">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Courses
              </CardTitle>
              <CardDescription className="text-gray-600">
                Access our comprehensive bioinformatics courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                View Courses
              </Button>
            </CardContent>
          </Card>

          {/* Services Card */}
          <Card className="hover:shadow-lg transition-all transform hover:scale-105 border-2 border-transparent hover:border-gradient-to-r hover:from-purple-600 hover:to-blue-600">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                <Briefcase className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Services
              </CardTitle>
              <CardDescription className="text-gray-600">
                Professional bioinformatics and computational biology services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                View Services
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* User Profile Section */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">User Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {user?.user_metadata?.username || 'User'}
                  </h3>
                  <p className="text-gray-600">{user?.email}</p>
                  <p className="text-sm text-gray-500">Bioinformatics Student</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};
