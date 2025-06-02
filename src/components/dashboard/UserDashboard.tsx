'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase } from "lucide-react";
import { User } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";

interface UserDashboardProps {
  user: User;
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
