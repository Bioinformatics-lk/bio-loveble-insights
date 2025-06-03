'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, LogOut, User, GraduationCap, Dna } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-[#170056] via-[#410056] to-[#54366B]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-[#EAE3F5]/20">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/76f3562a-0d90-4bbc-a1b8-640acc56da80.png" 
                alt="Bioinformatics.lk" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-[#EAE3F5] ml-0.5">
                ioinformatics.lk
              </span>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <span className="text-[#EAE3F5]/90">
                {user.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Buttons */}
      <div className="container mx-auto px-4 mt-8">
        <div className="relative flex justify-center items-center gap-8 md:gap-16">
          {/* Our Services Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              variant="ghost"
              size="lg"
              className="bg-[#EAE3F5]/10 hover:bg-[#EAE3F5]/20 text-[#EAE3F5] border border-[#EAE3F5]/20 rounded-lg px-8 py-6 transition-all transform hover:scale-105 group"
            >
              <Briefcase className="w-6 h-6 mr-2 group-hover:text-[#EAE3F5]" />
              Our Services
            </Button>
          </motion.div>

          {/* SLHAIF Button (Centered and Slightly Below) */}
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 8 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute z-10"
          >
            <Button
              variant="ghost"
              size="lg"
              className="relative bg-gradient-to-r from-[#170056] to-[#410056] text-[#EAE3F5] font-bold rounded-lg px-12 py-8 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl border border-[#EAE3F5]/30 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#170056]/50 to-[#410056]/50 rounded-lg blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative flex flex-col items-center">
                <Dna className="w-8 h-8 mb-2 group-hover:text-[#EAE3F5]" />
                <span className="text-lg">SLHAIF</span>
                <span className="text-xs text-[#EAE3F5]/70 mt-1 max-w-[200px] text-center">
                  Sri Lanka's First Herbal Artificial Intelligence Factory
                </span>
              </div>
            </Button>
          </motion.div>

          {/* Courses Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Button
              variant="ghost"
              size="lg"
              className="bg-[#EAE3F5]/10 hover:bg-[#EAE3F5]/20 text-[#EAE3F5] border border-[#EAE3F5]/20 rounded-lg px-8 py-6 transition-all transform hover:scale-105 group"
            >
              <GraduationCap className="w-6 h-6 mr-2 group-hover:text-[#EAE3F5]" />
              Courses
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 mt-16">
        {/* Add your dashboard content here */}
      </div>
    </div>
  );
};
