'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, LogOut, User, Brain } from "lucide-react";
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
        {/* Geometric Shapes for Visual Interest */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#54366B]/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#000A33]/40 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#363B6B]/20 blur-3xl"></div>
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#170056]/50 to-[#410056]/50 backdrop-blur-[2px]" />
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
          className="grid grid-cols-1 gap-10 max-w-5xl mx-auto"
        >
          {/* First Row - Services and Courses */}
          <div className="grid md:grid-cols-2 gap-10">
            {/* Services Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
                    className="w-full bg-[#363B6B] hover:bg-[#000A33] text-white border border-white/20 transition-all text-lg py-6 font-semibold shadow-lg hover:shadow-xl"
                    size="lg"
                  >
                    View Services
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Courses Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
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
            </motion.div>
          </div>

          {/* SLHAIF Card - Centered Below */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="md:col-span-2 md:w-2/3 mx-auto"
          >
            <Card className="border-2 border-white/20 bg-transparent backdrop-blur-sm hover:bg-white/5 transition-all duration-300 relative overflow-hidden will-change-transform">
              {/* Optimized Glowing Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#54366B]/20 to-[#363B6B]/20">
                <motion.div
                  initial={{ opacity: 0.2 }}
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }}
                  className="w-full h-full bg-gradient-to-r from-[#54366B] to-[#363B6B] blur-2xl transform-gpu"
                />
              </div>
              
              <CardHeader className="text-center relative z-10">
                <div className="w-28 h-28 mx-auto mb-6 bg-transparent rounded-full flex items-center justify-center relative group">
                  {/* Optimized Glowing background effect */}
                  <motion.div
                    initial={{ scale: 1, opacity: 0.3 }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1],
                    }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#54366B] to-[#363B6B] blur-xl transform-gpu"
                  />
                  
                  {/* Optimized Pulsing ring effect */}
                  <motion.div
                    initial={{ scale: 1, opacity: 0.2 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1],
                    }}
                    className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#54366B] to-[#363B6B] blur-lg transform-gpu"
                  />
                  
                  {/* Optimized Brain icon animation */}
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{
                      scale: [1, 1.08, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 1],
                    }}
                    className="relative z-10 transform-gpu"
                  >
                    <div className="relative transform-gpu">
                      {/* Optimized layered glows */}
                      <div className="absolute inset-0 blur-md bg-white/20 rounded-full transform-gpu"></div>
                      <div className="absolute inset-0 blur-lg bg-white/15 rounded-full scale-110 transform-gpu"></div>
                      <div className="absolute inset-0 blur-xl bg-white/10 rounded-full scale-125 transform-gpu"></div>
                      <Brain 
                        className="h-14 w-14 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] filter brightness-150 transform-gpu" 
                      />
                    </div>
                  </motion.div>
                </div>
                <CardTitle className="text-3xl text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                  SLHAIF
                </CardTitle>
                <CardDescription className="text-white/90 text-lg mt-2 font-medium">
                  Sri Lanka's First Herbal Artificial Intelligence Factory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full bg-[#363B6B] hover:bg-[#000A33] text-white border border-white/20 transition-all text-lg py-6 font-semibold shadow-lg hover:shadow-xl backdrop-blur-sm transform-gpu"
                  size="lg"
                >
                  Explore SLHAIF
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
};
