'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, LogOut, User } from "lucide-react";
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { SLHAIFDiagram } from "@/components/slhaif/SLHAIFDiagram";

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
      className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 relative overflow-hidden"
    >
      {/* Background Images */}
      <div className="absolute inset-0 z-0">
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 backdrop-blur-[2px]" />
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
          {/* Welcome Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-[#EAE3F5] mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold">Welcome, {user?.email}</h1>
            <p className="text-lg opacity-80 mt-2">Access your bioinformatics resources and tools</p>
          </motion.div>

          {/* Main Sections */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-12"
          >
            {/* Our Services Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#EAE3F5] mb-6">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Service cards would go here */}
              </div>
            </section>

            {/* SLHAIF Section */}
            <section className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#170056]/50 via-[#410056]/50 to-[#54366B]/50 blur-xl"></div>
              <div className="relative">
                <SLHAIFDiagram />
              </div>
            </section>

            {/* Courses Section */}
            <section>
              <h2 className="text-2xl font-bold text-[#EAE3F5] mb-6">Our Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Course cards would go here */}
              </div>
            </section>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  );
};
