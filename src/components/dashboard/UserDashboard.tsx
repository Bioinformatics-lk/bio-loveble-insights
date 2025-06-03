'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, LogOut, User } from "lucide-react";
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

interface UserDashboardProps {
  user: SupabaseUser;
}

export const UserDashboard = ({ user }: UserDashboardProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleViewCourses = () => {
    navigate('/courses');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-[#170056] via-[#410056] to-[#54366B] relative overflow-hidden"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#170056]/50 via-[#363B6B]/50 to-[#000A33]/50 backdrop-blur-[2px]" />
      </div>

      {/* Top Bar */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="sticky top-0 z-50 w-full bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left Side - Logo and User Info */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center space-x-4 md:space-x-6"
            >
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
            </motion.div>

            {/* Right Side - Logout Button */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
            <Button
              onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-sm hover:shadow flex items-center space-x-2 transition-all duration-300"
                size="sm"
            >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
            </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 relative z-10">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto"
        >
          {/* Courses Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <BookOpen className="h-12 w-12 text-white" />
              </div>
                <CardTitle className="text-3xl text-white font-bold">
                Courses
              </CardTitle>
                <CardDescription className="text-white/70 text-lg mt-2">
                Access our comprehensive bioinformatics courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                  onClick={handleViewCourses}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6 font-semibold shadow-lg hover:shadow-xl transition-all"
                size="lg"
              >
                View Courses
              </Button>
            </CardContent>
          </Card>
          </motion.div>

          {/* Services Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="border-2 border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
            <CardHeader className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Briefcase className="h-12 w-12 text-white" />
              </div>
                <CardTitle className="text-3xl text-white font-bold">
                Services
              </CardTitle>
                <CardDescription className="text-white/70 text-lg mt-2">
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
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
};
